import React from "react";
import { useState, useEffect } from "react";
import "../css/Content.css";
import { useRef } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import $ from "jquery";
import { jstree } from "jquery";
import "react-simple-jstree";
import useDrivePicker from "react-google-drive-picker";
import { useDropboxChooser } from "use-dropbox-chooser";
import JSZipUtils from "jszip-utils";
import { BuildFolderTree } from "./FolderStructure.js";
import ProgressBar from "react-bootstrap/ProgressBar";
import { API_KEYS } from "../Api_keys.js";

export default function Content({ preventDefault }) {
  const [zipFile, setZipFiles] = useState(null);
  const [hrefs, add_href] = useState([]);
  const inputFileRef = useRef(null);
  const modalaRef = useRef(null);

  const [errorMsg, setErrorMsg] = useState("");

  //    google drive states
  const [openPicker, authResponse] = useDrivePicker();
  const [gdriveFile, setGdriveFile] = useState("");

  //        dropbox file download
  const { open, isOpen } = useDropboxChooser({
    appKey: API_KEYS.DROP_BOX_API_KEY,
    chooserOptions: { multiple: false, linkType: "direct" },

    onSelected: (files) => {
      toggleProgressBarAnimation(true, false);
      var url = files[0].link;
      var filename = files[0].name;
      if (filename.split(".").pop() !== "zip") {
        setErrorMsg("select zip files only");
        modalaRef.current.click();
        toggleProgressBarAnimation(false, true);
      } else {
        JSZipUtils.getBinaryContent(url, (er, data) => {
          if (er) {
            setErrorMsg("Error While opening file from dropBox");
            modalaRef.current.click();
            toggleProgressBarAnimation(false, true);
          } else {
            const blob = new Blob([data], { type: "application/zip" });
            const f = new File([blob], filename, { type: "application/zip" });
            toggleProgressBarAnimation(false, false);
            showFile(f, true);
          }
        });
      }
    },
  });

  //     downloading file from google drive
  useEffect(() => {
    if (authResponse && gdriveFile) {
      toggleProgressBarAnimation(true, false);
      var xhr = new XMLHttpRequest();
      var url = `https://www.googleapis.com/drive/v3/files/${gdriveFile.id}?alt=media`;

      xhr.open("GET", url);
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + authResponse.access_token
      );
      xhr.setRequestHeader("Content-Type", "application/x-zip-compressed");
      xhr.responseType = "blob";
      xhr.send();
      xhr.onload = function () {
        var content = xhr.response;
        if (xhr.status === 403 || gdriveFile.name.split(".").pop() !== "zip") {
          toggleProgressBarAnimation(false, true);
          setErrorMsg("Please select zip files only");
          modalaRef.current.click();
        } else {
          const b = new Blob([content], { type: "application/zip" });
          const f = new File([b], gdriveFile.name, { type: "application/zip" });
          toggleProgressBarAnimation(false, false);
          showFile(f, true);
        }
      };
      xhr.onerror = function () {
        toggleProgressBarAnimation(false, true);
        setErrorMsg("Error while downloading Google drive file");
        modalaRef.current.click();
      };
    }
  }, [authResponse, gdriveFile]);

  //    google drive file selector
  const openGoogleDrive = (e) => {
    e.preventDefault();

    openPicker({
      clientId: API_KEYS.GOOGLE_DRIVE_CLIENT_ID,
      developerKey: API_KEYS.GOOGLE_DIRVE_DEVELOPER_KEY,
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      setSelectFolderEnabled: true,
      supportDrives: true,
      multiselect: false,
      callbackFunction: (files) => {
        try {
          if (files.action === "picked") {
            if (files.docs[0]) {
              setGdriveFile(files.docs[0]);
            }
          }
        } catch {
          setErrorMsg("error occured while opening google drive");
          modalaRef.current.click();
        }
      },
    });
  };
  const handleClick = () => {
    inputFileRef.current.click();
  };

  //    Read and display files
  function showFile(fileName, checkExt) {
    //check file extension
    if (checkExt && fileName.name.split(".").pop() !== "zip") {
      setErrorMsg("please select zip files only");
      modalaRef.current.click();
      return;
    }
    toggleProgressBarAnimation(true, false);

    //reading zip file content
    JSZip.loadAsync(fileName)
      .then((zips) => {
        //remove progressBar
        toggleProgressBarAnimation(false, false);
        //file displaying
        document.getElementById("filename-id").innerText = fileName.name;
        const files = zips.files;
        var treeBody = document.getElementById("jstree");
        $.jstree.destroy();
        var tree = "";
        treeBody.innerHTML = "";
        // add_href([]);

        // building jstree folder structure
        const paths = [];
        for (const file in files) {
          paths.push(file);
        }
        tree = BuildFolderTree(paths);
        treeBody.innerHTML = tree;

        for (const file in files) {
          if (files[file].dir === false) {
            //adding files to zip
            files[file].async("blob").then(function (c) {
              const name = files[file].name.replace(/\s+/g, "");
              zips.file(files[file].name, c);

              if (name.indexOf(".") !== -1) {
                const href = URL.createObjectURL(c);
                add_href((h) => {
                  h[name] = href;
                  return h;
                });
              }
            });
          }
        }

        //adding all zip files
        setZipFiles({ zipName: fileName.name, zips });

        // jstree
        $(function () {
          $.jstree.create("#jstree");
          $("#jstree").bind("select_node.jstree", function (e, data) {
            const lastName = data.node.a_attr.id;
            if (lastName.indexOf(".") !== -1) {
              console.log(lastName);
              const a = Object.assign(document.createElement("a"), {
                href: hrefs[lastName],
                style: "display:none",
                download: lastName.split("/").pop(),
              });
              document.body.appendChild(a);
              a.click();
              a.remove();
            }
          });
        });
        // removing href url's
      })
      .catch((er) => {
        toggleProgressBarAnimation(false, true);
        console.log(er);
        if (er == "Error: Encrypted zip are not supported")
          setErrorMsg("Encrypted zip are not supported");
        else setErrorMsg("error while reading zip file !");
        modalaRef.current.click();
      });
  }

  //    on drag and drop file
  const handleDrag = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.type === "drop" && e.dataTransfer.files) {
      showFile(e.dataTransfer.files[0], true);
    }
  };

  //    fetching file from URL
  const fecthFromURL = () => {
    var url, filename;

    url = prompt("Open file from URL", "https://");
    // url = "http://127.0.0.1:8125/testing1.zip";
    if (url === null || url === undefined) return;

    filename = url.substring(url.lastIndexOf("/") + 1);

    if (filename.indexOf(".") === -1) filename += ".zip";
    if (filename.length === 0) filename = "download";
    //get file content from url
    toggleProgressBarAnimation(true, false);
    JSZipUtils.getBinaryContent(url, (er, data) => {
      if (er || data === null || data === undefined) {
        toggleProgressBarAnimation(false, true);
        setErrorMsg("Error while fetching zip file from Entered URL ");
        modalaRef.current.click();
      } else {
        toggleProgressBarAnimation(false, false);
        const blob = new Blob([data], { type: "application/zip" });
        const f = new File([blob], filename, { type: "application/zip" });
        showFile(f, false);
      }
    });
  };

  //    saving all files as zip
  function saveAllFiles() {
    const zips = zipFile.zips;
    const name = zipFile.zipName;
    if (zips === undefined || zips === null) {
      setErrorMsg("zip files not loaded ,download failed !");
      modalaRef.current.click();
      return;
    }
    zips.generateAsync({ type: "blob" }).then((c) => {
      saveAs(c, name);
    });
  }

  //  toggling progress bar
  const toggleProgressBarAnimation = (isOn, isError) => {
    if (isOn === true) {
      document.getElementById("meth-cont").style.display = "none";
      document.getElementById("progress-bar-id").style.display = "block";
      document.getElementById("the_app").className = "appState_loading";
    } else if (isOn === false) {
      document.getElementById("files_list").style.display =
        isError === true ? "none" : "block";
      document.getElementById("progress-bar-id").style.display = "none";
      document.getElementById("top_desc").style.display =
        isError === true ? "block" : "none";
      document.getElementById("bot_desc").style.display =
        isError === true ? "block" : "none";
      document.getElementById("the_app").className =
        isError === true ? "appState_initial" : "appState_fileIsLoaded";
      document.getElementById("meth-cont").style.display =
        isError === true ? "block" : "none";
    }
  };
  //    return main content
  const reloadMainPage = () => {
    document.getElementById("files_list").style.display = "none";
    document.getElementById("progress-bar-id").style.display = "none";
    document.getElementById("top_desc").style.display = "block";
    document.getElementById("bot_desc").style.display = "block";
    document.getElementById("jstree").textContent = "";
    document.getElementById("the_app").className = "appState_initial";
    document.getElementById("meth-cont").style.display = "block";
  };

  //    anchor tag
  const handleMoreButton = (e) => {
    e.preventDefault();
    document.getElementById("moreBtn").style.display = "none";
    document.getElementById("more_formats").style.display = "block";
  };

  //    icons hover effect
  const gdriveIconHover = (e) => {
    if (e) {
      document
        .getElementById("gdriveIcon")
        .setAttribute(
          "src",
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16.93 14.74'%3E%3Cpath d='M16.92 9.3h-5.14a.91.91 0 01-.9-.54C9.3 6.04 7.7 3.33 6.1.62 6 .45 5.91.27 5.78.01c.27 0 .45-.06.63-.06h4.55a1 1 0 01.74.36c1.7 2.83 3.36 5.67 5 8.52a3.92 3.92 0 01.22.47z' fill='%23fed14b'/%3E%3Cpath d='M5.35.37c.78 1.32 1.45 2.6 2.26 3.78a1.73 1.73 0 010 2.18c-1.49 2.42-2.89 4.9-4.32 7.36l-.47.77a2.34 2.34 0 01-.29-.32C1.71 12.75.88 11.37.09 9.96a.84.84 0 010-.7C1.73 6.42 3.4 3.6 5.09.77c.02-.11.11-.2.26-.4z' fill='%232eb672'/%3E%3Cpath d='M16.93 9.84a3.17 3.17 0 01-.16.42c-.8 1.37-1.61 2.75-2.44 4.11a.8.8 0 01-.56.35H3.64a2.24 2.24 0 01-.29 0 3.91 3.91 0 01.19-.47c.79-1.36 1.57-2.73 2.39-4.07a.87.87 0 01.62-.36h10a3.2 3.2 0 01.38.02z' fill='%23537abd'/%3E%3C/svg%3E"
        );
      document.getElementById("gdriveIcon").style.opacity = "1";
    }
  };
  const gdriveIconHoverOut = (e) => {
    if (e) {
      document
        .getElementById("gdriveIcon")
        .setAttribute(
          "src",
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16.93 14.74'%3E%3Cpath d='M16.92 9.3h-5.14a.91.91 0 01-.9-.54C9.3 6.04 7.7 3.33 6.1.62 6 .45 5.91.27 5.78.01c.27 0 .45-.06.63-.06h4.55a1 1 0 01.74.36c1.7 2.83 3.36 5.67 5 8.52a3.92 3.92 0 01.22.47zM5.35.37c.78 1.32 1.45 2.6 2.26 3.78a1.73 1.73 0 010 2.18c-1.49 2.42-2.89 4.9-4.32 7.36l-.47.77a2.34 2.34 0 01-.29-.32C1.71 12.75.88 11.37.09 9.96a.84.84 0 010-.7C1.73 6.42 3.4 3.6 5.09.77c.02-.11.11-.2.26-.4zM16.93 9.84a3.17 3.17 0 01-.16.42c-.8 1.37-1.61 2.75-2.44 4.11a.8.8 0 01-.56.35H3.64a2.24 2.24 0 01-.29 0 3.91 3.91 0 01.19-.47c.79-1.36 1.57-2.73 2.39-4.07a.87.87 0 01.62-.36h10a3.2 3.2 0 01.38.02z' fill='%23000'/%3E%3C/svg%3E"
        );
      document.getElementById("gdriveIcon").style.opacity = "0.5";
    }
  };

  const dropBoxIconHover = (e) => {
    if (e) {
      document
        .getElementById("dropBoxIcon")
        .setAttribute(
          "src",
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 17.11 15.91'%3E%3Cg fill='%233498d8'%3E%3Cpath d='M5.03 0L0 3.29l3.48 2.78 5.07-3.13L5.03 0z'/%3E%3Cpath d='M0 8.86l5.03 3.29 3.52-2.94-5.07-3.14L0 8.86z'/%3E%3Cpath d='M8.55 9.21l3.53 2.94 5.03-3.29-3.48-2.79-5.08 3.14zM17.11 3.29L12.08 0 8.55 2.94l5.08 3.13 3.48-2.78z'/%3E%3Cpath d='M8.56 9.84l-3.53 2.93-1.51-.99v1.11l5.04 3.02 5.05-3.02v-1.11l-1.51.99-3.54-2.93z'/%3E%3C/g%3E%3C/svg%3E"
        );
      document.getElementById("dropBoxIcon").style.opacity = "1";
    }
  };

  const dropBoxIconHoverOut = (e) => {
    if (e) {
      document
        .getElementById("dropBoxIcon")
        .setAttribute(
          "src",
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 17.11 15.91'%3E%3Cg fill='%23000'%3E%3Cpath d='M5.03 0L0 3.29l3.48 2.78 5.07-3.13L5.03 0z'/%3E%3Cpath d='M0 8.86l5.03 3.29 3.52-2.94-5.07-3.14L0 8.86z'/%3E%3Cpath d='M8.55 9.21l3.53 2.94 5.03-3.29-3.48-2.79-5.08 3.14zM17.11 3.29L12.08 0 8.55 2.94l5.08 3.13 3.48-2.78z'/%3E%3Cpath d='M8.56 9.84l-3.53 2.93-1.51-.99v1.11l5.04 3.02 5.05-3.02v-1.11l-1.51.99-3.54-2.93z'/%3E%3C/g%3E%3C/svg%3E"
        );
      document.getElementById("dropBoxIcon").style.opacity = "0.5";
    }
  };

  return (
    <div className="content">
      <button
        id="modalBtn"
        ref={modalaRef}
        data-bs-toggle="modal"
        data-bs-target="#modal"
      ></button>
      <div className="modal fade" id="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Error</h4>
            </div>
            <div className="modal-body">
              Something went wrong...
              <br />
              {errorMsg}
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column" style={{ textAlign: "center" }}>
        <a
          href="/#"
          className="title d-flex flex-row justify-content-center align-items-center mt-3"
          onClick={preventDefault}
        >
          <img
            className="img-fluid d-inline-block"
            height="60px"
            width="60px"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2907.15 2334.32'%3E%3Cpath d='M1183.24 1320.8h10.9c40.7 0 81.3-.1 122 .1 6.6 0 13.5.6 19.7 2.7 27.2 9 38.2 41.3 22.5 65.4a95.61 95.61 0 01-6.7 8.7q-81.9 98.4-163.9 196.7c-2.1 2.5-4.1 5.2-6.7 8.4 3.2 5 6.3 10.1 9.6 15q81.3 121.8 162.5 243.7a112.37 112.37 0 017.4 11.9 43.63 43.63 0 01-31.9 63.4 92.72 92.72 0 01-13.9.9c-37.7.1-75.3 0-113 0h-12.3v345.4c0 4.3.2 8.7-.5 13-3.3 21.3-20.1 36.4-41.7 37.9-3.3.2-6.7.1-10 .1h-916c-25.2-.6-43.4-17.9-45.1-43-.2-3.7-.1-7.3-.1-11v-342.3H50.64a91.87 91.87 0 01-13.9-.9c-29.1-4.7-45.2-36.2-32.1-62.7a96.3 96.3 0 016.3-10.2q74.85-112.35 149.7-224.6c2-3 4-6.1 6.4-9.8-2-3.2-4-6.6-6.2-9.8Q86 1507.45 11.14 1395.2c-3.7-5.5-7.3-11.4-9.2-17.6-8.3-27.5 11-54.3 40.3-56.4 3.3-.2 6.7-.1 10-.1H352c5.3-17.5 10.2-34.1 15.4-50.5C496.9 861.1 837 540.5 1253.8 435.1a1270.52 1270.52 0 01189.8-32.9 1225.2 1225.2 0 01202.7-3.1c232.1 16.1 444.6 89.4 634.8 223.5q362.55 255.6 488.9 682c19 64.3 31.9 130 39.9 196.6a1335.11 1335.11 0 019.2 158.6v585.6c3.2.3 5.8.8 8.3.8 12 .1 24-.2 36 .1 24.5.6 43.2 19.2 43.7 43 .5 23.5-17.9 43.2-42.1 44.9-3 .2-6 .1-9 .1q-411.45 0-823-.1a79.83 79.83 0 01-16.9-1.4c-21.1-4.6-35.9-24.6-34.2-45.5 1.9-22.7 19.3-40 41.7-40.9 11.6-.5 23.3-.1 35-.2h10.5c.3-3.7.8-6.6.8-9.5 0-197 .8-394-.3-591-1.1-202.9-126-385.7-314.1-462.8-76-31.1-155.1-43.5-236.8-35.8-129.9 12.3-239.2 67.1-328.3 162.4-2.9 3.1-5.6 6.3-8.4 9.5a4.74 4.74 0 011.24 1.8zm-652.7 263.5c1-10.8 1.9-20.3 2.7-29.9a1000.79 1000.79 0 0135-187.3c116.7-407.9 478.7-716.4 922-748.3a1037.12 1037.12 0 01213.5 7 1020.22 1020.22 0 01262.2 71.9 1036.72 1036.72 0 01633 954.5q.15 290 0 580v12.4c13.9 2.4 124.8 1.7 132.2-.8v-10.7-575a1226.17 1226.17 0 00-7-132.7c-7.6-70.4-21.1-139.6-41.8-207.3q-111.3-365-414.5-596.5c-184.9-140.9-394.4-218.2-626.3-234.7a1136.53 1136.53 0 00-191.7 3.1c-65.5 6.4-130 17.7-193.3 35.5Q858 637.55 615 973c-130 180-201.2 381.8-215.9 603.5-.2 2.5 0 5.1 0 7.9 44.14-.1 87.34-.1 131.44-.1zm219.7-.1c4.8-31.2 8.2-61.4 14.1-91.1 27.9-140.2 88-265.2 182.1-372.9 146.9-168.2 332.4-262.1 555-281.4 79.2-6.9 157.9-1 235.5 16.1 268.6 59.1 488.2 247.7 587.5 504.2 37.2 96.2 54.4 196 54.3 299.1q-.45 286.5-.1 573c0 4.5.3 9.1.5 14h131.6v-589.4a982.55 982.55 0 00-8.6-131.6 939.23 939.23 0 00-64.4-237.4c-132.6-317.2-436.5-553.3-806.3-580.2a943.92 943.92 0 00-533.3 120.3c-259.8 147.2-449.7 417.6-478 743.5-.4 4.5 0 9 0 13.7 44 .1 87.2.1 130.1.1zm222.3 0c.4-2.2.7-3.5 1-4.8 5-26.5 8.5-53.4 15.4-79.4 64.4-243.3 272.6-418.6 523.6-441.2 77.6-7 153.7 1.5 228.1 24.7 244.4 76.1 418.5 304.8 417.8 567.9-.1 39.7 0 79.3 0 119v462c0 4.2.3 8.4.4 12.8h131.6v-12.4-581a726.87 726.87 0 00-22.6-181c-74.4-291-328.5-518.8-647.6-544.1a709.26 709.26 0 00-189.1 10.1c-145.1 27.6-270.9 92.9-376.2 196.5-113 111.2-182.3 245.6-208.6 402.1-2.7 16-4.2 32.1-6.4 48.8h132.6zm128.3 353.4h-13.9q-177 0-353.9.1c-21.4 0-36.6-8.4-47.3-27.1-34.7-60.4-70-120.4-105.1-180.5-1.7-3-3.7-5.8-6.2-9.6-2.3 15.8-1.6 517.8.6 524.7h525.9c-.1-102.4-.1-204.3-.1-307.6zm-450.2-263.7c1.6 3.3 2.6 5.7 3.8 7.9q46.8 80.25 93.5 160.6c3.4 6 7.6 7.1 13.8 7q232.95-.15 465.8-.1c3.2 0 6.4-.3 10.7-.5-2.2-3.7-3.6-6.3-5.2-8.7q-53.25-79.8-106.3-159.7c-3.5-5.4-7.3-7.4-13.7-7.4q-226.35.3-452.8.2c-2.9 0-5.8.4-9.6.7zm-523.4 174.9c4.2.3 6.8.6 9.4.6q114 0 228 .1c6 0 9.7-1.9 13-6.9q53.85-81.3 108-162.2a74.5 74.5 0 003.7-7.2h-11.1c-74.7 0-149.3.1-224-.2-7.6 0-12 2.3-16.1 8.7q-52 78.9-104.6 157.3c-1.8 2.7-3.6 5.5-6.3 9.8zM2708.84 704.3c-6.6 0-10.9-3.3-13.6-11-4.2-11.9-8.5-23.8-12-36-5.7-19.6-17.9-32-37.7-37.4-11.9-3.2-23.4-7.6-35-11.6-8.4-2.9-11.6-7.2-11.5-14.3.1-6.7 3.3-10.8 11.2-13.5 12.6-4.3 25.2-8.6 37.9-12.5 17.6-5.5 29-16.7 34.3-34.5 3.8-12.7 8.5-25.2 12.6-37.9 1.9-5.9 5.2-10 11.5-11.1 7.1-1.3 13 2.4 15.9 10.5 4.5 12.5 8.9 25.1 12.7 37.8 5.4 18.6 17.3 30.1 35.8 35.5 12.8 3.8 25.4 8 37.9 12.6 9.6 3.5 13.4 13.2 7.9 20.7-2.2 3-6 5.3-9.5 6.6-12.2 4.4-24.5 8.6-36.9 12.3-18 5.4-29.7 16.8-35 35-3.8 12.8-8.2 25.3-12.7 37.8-2.7 7.7-7.2 11-13.8 11zM903.14 0c6.8 0 10.9 3.1 13.7 11 3.8 10.7 7.2 21.4 10.8 32.2 1.2 3.5 2.4 6.9 3.6 10.4 5 14.1 14.7 23.6 28.7 28.5 12.2 4.3 24.6 8.2 36.9 12.3 2.2.7 4.5 1.4 6.6 2.3 6.5 2.7 10.1 7.7 9.8 13.6-.4 6.2-3.5 10.7-9.5 12.8-5 1.8-10.1 3.5-15.1 5.1-9.5 3.2-18.9 6.3-28.4 9.5-14.5 4.9-24.3 14.7-29.3 29.2-4.3 12.6-8.5 25.2-12.8 37.8-.7 2.2-1.4 4.4-2.3 6.6a13.76 13.76 0 01-25.6 0c-2.5-6.5-4.5-13.2-6.8-19.8-2.5-7.6-5.2-15.1-7.6-22.7-5.1-16.2-15.8-26.6-31.8-31.8-13-4.2-25.9-8.5-38.9-12.8-5.3-1.7-9.8-4.3-11.5-10.1-2.3-8 1.3-14.6 10.2-17.8 11.9-4.2 23.8-8.5 36-11.9 19.7-5.5 32-17.9 37.6-37.5 3.5-12.1 7.8-24 12-36 2.8-7.9 6.9-10.9 13.7-10.9z'/%3E%3Cpath d='M308.24 1122.3c.2 6.9-2.8 11.3-10.4 14-11.9 4.2-23.8 8.5-36 11.9-19.7 5.5-32.1 17.7-37.8 37.3-3.6 12.5-7.9 24.7-12.3 36.9-3.1 8.7-10.3 12.2-18.1 9.4-5.2-1.8-7.7-6.1-9.3-11-4.1-12.3-8.6-24.5-12.2-36.9-5.3-18.2-16.9-29.6-35-35-11.2-3.3-22.1-7.2-33.2-10.9-2.2-.7-4.5-1.4-6.6-2.3-5.8-2.4-9.1-7-9-13.2s3.2-10.8 9.3-12.9c8.8-3.1 17.6-6 26.4-9 5-1.7 10.1-3.3 15.2-4.9 16.5-5.2 27.1-16.2 32.3-32.6 3.3-10.5 6.9-20.8 10.3-31.3.8-2.5 1.6-5.1 2.5-7.6 3-8 7.7-12.1 14.3-11.7 7.2.4 11.4 4.6 13.5 11.4 1.6 5.4 3.6 10.7 5.4 16.1 2.8 8.5 5.5 17.1 8.5 25.6 5.1 14.4 14.7 24.3 29.2 29.2 13.9 4.7 27.8 9.2 41.6 13.9 8 2.9 11.16 6.9 11.4 13.6zM1563.74 1453.1c6.4 0 11.1 3.5 13.7 11 4.3 12.2 8.6 24.5 12.2 36.9 5.5 18.9 17.4 30.8 36.4 36.2 12.1 3.4 24 7.9 36 11.9 4.6 1.5 8.5 3.7 10.6 8.4 3.4 7.8-.1 15.8-9.1 19-12.5 4.5-25.3 8.2-37.8 12.8a88.72 88.72 0 00-19.5 9.7c-7.6 5.2-12.1 13.1-15 21.9-4.4 13.6-9.1 27.1-13.6 40.7-1.8 5.3-4.5 9.6-10.4 11-7.8 1.8-14.1-1.5-17.1-10-4.4-12.2-8.7-24.5-12.3-36.9-5.5-19.4-17.7-31.3-37-36.9-12.4-3.6-24.7-7.9-36.9-12.3-7.6-2.7-11.1-8.3-10.2-15.1.9-6.3 4.8-10 10.6-11.9 12.6-4.2 25.1-8.9 37.9-12.6 18.2-5.3 29.6-16.9 35.1-34.9 3.9-12.7 8.2-25.3 12.5-37.9 2.7-7.5 7.5-11 13.9-11z'/%3E%3C/svg%3E"
            alt=""
          />
          <div className="heading">Archive Extractor</div>
        </a>
        <div className="appState_initial" id="the_app">
          <div className="app_desc" id="top_desc">
            Archive Extractor is a small and easy online tool that can extract
            over 70 types of compressed files, such as 7z, zipx, rar, tar, exe,
            dmg and much more.
          </div>
          <div className="card">
            <div className="methods_container" id="meth-cont">
              <button
                className="btn btn-primary px-4 py-2"
                id="openFileBtn"
                onClick={handleClick}
              >
                <div className="meth1">Choose file</div>
                <div className="meth2">from your computer</div>
                <input
                  id="fileInput"
                  type="file"
                  multiple="multiple"
                  style={{
                    display: "none",
                  }}
                  ref={inputFileRef}
                  onChange={(e) => {
                    e.preventDefault();
                    showFile(e.target.files[0], true);
                  }}
                />
              </button>
              <div className="open_methods mt-4">
                <a
                  href="/#"
                  className="gdrive m-2"
                  onClick={openGoogleDrive}
                  onMouseOver={gdriveIconHover}
                  onMouseOut={gdriveIconHoverOut}
                >
                  <img
                    className="icon"
                    id="gdriveIcon"
                    alt=""
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16.93 14.74'%3E%3Cpath d='M16.92 9.3h-5.14a.91.91 0 01-.9-.54C9.3 6.04 7.7 3.33 6.1.62 6 .45 5.91.27 5.78.01c.27 0 .45-.06.63-.06h4.55a1 1 0 01.74.36c1.7 2.83 3.36 5.67 5 8.52a3.92 3.92 0 01.22.47zM5.35.37c.78 1.32 1.45 2.6 2.26 3.78a1.73 1.73 0 010 2.18c-1.49 2.42-2.89 4.9-4.32 7.36l-.47.77a2.34 2.34 0 01-.29-.32C1.71 12.75.88 11.37.09 9.96a.84.84 0 010-.7C1.73 6.42 3.4 3.6 5.09.77c.02-.11.11-.2.26-.4zM16.93 9.84a3.17 3.17 0 01-.16.42c-.8 1.37-1.61 2.75-2.44 4.11a.8.8 0 01-.56.35H3.64a2.24 2.24 0 01-.29 0 3.91 3.91 0 01.19-.47c.79-1.36 1.57-2.73 2.39-4.07a.87.87 0 01.62-.36h10a3.2 3.2 0 01.38.02z' fill='%23000'/%3E%3C/svg%3E"
                  />
                  from Google Drive
                </a>
                <a
                  href="/#"
                  className="dropbox m-3"
                  onMouseOver={dropBoxIconHover}
                  onMouseOut={dropBoxIconHoverOut}
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  disabled={isOpen}
                >
                  <img
                    id="dropBoxIcon"
                    className="icon"
                    alt=""
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 17.11 15.91'%3E%3Cg fill='%23000'%3E%3Cpath d='M5.03 0L0 3.29l3.48 2.78 5.07-3.13L5.03 0z'/%3E%3Cpath d='M0 8.86l5.03 3.29 3.52-2.94-5.07-3.14L0 8.86z'/%3E%3Cpath d='M8.55 9.21l3.53 2.94 5.03-3.29-3.48-2.79-5.08 3.14zM17.11 3.29L12.08 0 8.55 2.94l5.08 3.13 3.48-2.78z'/%3E%3Cpath d='M8.56 9.84l-3.53 2.93-1.51-.99v1.11l5.04 3.02 5.05-3.02v-1.11l-1.51.99-3.54-2.93z'/%3E%3C/g%3E%3C/svg%3E"
                  />
                  Dropbox
                </a>
                <a
                  href="/#"
                  className="url"
                  onClick={(e) => {
                    e.preventDefault();
                    fecthFromURL();
                  }}
                >
                  <img
                    alt=""
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M5.86 12.694l-.81.804a1.812 1.812 0 01-2.545 0 1.751 1.751 0 01-.522-1.251c0-.473.185-.917.522-1.252l2.98-2.956c.618-.613 1.78-1.515 2.626-.675a.991.991 0 101.397-1.407c-1.439-1.428-3.566-1.164-5.42.674l-2.98 2.957A3.72 3.72 0 000 12.247a3.72 3.72 0 001.109 2.658A3.777 3.777 0 003.777 16c.967 0 1.934-.365 2.67-1.095l.81-.804a.991.991 0 10-1.397-1.407zM14.89 1.21c-1.545-1.534-3.707-1.617-5.138-.197l-1.01 1.001A.99.99 0 1010.14 3.42l1.009-1.001c.741-.736 1.712-.431 2.345.197.338.335.523.78.523 1.252s-.185.917-.522 1.252l-3.18 3.154c-1.454 1.442-2.136.765-2.427.476a.991.991 0 00-1.397 1.407c.668.662 1.43.99 2.228.99.978 0 2.01-.492 2.993-1.467l3.18-3.154A3.722 3.722 0 0016 3.868a3.722 3.722 0 00-1.11-2.66z' fill='%23000' fill-rule='evenodd'/%3E%3C/svg%3E"
                    className="icon"
                  />
                  URL
                </a>
              </div>
              <div
                className="drop_here"
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrag}
              >
                or drag and drop file here...
              </div>
            </div>
            <div className="open_progress_group" id="progress-bar-id">
              <div className="container" id="progress-bar-wrapper">
                <ProgressBar animated striped variant="info" now={100} />
                <button
                  type="button"
                  className="cancel btn btn-secondary btn-sm mt-2"
                  onClick={() => reloadMainPage(true)}
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className="file_loaded_group" id="files_list">
              <div className="files-header">Archive successfully extracted</div>
              <p className="single">Click on a file to download it.</p>
              <div id="archive">
                <button
                  data-href="/prepare/zip"
                  className="btn btn-xl btn-primary ladda-button"
                  id="save_file_btn"
                  data-google-vignette="false"
                  data-style="expand-right"
                  data-size="xs"
                  onClick={saveAllFiles}
                >
                  <i className="my-icon bi bi-download"></i>
                  <span className="ladda-label">Save all as ZIP</span>
                </button>
                <div className="filename" id="filename-id"></div>
                <div id="jstree"></div>

                <div className="container w-100 mt-3">
                  <div className="row">
                    <div className="col d-flex justify-content-start">
                      <button
                        className="btn btn-sm btn-secondary"
                        id="extract_another_button"
                        onClick={() => reloadMainPage(false)}
                      >
                        <i className="my-icon bi bi-arrow-left"></i>
                        Extract another archive
                      </button>
                    </div>
                    <div className="col d-flex justify-content-end">
                      <a
                        href="/#"
                        target="_blank"
                        className="btn btn-secondary btn-sm"
                        rel="noopener noreferrer"
                      >
                        <i className="my-icon bi bi-heart-fill"></i>Rate Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="app_desc" id="bot_desc">
            <div className="strong">Supported formats:</div>
            <div id="supported_formats">
              <span className="initial">
                7z, zipx, rar, tar, exe, dmg, iso, zip, msi, nrg, gz, cab, bz2,
                wim, ace{" "}
              </span>
              <span className="more_formats" id="more_formats">
                alz, ar, arc, arj, bin, cdi, chm, cpt, cpio, cramfs, crunch,
                deb, dd, dms, ext, fat, format, gpt, hfs, ihex, lbr, lzh, lzma,
                lzm, mbr, mdf, nsa, nds, nsis, ntfs, pit, pak, pdf, pp, qcow2,
                rpm, sar, squashfs, squeeze, sit, sitx, swf, udf, uefi, vdi,
                vhd, vmdk, warc, xar, xz, z, zoo, zi, jar
              </span>
              &nbsp;
              <a
                href="/#"
                className="more_button"
                id="moreBtn"
                onClick={handleMoreButton}
              >
                and 54 more
              </a>
            </div>
            <div className="features">
              <div className="strong">Supports password-protected archives</div>
              <div className="strong">
                Can unpack multi-part archives (zip.001, rar.part1, z01, etc)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// const unzipper = require("unzipper");

// (async () => {
//   try {
//     const directory = await unzipper.Open.file("path/to/your.zip");
//     const extracted = await directory.files[0].buffer("PASSWORD");
//     // If the extracted entity is a file,
//     // converting the extracted buffer to string would print the file content
//     console.log(extracted.toString());
//   } catch (e) {
//     console.log(e);
//   }
// })();

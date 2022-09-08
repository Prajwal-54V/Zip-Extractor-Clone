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

// npm i use-dropbox-chooser
const GOOGLE_DRIVE_CLIENT_ID =
  "115233091202-gnrihfkkaed9f4k42nadgerg2fcnpnl6.apps.googleusercontent.com";
const GOOGLE_DIRVE_DEVELOPER_KEY = "AIzaSyB29XZv29ASIZXvLsQFrM4s4sAkNbUdq0A";
const DROP_BOX_API_KEY = "7oklo3xf71vdg5s";

export default function Content() {
  const [zipFile, setZipFiles] = useState(null);
  const [hrefs, add_href] = useState([]);
  const inputFileRef = useRef(null);

  //google drive states
  const [openPicker, authResponse] = useDrivePicker();
  const [gdriveFile, setGdriveFile] = useState("");

  //dropbox file download
  const { open, isOpen } = useDropboxChooser({
    appKey: DROP_BOX_API_KEY,
    chooserOptions: { multiple: false, linkType: "direct" },
    onSelected: (files) => {
      var url = files[0].link;
      var filename = files[0].name;
      JSZipUtils.getBinaryContent(url, (er, data) => {
        if (er) console.log("er", er);
        const blob = new Blob([data], { type: "application/zip" });
        const f = new File([blob], filename, { type: "application/zip" });
        showFile(f, false);
      });
    },
  });

  //
  // downloading file from google drive
  useEffect(() => {
    if (authResponse && gdriveFile) {
      // console.log(gdriveFile);
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

        const b = new Blob([content], { type: "application/zip" });
        const f = new File([b], gdriveFile.name, { type: "application/zip" });
        showFile(f, true);
      };
      xhr.onerror = function () {
        console.log("err");
      };
    }
  }, [authResponse, gdriveFile]);
  var dropBoxFiles = [];

  const handleClick = () => {
    inputFileRef.current.click();
  };

  function showFile(fileName, checkExt) {
    //check file extension
    if (checkExt === true && fileName.name.split(".").pop() !== "zip") {
      alert("Please Select Zip files only");
      return;
    }
    //progress bar animation
    document.getElementById("meth-cont").style.display = "none";
    document.getElementById("progress-bar-id").style.display = "block";

    const element = document.getElementById("progress-bar-clip");
    let width = 1;
    const id = setInterval(frame, 80);
    function frame() {
      if (width === 90) {
        element.classList.add("progress-bar-animated");
        clearInterval(id);
      } else {
        width++;
        element.style.width = width + "%";
        element.innerText = width + "%";
      }
    }

    //loading zip file
    JSZip.loadAsync(fileName)
      .then((zips) => {
        element.style.width = 100 + "%";
        element.innerText = 100 + "%";
        clearInterval(id);
        document.getElementById("files_list").style.display = "block";
        document.getElementById("progress-bar-id").style.display = "none";
        document.getElementById("desc_top").style.display = "none";
        document.getElementById("desc_bottom").style.display = "none";
        document.getElementById("the_app").className =
          "bootstrap appState_fileIsLoaded";

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

        //adding all zip files to state
        setZipFiles({ zipName: fileName.name, zips });
        $(function () {
          $.jstree.create("#jstree");
          // console.log("jstree init");
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
      .catch((er) => console.log("error", er));
  }

  //select file on drag and drop
  const handleDrag = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.type === "drop") {
      showFile(e.dataTransfer.files[0], true);
    }
  };

  //google drive file selector
  const openGoogleDrive = (e) => {
    e.preventDefault();

    openPicker({
      clientId: GOOGLE_DRIVE_CLIENT_ID,
      developerKey: GOOGLE_DIRVE_DEVELOPER_KEY,
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      setSelectFolderEnabled: true,
      supportDrives: true,
      multiselect: false,
      // customViews: customViewsArray, // custom view
      callbackFunction: (files) => {
        // if (data.action === "cancel") {
        // console.log("User clicked cancel/close button");
        // }
        if (files.action === "picked") {
          if (files.docs[0]) {
            setGdriveFile(files.docs[0]);
          }
        }
      },
    });
  };

  //yet to complete.... :)
  const fecthFromURL = () => {
    var url, filename;

    url = prompt("Open file from URL", "https://");

    // url = "https://drive.google.com/uc?export=download&id=" + driveUrl;
    // url = "http://127.0.0.1:8125/testing1.zip";

    filename = url.substring(url.lastIndexOf("/") + 1);

    //get file content from url
    JSZipUtils.getBinaryContent(url, (er, data) => {
      if (er) console.log("er", er);
      const blob = new Blob([data], { type: "application/zip" });
      const f = new File([blob], filename, { type: "application/zip" });
      showFile(f, false);
    });
  };
  //saving all files as zip
  function saveAllFiles() {
    const zips = zipFile.zips;
    const name = zipFile.zipName;
    if (zips === undefined || zips === null) {
      console.log("zip files not loaded");
      return;
    }
    zips.generateAsync({ type: "blob" }).then((c) => {
      saveAs(c, name);
    });
  }

  //return main content
  const reloadMainPage = (canceled) => {
    document.getElementById("files_list").style.display = "none";
    document.getElementById("progress-bar-id").style.display = "none";
    document.getElementById("desc_top").style.display = "block";
    document.getElementById("desc_bottom").style.display = "block";
    document.getElementById("jstree").textContent = "";
    document.getElementById("the_app").className = "bootstrap appState_initial";
    document.getElementById("meth-cont").style.display = "block";
  };

  //anchor tag
  const handleMoreButton = () => {
    document.getElementById("moreBtn").style.display = "none";
    document.getElementById("moreFormats").style.display = "block";
  };

  return (
    <div className="content">
      <div className="content-app" style={{ textAlign: "center" }}>
        <a href="/#" className="app-logo">
          <span className="glyph"></span>
          <div className="title">
            <div className="row_1">Archive Extractor</div>
          </div>
        </a>
        <div className="bootstrap appState_initial" id="the_app">
          <div className="app_desc app_desc_top" id="desc_top">
            Archive Extractor is a small and easy online tool that can extract
            over 70 types of compressed files, such as 7z, zipx, rar, tar, exe,
            dmg and much more.
          </div>
          <div className="root_panel">
            <div className="methods_Container" id="meth-cont">
              <button id="openFileBtn" onClick={handleClick}>
                <div className="row1">Choose file</div>
                <div className="row2">from your computer</div>
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
              <div className="open_remote">
                <div className="or_methods">
                  <a
                    href="/#"
                    className="gdrive google"
                    onClick={openGoogleDrive}
                  >
                    <i className="icon"></i>from Google Drive
                  </a>
                  <a
                    href="/#"
                    className="dropbox"
                    onClick={(e) => {
                      e.preventDefault();
                      open();
                    }}
                    disabled={isOpen}
                  >
                    <i className="icon"></i>Dropbox
                  </a>
                  <a
                    href="/#"
                    className="url"
                    onClick={(e) => {
                      e.preventDefault();
                      fecthFromURL();
                    }}
                  >
                    <i className="icon"></i>URL
                  </a>
                </div>
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
              <div id="open_progress_bar">
                <div className="progress">
                  <div
                    id="progress-bar-clip"
                    className="progress-bar progress-bar-striped"
                    role="progressbar"
                    style={{ width: "0%", minWidth: "2em" }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <button
                  type="button"
                  className="cancel btn btn-secondary btn-sm"
                  onClick={() => reloadMainPage(true)}
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className="file_loaded_group" id="files_list">
              <div className="h">Archive successfully extracted</div>
              <p className="single">Click on a file to download it.</p>
              <div id="archive">
                <button
                  data-href="/prepare/zip"
                  className="btn btn-xl btn-primary ladda-button"
                  id="download_all_as_zip_button"
                  data-google-vignette="false"
                  data-style="expand-right"
                  data-size="xs"
                  onClick={saveAllFiles}
                >
                  <i className="my-glyphicon glyphicon-download-alt"></i>
                  <span className="ladda-label">Save all as ZIP</span>
                </button>
                <div className="filename" id="filename-id"></div>
                <div id="jstree"></div>

                <table className="t_bottom t_collapse">
                  <tbody>
                    <tr>
                      <td className="c_1">
                        <button
                          className="btn btn-sm btn-secondary"
                          id="extract_another_button"
                          onClick={() => reloadMainPage(false)}
                        >
                          <i className="my-glyphicon glyphicon-arrow-left"></i>
                          Extract another archive
                        </button>
                      </td>
                      <td className="c_2">
                        <a
                          href="/#"
                          target="_blank"
                          className="btn btn-secondary btn-sm"
                          rel="noopener noreferrer"
                        >
                          <i className="my-glyphicon glyphicon-heart"></i> Rate
                          Us
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="app_desc app_desc_bottom" id="desc_bottom">
            <div className="h">Supported formats:</div>
            <div id="supported_formats">
              <span className="initial">
                7z, zipx, rar, tar, exe, dmg, iso, zip, msi, nrg, gz, cab, bz2,
                wim, ace{" "}
              </span>
              <span className="more_formats" id="moreFormats">
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
              <p>Supports password-protected archives</p>
              <p>
                Can unpack multi-part archives (zip.001, rar.part1, z01, etc)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="index-blocks">
        <div className="one-col"> </div>
      </div>
    </div>
  );
}

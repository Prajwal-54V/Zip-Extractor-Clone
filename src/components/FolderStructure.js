export function BuildFolderTree(paths) {
  const fileIcon = '{"icon":"https://extract.me/i/filetypes/file_2x.png"}';
  const folderIcon =
    '{"icon":"https://extract.me/i/filetypes/folder_2x.png","opened":true}';
  const singleFiles = [];
  var nestedFolder = [];
  var s = "<ul>";
  paths.forEach((path) => {
    if (path.indexOf("/") === -1) {
      singleFiles.push(path);
    } else {
      nestedFolder.push(path);
    }
  });

  nestedFolder = nestedFolder.sort();
  singleFiles.forEach((file) => {
    // s += `<li data-jstree=${fileIcon}><a id=${file} download=${file}>${file}</a></li>`;
    s += `<li data-jstree=${fileIcon}><a id=${file.replace(
      /\s+/g,
      ""
    )} download=${file.replace(/\s+/g, "")}>${file}</a></li>`;
  });

  var directories = [];
  var topmark = 0;

  nestedFolder.forEach((value) => {
    var limb = value.split("/");

    for (let i = 0; i < limb.length; i++) {
      if (i + 1 === limb.length) {
        if (topmark > 1) {
          let t = "</li></ul>".repeat(topmark - i);
          s += t;
        }
        if (limb[i] !== "") {
          // s += `<li data-jstree=${fileIcon}>${limb[i]}</li>`;
          s += `<li data-jstree=${fileIcon}><a id=${value.replace(
            /\s+/g,
            ""
          )} download=${limb[i].replace(/ /g, "")}>${limb[i]}</a></li>`;
        }

        topmark = i;
      } else {
        if (directories[i] !== limb[i]) {
          if (topmark > i) {
            let tt = "</ul>".repeat(topmark - i);
            s += tt;
          }

          s += `<li data-jstree=${folderIcon}> ${limb[i]}<ul>`;
          directories[i] = limb[i];
        }
      }
    }
  });

  var t = "</ul>".repeat(topmark + 1);
  s += t;
  return s;
}

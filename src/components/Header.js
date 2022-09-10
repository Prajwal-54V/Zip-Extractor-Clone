import React from "react";
import "../css/Header.css";

export default function Header() {
  return (
    <div className="navbar navbar-expand-md navbar-dark bg-black py-0 px-0">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a
          id="brandIcon"
          className="navbar-brand ms-auto me-auto pe-3"
          href="/#"
        >
          <img
            src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='106' height='18' fill='none'%3E%3Ccircle cx='4' cy='14' r='4' fill='%23FDD835'/%3E%3Ccircle cx='14' cy='14' r='4' fill='%23FF5722'/%3E%3Ccircle cx='14' cy='4' r='4' fill='%2303A9F4'/%3E%3Cpath d='M38.652 6.623c0-.438-.156-.794-.467-1.068-.298-.274-.697-.411-1.198-.411-.515 0-.934.137-1.26.41-.31.261-.5.61-.568 1.049h-3.473c.095-1.343.623-2.445 1.584-3.308C34.231 2.432 35.497 2 37.068 2c1.611 0 2.884.425 3.818 1.274.934.85 1.401 1.918 1.401 3.205 0 .905-.21 1.692-.63 2.363-.42.658-1.028 1.336-1.827 2.035l-3.128 2.712h5.788v3.144H31.808v-2.939l5.422-4.87c.488-.438.847-.828 1.077-1.17.23-.343.345-.72.345-1.13zm-8.895-4.356v14.466H26V2.267h3.757zm13.724 4.13c.122-1.329.697-2.39 1.726-3.185C46.237 2.404 47.475 2 48.924 2c1.543 0 2.782.384 3.716 1.15.948.754 1.422 1.706 1.422 2.857 0 .794-.204 1.459-.61 1.993a3.38 3.38 0 01-1.462 1.13c.677.192 1.273.582 1.787 1.171.528.576.792 1.343.792 2.302 0 1.301-.514 2.363-1.543 3.185-1.03.808-2.363 1.212-4 1.212-1.585 0-2.905-.411-3.961-1.233-1.042-.835-1.611-1.945-1.706-3.329h3.493c.095.425.332.774.71 1.048.38.274.867.411 1.463.411.555 0 1.016-.137 1.381-.41.366-.288.548-.672.548-1.151 0-.48-.19-.843-.568-1.09-.366-.26-.86-.39-1.483-.39h-1.502V7.897h1.218c.569 0 1.015-.123 1.34-.37.339-.26.508-.61.508-1.048 0-.41-.156-.74-.467-.986-.312-.26-.718-.39-1.219-.39-.5 0-.913.123-1.238.37a1.49 1.49 0 00-.569.924h-3.493zm32.449-4.13c1.652 0 2.945.466 3.88 1.397.947.918 1.42 2.117 1.42 3.596 0 1.452-.48 2.651-1.441 3.596-.948.932-2.207 1.397-3.777 1.397H73.92v4.48h-3.635V2.267h5.645zm-.325 3.123H73.92v3.74h1.685c.596 0 1.07-.171 1.422-.514.352-.356.528-.808.528-1.356 0-.561-.176-1.013-.528-1.356-.338-.342-.812-.514-1.422-.514zM88.4 2.267c1.651 0 2.944.466 3.878 1.397.948.918 1.422 2.117 1.422 3.596 0 1.452-.48 2.651-1.442 3.596-.948.932-2.207 1.397-3.777 1.397h-2.092v4.48h-3.635V2.267h5.645zm-.325 3.123h-1.686v3.74h1.686c.595 0 1.07-.171 1.421-.514.352-.356.528-.808.528-1.356 0-.561-.176-1.013-.528-1.356-.338-.342-.812-.514-1.421-.514zm6.431 7.028h3.635c.094.452.331.822.71 1.11.38.273.894.41 1.544.41.609 0 1.083-.13 1.422-.39a1.29 1.29 0 00.507-1.048c0-.712-.487-1.144-1.462-1.294l-2.153-.33c-2.707-.424-4.061-1.814-4.061-4.17 0-1.37.514-2.494 1.543-3.37 1.03-.89 2.342-1.336 3.94-1.336 1.598 0 2.897.397 3.899 1.192 1.016.794 1.611 1.883 1.787 3.267h-3.594c-.258-.918-.955-1.377-2.092-1.377-.528 0-.961.123-1.3.37a1.161 1.161 0 00-.508.986c0 .644.474 1.035 1.422 1.172l2.092.308c1.3.192 2.315.65 3.046 1.377.745.712 1.117 1.684 1.117 2.917 0 1.466-.494 2.63-1.482 3.494-.989.863-2.363 1.294-4.123 1.294-1.652 0-3.006-.411-4.062-1.233-1.056-.835-1.665-1.952-1.827-3.35z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M59.747 12.253v4.481h-3.655V7.97c0-3.29 2.637-5.958 5.89-5.958h.236c3.252 0 5.89 2.667 5.89 5.958v8.764h-3.656v-4.48h-4.705zm0-4.283c0-1.248 1-2.26 2.234-2.26h.237c1.234 0 2.234 1.012 2.234 2.26v1.163h-4.705V7.97z' fill='white'/%3E%3C/svg%3E"
            alt=""
            width={"105px"}
            height={"18px"}
          />
        </a>

        <div
          className="collapse navbar-collapse h-100 mb-2"
          id="navbarNavAltMarkup"
        >
          <ul className="navbar-nav h-100">
            <li className="nav-item dropdown" id="fd">
              <a
                className="nav-link  active"
                href="/#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="icon icon-vtool"
                  src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='14' fill='white'%3E%3Cpath fill-rule='evenodd' d='M7 1h3c1.425 0 2.419.001 3.185.08.75.075 1.169.217 1.482.426a3 3 0 01.827.827c.21.313.35.733.427 1.482.078.766.079 1.76.079 3.185s-.001 2.419-.08 3.185c-.075.75-.217 1.169-.426 1.482a3 3 0 01-.827.827c-.313.21-.733.35-1.482.427-.766.078-1.76.079-3.185.079H7c-1.425 0-2.419-.001-3.185-.08-.75-.075-1.169-.217-1.482-.426a3 3 0 01-.827-.827c-.21-.313-.35-.733-.427-1.482C1.001 9.419 1 8.425 1 7s.001-2.419.08-3.185c.075-.75.217-1.169.426-1.482a3 3 0 01.827-.827c.313-.21.733-.35 1.482-.427C4.581 1.001 5.575 1 7 1zM0 7c0-2.809 0-4.213.674-5.222A4 4 0 011.778.674C2.787 0 4.19 0 7 0h3c2.809 0 4.213 0 5.222.674.437.292.812.667 1.104 1.104C17 2.787 17 4.19 17 7c0 2.809 0 4.213-.674 5.222a4.003 4.003 0 01-1.104 1.104C14.213 14 12.81 14 10 14H7c-2.809 0-4.213 0-5.222-.674a4.002 4.002 0 01-1.104-1.104C0 11.213 0 9.81 0 7zm10.467.4a.5.5 0 000-.8L7.8 4.6A.5.5 0 007 5v4a.5.5 0 00.8.4l2.667-2z' clip-rule='evenodd'/%3E%3C/svg%3E"
                  alt=""
                />
                Video Tools
                <img
                  className="icon-dropdown"
                  src="data:image/svg+xml,%3Csvg width='10' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23fff' stroke-linecap='round'/%3E%3C/svg%3E"
                  alt=""
                />
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="/#">
                    Video Editor
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Trim Video
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Merge Videos
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Add Audio to Video
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Add Image to Video
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Add Text to Video
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Remove Logo from Video
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Crop Video
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Rotate Video
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Flip Video
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Resize Video
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Loop Video
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Change Volume
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Change Video Speed
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Stabalize Video
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Video Recorder
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown" id="fd">
              <a
                className="nav-link  active"
                href="/#"
                id="navbarDropdownMenuLinkAudioTool"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="icon icon-atools"
                  src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13' height='14' fill='white'%3E%3Cpath d='M0 5.5a.5.5 0 011 0v3a.5.5 0 01-1 0v-3zm12 0a.5.5 0 011 0v3a.5.5 0 01-1 0v-3zm-9-2a.5.5 0 011 0v7a.5.5 0 01-1 0v-7zm6 0a.5.5 0 011 0v7a.5.5 0 01-1 0v-7zm-3-3a.5.5 0 011 0v13a.5.5 0 01-1 0V.5z'/%3E%3C/svg%3E"
                  alt=""
                />
                Audio Tools
                <img
                  className="icon-dropdown"
                  src="data:image/svg+xml,%3Csvg width='10' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23fff' stroke-linecap='round'/%3E%3C/svg%3E"
                  alt=""
                />
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLinkAudioTool"
              >
                <li>
                  <a className="dropdown-item" href="/#">
                    Trim Audio
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Change Volume
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Change Speed
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Change Pitch
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Equalizer
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Reverse Audio
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Voice Recorder
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Audio Joiner
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown" id="fd">
              <a
                className="nav-link  active"
                href="/#"
                id="navbarDropdownMenuLinkPDFTool"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="icon icon-vtool"
                  src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='white' viewBox='0 0 14 14'%3E%3Cpath fill-rule='evenodd' d='M.001 3a3 3 0 013-3H7.26a3 3 0 012.12.879l2.744 2.742A3 3 0 0113 5.743V11a3 3 0 01-3 3h-7a3 3 0 01-3-3V3zm3-2H7v3.5A2.5 2.5 0 009.5 7h2.501v4a2 2 0 01-2 2h-7a2 2 0 01-2-2V3a2 2 0 012-2zm9 5v-.257a2 2 0 00-.586-1.415L8.673 1.586c-.18-.18-.443-.323-.673-.422V4.5A1.5 1.5 0 009.5 6h2.501z' clip-rule='evenodd'/%3E%3C/svg%3E"
                  alt=""
                />
                PDF Tools
                <img
                  className="icon-dropdown"
                  src="data:image/svg+xml,%3Csvg width='10' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23fff' stroke-linecap='round'/%3E%3C/svg%3E"
                  alt=""
                />
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLinkPDFTool"
              >
                <li>
                  <a className="dropdown-item" href="/#">
                    Convert from PDF
                    <img
                      className="icon-dropdown-right"
                      src="data:image/svg+xml,%3Csvg width='10' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23fff' stroke-linecap='round'/%3E%3C/svg%3E"
                      alt=""
                    />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-submenu"
                    data-cstyle="submenu"
                  >
                    <li>
                      <a className="dropdown-item" href="/#">
                        PDF to Word
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        PDF to Excel
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        PDF to PPT
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        PDF to JPG
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        PDF to PNG
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        PDF to HTML
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Convert to PDF
                    <img
                      className="icon-dropdown-right"
                      src="data:image/svg+xml,%3Csvg width='10' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23fff' stroke-linecap='round'/%3E%3C/svg%3E"
                      alt=""
                    />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-submenu"
                    data-cstyle="submenu"
                  >
                    <li>
                      <a className="dropdown-item" href="/#">
                        Word to PDF
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        JPG to PDF
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        Excel to PDF
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        PPT to PDF
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        PNG to PDF
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Split
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Merge
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Compress
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Unlock
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Protect
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Rotate
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Add Page Numbers
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown" id="fd">
              <a
                className="nav-link  active"
                href="/#"
                id="navbarDropdownMenuLinkConverter"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="icon icon-vtool"
                  src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='17' fill='white'%3E%3Cpath fill-rule='evenodd' d='M.218 8.737A7.497 7.497 0 014 2.22v1.183a6.501 6.501 0 003 11.794v1.005A7.5 7.5 0 01.218 8.737zM11 15.482A7.5 7.5 0 007 1.27v1.006a6.5 6.5 0 014 12.072v1.134z' clip-rule='evenodd'/%3E%3Cpath fill-rule='evenodd' d='M10.753 12.565a.5.5 0 01.5.5v2.328h2.329a.5.5 0 110 1h-3.329v-3.328a.5.5 0 01.5-.5zM.207 2.726a.5.5 0 00.5.5h2.329v2.328a.5.5 0 001 0V2.226H.707a.5.5 0 00-.5.5z' clip-rule='evenodd'/%3E%3Cpath d='M9.218 8.737a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z'/%3E%3C/svg%3E"
                  alt=""
                />
                Converters
                <img
                  className="icon-dropdown"
                  src="data:image/svg+xml,%3Csvg width='10' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23fff' stroke-linecap='round'/%3E%3C/svg%3E"
                  alt=""
                />
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLinkConverter"
              >
                <li>
                  <a className="dropdown-item" href="/#">
                    Audio Converters
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Video Converters
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Image Converter
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Document Converter
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Font Converter
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Archive Converter
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Ebook Converter
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown" id="fd">
              <a
                className="nav-link  active"
                href="/#"
                id="navbarDropdownMenuLinkUtility"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="icon icon-vtool"
                  src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='white'%3E%3Cpath d='M.242 3.786a.482.482 0 01.682 0l1.26 1.26c.103.104.25.154.395.138l1.704-.197.238-1.754a.4796.4796 0 00-.137-.405l-1.25-1.252a.482.482 0 01.68-.681l1.252 1.251c.319.32.47.77.41 1.217L5.22 5.252l8.03 8.03a.482.482 0 11-.682.68L4.533 5.929 2.69 6.14a1.445 1.445 0 01-1.188-.414l-1.26-1.26a.482.482 0 010-.681zm13.859-1.639l-.987-1.016-1.874 1.44a.193.193 0 00-.07.197l.119.503.003.004-2.92 2.92.682.681 2.921-2.922.514.133a.193.193 0 00.202-.07l1.41-1.87zM6.886 10.59l-.682-.682-3.195 3.194a.61.61 0 11-.863-.863l3.195-3.194-.681-.682-3.195 3.195a1.574 1.574 0 102.226 2.226l3.195-3.195z'/%3E%3C/svg%3E"
                  alt=""
                />
                Video Tools
                <img
                  className="icon-dropdown"
                  src="data:image/svg+xml,%3Csvg width='10' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23fff' stroke-linecap='round'/%3E%3C/svg%3E"
                  alt=""
                />
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLinkUtility"
              >
                <li>
                  <a className="dropdown-item" href="/#" id="utilityId">
                    Archive Extractor
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <button
          id="sign-in"
          className="btn btn-dark bg-black btn-sm position-absolute top-0 end-0 me-3 mt-2"
        >
          Log in
        </button>
      </div>
    </div>
  );
}

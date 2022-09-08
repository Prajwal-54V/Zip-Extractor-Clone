import React from "react";
import "../css/Header.css";
export default function Header() {
  return (
    <div className="header">
      <button className="burger" type="button">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <a href="https://123apps.com/" className="headerIcon icon icon-logo">
        {" "}
      </a>
      <nav
        className="main-menu"
        role="navigation"
        arial-label="menu"
        style={{ overflow: "visible" }}
      >
        <ul className="level-1">
          <li className="has-dropdown">
            <a className="has-dropdown" href="/#">
              <i className="icon icon-left icon-vtools"></i>
              Video Tools
              <i className="icon icon-dropdown"></i>
            </a>
            <ul className="level-2" area-label="submenu" role="menu">
              <li className="veditor">
                <a href="https://online-video-cutter.com/video-editor">
                  <i className="icon icon-veditor"></i>Video Editor
                </a>
              </li>
              <li className="vtrim">
                <a href="https://online-video-cutter.com/">
                  <i className="icon icon-vtrim"></i>Trim Video
                </a>
              </li>
              <li className="vmerge">
                <a href="https://online-video-cutter.com/merge-videos">
                  <i className="icon icon-vmerge"></i>Merge Video
                </a>
              </li>
              <li className="addaudio">
                <a href="https://online-video-cutter.com/video-editor">
                  <i className="icon icon-addaudio"></i>Video Editor
                </a>
              </li>
              <li className="addimage">
                <a href="https://online-video-cutter.com/add-image-to-video">
                  <i className="icon icon-addimage"></i>Add image to Video
                </a>
              </li>
              <li className="addtext">
                <a href="https://online-video-cutter.com/add-text-to-video">
                  <i className="icon icon-addtext"></i>Add text to video
                </a>
              </li>
              <li className="delogo">
                <a href="https://online-video-cutter.com/remove-logo">
                  <i className="icon icon-delogo"></i>Remove Logo from Video
                </a>
              </li>
              <li className="vcrop">
                <a href="https://online-video-cutter.com/crop-video">
                  <i className="icon icon-vcrop"></i>Crop Video
                </a>
              </li>
              <li className="vrotate">
                <a href="https://online-video-cutter.com/rotate-video">
                  <i className="icon icon-vrotate"></i>Rotate Video
                </a>
              </li>
              <li className="vflip">
                <a href="https://online-video-cutter.com/flip-video">
                  <i className="icon icon-vflip"></i>Flip Video
                </a>
              </li>
              <li className="vresolution">
                <a href="https://online-video-cutter.com/resize-video">
                  <i className="icon icon-vresolution"></i>Resize Video
                </a>
              </li>
              <li className="vloop">
                <a href="https://online-video-cutter.com/loop-video">
                  <i className="icon icon-vloop"></i>Loop Video
                </a>
              </li>
              <li className="vvolume">
                <a href="https://online-video-cutter.com/volume">
                  <i className="icon icon-vvolume"></i>
                  Change volume
                </a>
              </li>
              <li className="vspeed">
                <a href="https://online-video-cutter.com/change-video-speed">
                  <i className="icon icon-vspeed"></i>Change Video Speed
                </a>
              </li>
              <li className="stabilize">
                <a href="https://online-video-cutter.com/stabilize-video">
                  <i className="icon icon-stabilize"></i>Stabalize Video
                </a>
              </li>
              <li className="webcamera">
                <a href="https://webcamera.io/">
                  <i className="icon icon-webcamera"></i>Video Recorder
                </a>
              </li>
            </ul>
          </li>

          <li className="has-dropdown">
            <a className="has-dropdown" href="/#">
              <i className="icon icon-left icon-atools"></i>
              Audio Tools
              <i className="icon icon-dropdown"></i>
            </a>
            <ul className="level-2" area-label="submenu" role="menu">
              <li className="atrim">
                <a href="/#">
                  <i className="icon icon-atrim"></i>Trim Audio
                </a>
              </li>
              <li className="avolume">
                <a href="/#">
                  <i className="icon icon-avolume"></i>Change Volume
                </a>
              </li>
              <li className="aspeed">
                <a href="/#">
                  <i className="icon icon-aspeed"></i>Change Speed
                </a>
              </li>
              <li className="pitch">
                <a href="/#">
                  <i className="icon icon-pitch"></i>Change Pitch
                </a>
              </li>
              <li className="equalizer">
                <a href="/#">
                  <i className="icon icon-addimage"></i>equalizer
                </a>
              </li>
              <li className="areverse">
                <a href="/#">
                  <i className="icon icon-areverse"></i>Reverse Audio
                </a>
              </li>
              <li className="vrecorder">
                <a href="/#">
                  <i className="icon icon-vrecorder"></i>Voice Recorder
                </a>
              </li>
              <li className="ajoiner">
                <a href="/#">
                  <i className="icon icon-ajoiner"></i>Audio Joiner
                </a>
              </li>
            </ul>
          </li>

          <li className="has-dropdown">
            <a className="has-dropdown" href="/#">
              <i className="icon icon-left icon-pdftools"></i>
              PDF Tools
              <i className="icon icon-dropdown"></i>
            </a>
            <ul className="level-2" area-label="submenu" role="menu">
              <li className="frompdf has-dropdown">
                <a href="/#">
                  <i className="icon icon-frompdf"></i>Convert from PDF
                </a>
              </li>
              <li className="topdf has-dropdown">
                <a href="/#">
                  <i className="icon icon-topdf"></i>Convert to PDF
                </a>
              </li>
              <li className="split">
                <a href="/#">
                  <i className="icon icon-split"></i>split
                </a>
              </li>
              <li className="merge">
                <a href="/#">
                  <i className="icon icon-merge"></i>merge
                </a>
              </li>
              <li className="compress">
                <a href="/#">
                  <i className="icon icon-compress"></i>compress
                </a>
              </li>
              <li className="unlock">
                <a href="/#">
                  <i className="icon icon-unlock"></i>Unlock
                </a>
              </li>
              <li className="protect">
                <a href="/#">
                  <i className="icon icon-protect"></i>Protect
                </a>
              </li>
              <li className="rotate">
                <a href="/#">
                  <i className="icon icon-rotate"></i>Rotate
                </a>
              </li>
              <li className="page-numbers">
                <a href="/#">
                  <i className="icon icon-page-numbers"></i>Add Page Numbers
                </a>
              </li>
            </ul>
          </li>

          <li className="has-dropdown">
            <a className="has-dropdown" href="/#">
              <i className="icon icon-left icon-converters"></i>
              Converters
              <i className="icon icon-dropdown"></i>
            </a>
            <ul className="level-2" area-label="submenu" role="menu">
              <li className="aconv">
                <a href="/#">
                  <i className="icon icon-aconv"></i>Audio Converters
                </a>
              </li>
              <li className="vconv">
                <a href="/#">
                  <i className="icon icon-vconv"></i>Video Converter
                </a>
              </li>
              <li className="cimage">
                <a href="/#">
                  <i className="icon icon-cimage"></i>Image Converters
                </a>
              </li>
              <li className="cdocument">
                <a href="/#">
                  <i className="icon icon-cdocument"></i>Document Converter
                </a>
              </li>
              <li className="cfont">
                <a href="/#">
                  <i className="icon icon-cfont"></i>Font Converter
                </a>
              </li>
              <li className="carchive">
                <a href="/#">
                  <i className="icon icon-carchive"></i>Archive Converter
                </a>
              </li>
              <li className="cebook">
                <a href="/#">
                  <i className="icon icon-cebook"></i>Ebook Converter
                </a>
              </li>
            </ul>
          </li>

          <li className="current has-dropdown">
            <a className="has-dropdown" href="/#">
              <i className="icon icon-left icon-utils"></i>
              Utilities
              <i className="icon icon-dropdown"></i>
            </a>
            <ul className="level-2" area-label="submenu" role="menu">
              <li className="unarchiver current">
                <a href="/#" className="current">
                  <i className="icon icon-unarchiver"></i>Archiver Extractor
                </a>
              </li>
            </ul>
          </li>

          <li className="more hidden">
            <a className="has-dropdown" href="/#">
              <i className="icon icon-lmore"></i>
            </a>
            <ul className="level-2" area-label="submenu" role="menu"></ul>
          </li>
        </ul>
      </nav>
      <div className="buttons">
        <div className="usermenu">
          <button id="sign-in" className="sign-in sm">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

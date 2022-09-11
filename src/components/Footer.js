import React from "react";
import "../css/Footer.css";

export default function Footer({ preventDefault }) {
  return (
    <div className="container-fluid footer">
      <div className="row">
        <div className="col-6 d-md-flex flex-row footer-left ms-4 p-3">
          <div className="box copyright me-3" id="copyright">
            ©&nbsp;123apps Computer Software Est. 2012-2022
          </div>
          <div className="box menu">
            <a href="/#" onClick={preventDefault}>
              Privacy
            </a>{" "}
            <a href="/#" onClick={preventDefault}>
              Pricing
            </a>
            <button
              className="feedback_button"
              href="/#"
              onClick={preventDefault}
            >
              Contact Us
            </button>
          </div>
        </div>
        <a
          className="col d-flex flex-row justify-content-end  align-items-center p-1 me-3"
          id="language-link"
          href="/#"
          onClick={preventDefault}
        >
          <i className="icon-language"></i>
          <span id="lang">English</span>
        </a>
      </div>
    </div>
  );
}

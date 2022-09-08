import React from "react";
import "../css/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="copyright" id="copyright">
        ©&nbsp;123apps Computer Software Est. 2012–2022
      </div>
      <div className="menu">
        <a href="/legal">Privacy</a> <a href="/pricing">Pricing</a>
        <button
          className="feedback_button"
          data-desc="Please use this form to get in touch with us, report a bug, or suggest a feature."
          href="#"
        >
          Contact Us
        </button>
      </div>
      <a
        id="language-link"
        href="/#"
        data-toggle="modal"
        data-dismiss="modal"
        data-target="#modal-language"
      >
        <i className="icon icon-language"></i>
        <span>English</span>
      </a>
    </div>
  );
}

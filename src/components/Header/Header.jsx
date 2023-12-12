import React from 'react'

import "./Header.css"

import logo_name from "../../img/logo-name.png";
import logo from "../../img/logo.png";

export default function Header() {
  return (
    <header id="header-main-page">
      <div id='header-logo-images'>
        <img src={logo} alt="logo" id="header-logo" />
        <img src={logo_name} alt="logo" id="header-logo-name" />
      </div>
        <p>Educação para <strong>todos</strong>, com a ajuda de <strong>todos</strong>.</p>
    </header>
  )
}

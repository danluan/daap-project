import React from 'react'

import "./Header.css"

import logo from "../../img/logo-name.png";

export default function Header() {
  return (
    <header id="header-main-page">
        <img src={logo} alt="logo" id="header-logo" />
        <p>Educação para <strong>todos</strong>, com a ajuda de <strong>todos</strong>.</p>
    </header>
  )
}

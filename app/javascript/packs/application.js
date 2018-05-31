import { injectGlobal } from 'styled-components'
import 'typeface-orbitron'

// Support component names relative to this directory:
var componentRequireContext = require.context("components", true)
var ReactRailsUJS = require("react_ujs")
ReactRailsUJS.useContext(componentRequireContext)

// Global styles
injectGlobal`
  html { height: 100%; }
  body {
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: 'Orbitron', sans-serif;
    > div { height: 100%; }
  }
  input:focus,
  button:focus {
    outline: none;
  }
`
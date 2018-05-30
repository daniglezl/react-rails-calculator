import { injectGlobal } from 'styled-components'
import 'typeface-orbitron'

// Support component names relative to this directory:
var componentRequireContext = require.context("components", true)
var ReactRailsUJS = require("react_ujs")
ReactRailsUJS.useContext(componentRequireContext)

// Global styles
injectGlobal`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Orbitron', sans-serif;
  }
  input:focus,
  button:focus {
    outline: none;
  }
`
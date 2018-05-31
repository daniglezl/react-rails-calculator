import React from 'react'
import styled from 'styled-components'
import Main from './main/main'

const App = ({ className }) => (
  <div className={className}>
    <Main />
  </div>
)

export default styled(App)`
  height: 100%;
`
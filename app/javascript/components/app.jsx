import React, { Component } from 'react'
import styled from 'styled-components'
import { colors } from '../ui/variables'
import Calculator from './calculator/calculator'

class App extends Component {
  render() {
    const { className } = this.props
    return (
      <div className={className}>
        <Calculator />
      </div>
    )
  }
}

export default styled(App)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${ colors.lightBg }
`
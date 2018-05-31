import React, { Component } from 'react'
import styled from 'styled-components'
import { colors } from '../ui/variables'
import Calculator from './calculator/calculator'
import ServerSwitch from './server_switch/server_switch'

class App extends Component {
  state = {
    evalInServer: true
  }

  handleSwitch = () => this.setState(({ evalInServer }) => ({ evalInServer: !evalInServer }))

  render() {
    const { className } = this.props
    return (
      <div className={className}>
        <ServerSwitch
          on={this.state.evalInServer}
          handleSwitch={this.handleSwitch}
          className="server-switch"
        />
        <div className="container">
          <Calculator evalOnServer={this.state.evalInServer}/>
        </div>
      </div>
    )
  }
}

export default styled(App)`
  .server-switch {
    position: absolute;
    bottom: 1em;
    right: 1em;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: ${ colors.lightBg };
  }
`
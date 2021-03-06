import React, { Component } from 'react'
import styled from 'styled-components'
import { colors } from '../../ui/variables'
import Calculator from '../calculator/calculator'
import ServerSwitch from '../server_switch/server_switch'

const RECENT_N = 10

class Main extends Component {
  state = {
    evalInServer: true,
    recentCalc: []
  }

  handleSwitch = () => this.setState(({ evalInServer }) => ({ evalInServer: !evalInServer }))

  saveCalc = (expression, result) => {
    this.setState(({ recentCalc }) => ({
      recentCalc: [{ expression, result }, ...recentCalc].slice(0, RECENT_N)
    }), () => localStorage.setItem("recentCalculations", JSON.stringify(this.state.recentCalc)))
  }

  render() {
    const { className } = this.props
    return (
      <div className={className}>
        <ServerSwitch
          on={this.state.evalInServer}
          handleSwitch={this.handleSwitch}
          className="server-switch"
        />
        <Calculator 
          evalOnServer={this.state.evalInServer}
          saveCalc={this.saveCalc}
          recent={this.state.recentCalc}
        />
      </div>
    )
  }

  componentDidMount() {
    const recent = localStorage.getItem("recentCalculations")
    if (recent) {
      this.setState({ recentCalc: JSON.parse(recent) })
    }
  }
}

export default styled(Main)`
  height: 100%;
  .server-switch {
    position: absolute;
    bottom: 1em;
    right: 1em;
    z-index: 100;
  }
`
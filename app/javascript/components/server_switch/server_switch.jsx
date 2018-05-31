import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../ui/variables'
import { Switch } from '../../ui'

const ServerSwitch = ({ on, className, handleSwitch }) => (
  <div className={className} style={{textAlign: "center"}}>
    <h4>Evaluate on server</h4>
    <Switch on={on} onClick={handleSwitch} className="switch" />
  </div>
)

ServerSwitch.propTypes = {
  on: PropTypes.bool.isRequired,
  handleSwitch: PropTypes.func.isRequired
}

export default styled(ServerSwitch)`
  h4 {
    float: left;
    margin: 0 10px;
    line-height: 45px;
  }
  .switch { float: left; }
`
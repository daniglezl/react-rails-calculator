import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../ui/variables'
import { Switch } from '../../ui'

const H4 = styled.h4`
  color: ${ colors.darkText };
`

const ServerSwitch = ({ on, className, handleSwitch }) => (
  <div className={className} style={{textAlign: "center"}}>
    <H4>Evaluate on server</H4>
    <Switch on={on} onClick={handleSwitch}/>
  </div>
)

ServerSwitch.propTypes = {
  on: PropTypes.bool.isRequired,
  handleSwitch: PropTypes.func.isRequired
}

export default ServerSwitch
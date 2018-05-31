import React from 'react'
import styled from 'styled-components'
import { colors } from '../../ui/variables'
import { Switch } from '../../ui'

const H4 = styled.h4`
  color: ${ colors.darkText };
`

export default ({ on, className, handleSwitch }) => (
  <div className={className} style={{textAlign: "center"}}>
    <H4>Evaluate on server</H4>
    <Switch on={on} onClick={handleSwitch}/>
  </div>
)
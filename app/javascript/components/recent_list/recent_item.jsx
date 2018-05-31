import React from 'react'
import styled from 'styled-components'
import { colors } from '../../ui/variables'

const Div = styled.div`
  background-color: ${ colors.white };
  margin: 15px;
  padding: 10px;
  text-align: left;
  overflow: hidden;
  transition: all .2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  > h4 {
    margin: 0;
  }
`

export default ({ expression, result, handleClick }) => (
  <Div onClick={handleClick}>
    <h4>{ `${expression}=${result}` }</h4>
  </Div>
)
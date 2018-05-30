import styled from 'styled-components'
import { colors } from './variables'

export const Button = styled.button.attrs({
  cols: props => props.cols || 1,
  rows: props => props.rows || 1
})`
  box-sizing: border-box;
  font-family: 'Orbitron', sans-serif;
  font-size: 1em;
  color: ${ colors.text };
  border: none;
  box-shadow: inset 0 0 1px ${ colors.lightBg };
  width: ${ props => `${props.cols * 50}px` };
  height: ${ props => `${props.rows * 50}px` };
  background-color: transparent;
  transition: all .1s ease-in-out;
  &:hover {
    background-color: ${ colors.secondary };
  }
`
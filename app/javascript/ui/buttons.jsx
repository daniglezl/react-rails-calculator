import React from 'react'
import styled from 'styled-components'
import { colors } from './variables'

export const Button = styled.button.attrs({
  cols: props => props.cols || 1,
  rows: props => props.rows || 1
})`
  box-sizing: border-box;
  font-family: 'Orbitron', sans-serif;
  font-size: 1em;
  color: ${ colors.lightText };
  border: none;
  box-shadow: inset 0 0 1px ${ colors.border };
  width: ${ props => `${props.cols * 50}px` };
  height: ${ props => `${props.rows * 50}px` };
  background-color: transparent;
  transition: all .1s ease-in-out;
  &:hover {
    box-shadow: inset 0 0 10px ${ colors.border };
  }
  &:active {
    box-shadow: inset 0 0 10px #000;
  }
`

const UnstyledSwitch = (_props) => {
  const { on, className = "", ...props } = _props
  const btnClassName = [
    "toggle-btn",
    on ? "toggle-btn-on" : "toggle-btn-off",
  ].filter(Boolean).join(" ")
  return (
    <div className={className}>
      <input className="toggle-input" type="checkbox" checked={on} onChange={() => {}}/>
      <button className={btnClassName} aria-label="Toggle" {...props} />
    </div>
  )
}

export const Switch = styled(UnstyledSwitch)`
  .toggle-btn {
    box-sizing: initial;
    display: inline-block;
    outline: 0;
    width: 6em;
    height: 3em;
    position: relative;
    cursor: pointer;
    user-select: none;
    background: ${ colors.lightGray };
    border-radius: 3em;
    padding: 4px;
    transition: all 0.4s ease;
    border: 2px solid rgba(0, 0, 0, 0.08);
  }
  .toggle-btn:focus::after,
  .toggle-btn:active::after {
    box-sizing: initial;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08);
  }
  .toggle-btn::after {
    left: 0;
    position: relative;
    display: block;
    content: '';
    width: 50%;
    height: 100%;
    border-radius: 3em;
    background: #FBFBFB;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      padding 0.3s ease, margin 0.3s ease;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08);
  }
  .toggle-btn.toggle-btn-on::after {
    left: 50%;
  }
  .toggle-btn.toggle-btn-on {
    background: ${ colors.secondary };
  }
  .toggle-btn.toggle-btn-on:active {
    box-shadow: none;
  }
  .toggle-btn.toggle-btn-on:active::after {
    margin-left: -1.1em;
  }
  .toggle-btn:active::after {
    padding-right: 1.1em;
  }
  .toggle-input {
    display: none;
  }
`
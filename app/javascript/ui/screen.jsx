import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from './variables'

const Input = styled.input`
  box-sizing: border-box;
  font-family: 'Orbitron', sans-serif;
  background-color: transparent;
  width: 100%;
  border: none;
  text-align: right;
  padding: 0 5px;
`

const ExpressionInput = Input.extend`
  height: 30px;
  font-size: 12px;
  font-weight: bold;
  color: ${ colors.darkText };
`

const ResultInput = Input.extend`
  height: 50px;
  color: ${ colors.lightText };
  font-weight: lighter;
  font-size: 30px;
`

class UnstyledScreen extends Component {
  render() {
    const { className, expression, result, expressionRef } = this.props
    return (
      <div className={className}>
        <ExpressionInput value={expression} innerRef={expressionRef} />
        <ResultInput value={result} />
      </div>
    )
  }
}

UnstyledScreen.propTypes = {
  expression: PropTypes.string.isRequired,
  result: PropTypes.number.isRequired
}

export const Screen = styled(UnstyledScreen)`
  box-sizing: border-box;
  background-image: linear-gradient(to bottom right, ${ colors.secondary }, ${ colors.primary });
  &.expression {
    background-color: transparent;
  }
  &.result {
    background-color: transparent;
  }
`
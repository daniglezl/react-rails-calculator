import React, { Component } from 'react'
import styled from 'styled-components'
import { colors } from '../../ui/variables'
import { Button, Screen } from '../../ui'

const buttons = [
  { text: "(", value: "(", cols: 2 },
  { text: ")", value: ")", cols: 2 },
  { text: "AC", value: "AC", cols: 1 },
  { text: "<-", value: "<-", cols: 1 },
  { text: "sqrt", value: "sqrt(", cols: 1 },
  { text: "^", value: "^", cols: 1 },
  { text: "7", value: "7", cols: 1 },
  { text: "8", value: "8", cols: 1 },
  { text: "9", value: "9", cols: 1 },
  { text: "/", value: "/", cols: 1 },
  { text: "4", value: "4", cols: 1 },
  { text: "5", value: "5", cols: 1 },
  { text: "6", value: "6", cols: 1 },
  { text: "*", value: "*", cols: 1 },
  { text: "1", value: "1", cols: 1 },
  { text: "2", value: "2", cols: 1 },
  { text: "3", value: "3", cols: 1 },
  { text: "-", value: "-", cols: 1 },
  { text: "0", value: "0", cols: 1 },
  { text: "00", value: "00", cols: 1 },
  { text: ".", value: ".", cols: 1 },
  { text: "+", value: "+", cols: 1 },
  { text: "=", value: "=", cols: 4, className: "equals"}
]

const SPECIAL_OPS = ["AC", "=", "<-"]

class Calculator extends Component {
  state = {
    expression: [],
    result: 0,
    error: ""
  }

  handleInputExpression = (value) => {
    SPECIAL_OPS.indexOf(value) > -1 ?
      this.handleSpecialOp(value) :
      this.addToExpression(value)
  }

  // handle input of operators that don't write to screen
  handleSpecialOp = (value) => {
    switch (value) {
      case SPECIAL_OPS[0]: // clear
        this.setState({ expression: [], result: 0, error: "" })
        break
      case SPECIAL_OPS[1]: // evaluate expression
        this.evalExpression()
        break
      case SPECIAL_OPS[2]: // backspace
        this.setState(state => ({ expression: state.expression.slice(0, -1) }))
        break
      default:
        throw new Error("Unrecognized operation")
    }
  }

  evalExpression = () => {
    try {
      // replace sqrt with Math.sqrt for it to be a correct expression
      const result = eval(this.state.expression.join('').replace(/sqrt/g, "Math.sqrt"))
      this.setState({ result, error: "" })
    } catch(e) {
      if (e instanceof SyntaxError) {
        this.setState({ error: "Invalid expression" })
      } else {
        console.log(e)
        this.setState({ error: "An error ocurred" })
      }
    }
  }

  addToExpression = (text) => {
    this.setState((state) => ({ expression: [...state.expression, text] }))
  }

  render() {
    const { className } = this.props
    const { error, expression, result } = this.state
    return (
      <div className={className}>
        { error && <span className="error">{ error }</span> }
        <Screen expression={expression.join('')} result={result} />
        { buttons.map(button => (
          <Button
            key={button.text}
            cols={button.cols}
            className={button.className}
            onClick={() => this.handleInputExpression(button.value)}
          >
            { button.text }
          </Button>
        )) }
      </div>
    )
  }
}

export default styled(Calculator)`
  position: relative;
  max-width: 200px;
  background: ${ colors.darkBg };
  > .error {
    box-sizing: border-box;
    position: absolute;
    top: -30px;
    height: 25px;
    line-height: 25px;
    background-color: ${ colors.danger };
    font-size: 12px;
    font-weight: bold;
    color: ${ colors.lightText };
    width: 100%;
    padding: 0 5px;
  }
  > button.equals {
    background-image: linear-gradient(to bottom right, ${ colors.secondary }, ${ colors.primary });
  }
`
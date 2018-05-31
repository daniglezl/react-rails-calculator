import React, { Component } from 'react'
import styled from 'styled-components'
import { colors } from '../../ui/variables'
import { Button, Screen } from '../../ui'
import { setCaretPosition } from '../../lib/util'

const buttons = [
  { text: "(", value: "(", cols: 1 },
  { text: ")", value: ")", cols: 1 },
  { text: "<", value: "<", cols: 1 },
  { text: ">", value: ">", cols: 1 },
  { text: "AC", value: "AC", cols: 1 },
  { text: "⌫", value: "⌫", cols: 1 },
  { text: "√", value: "√", cols: 1 },
  { text: "^", value: "^", cols: 1 },
  { text: "7", value: "7", cols: 1 },
  { text: "8", value: "8", cols: 1 },
  { text: "9", value: "9", cols: 1 },
  { text: "÷", value: "÷", cols: 1 },
  { text: "4", value: "4", cols: 1 },
  { text: "5", value: "5", cols: 1 },
  { text: "6", value: "6", cols: 1 },
  { text: "×", value: "×", cols: 1 },
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

const SPECIAL_OPS = ["AC", "=", "⌫", "<", ">"]

class Calculator extends Component {
  state = {
    expression: "",
    result: 0,
    error: ""
  }

  // ref to expression input to use when moving caret
  expressionInput = React.createRef()

  componentDidMount() {
    this.expressionInput.current.focus()
  }

  handleInputExpression = (value) => {
    const currentPos = this.expressionInput.current.selectionStart
    SPECIAL_OPS.indexOf(value) > -1 ?
      this.handleSpecialOp(value, currentPos) :
      this.addToExpression(value, currentPos)
  }

  // handle input of operators that don't write to screen
  handleSpecialOp = (value, pos) => {
    switch (value) {
      case SPECIAL_OPS[0]: // clear
        this.setState({ expression: "", result: 0, error: "" })
        break
      case SPECIAL_OPS[1]: // evaluate expression
        this.evalExpression(pos)
        break
      case SPECIAL_OPS[2]: // backspace
        this.setState(
          ({ expression }) => ({ expression: [expression.slice(0, pos - 1), expression.slice(pos)].join('') }),
          () => setCaretPosition(this.expressionInput.current, pos - 1, true)
        )
        break
      case SPECIAL_OPS[3]: // move caret to left
        setCaretPosition(this.expressionInput.current, -1)
        break
      case SPECIAL_OPS[4]: // move caret to right
        setCaretPosition(this.expressionInput.current, 1)
        break
      default:
        throw new Error("Unrecognized operation")
    }
  }

  evalExpression = (pos) => {
    try {
      // clean expression
      const cleanExpression = this.state.expression
        .replace(/√\(/g, "Math.sqrt(")
        .replace(/√([0-9]+)/g, "Math.sqrt($1)")
        .replace(/÷/g, "/")
        .replace(/×/g, "*")
        .replace(/\^/g, "**")
      const result = eval(cleanExpression)
      this.setState(
        { result, error: "" },
        () => setCaretPosition(this.expressionInput.current, pos, true)
      )
    } catch(e) {
      if (e instanceof SyntaxError) {
        this.setState({ error: "Invalid expression" })
      } else {
        console.log(e)
        this.setState({ error: "An error ocurred" })
      }
    }
  }

  addToExpression = (text, pos) => {
    this.setState(
      ({ expression }) => ({ expression: [expression.slice(0, pos), text, expression.slice(pos)].join('') }),
      () => setCaretPosition(this.expressionInput.current, pos + text.length, true)
    )
  }

  render() {
    const { className } = this.props
    const { error, expression, result } = this.state
    return (
      <div className={className}>
        { error && <span className="error">{ error }</span> }
        <Screen expression={expression} result={result} expressionRef={this.expressionInput} />
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
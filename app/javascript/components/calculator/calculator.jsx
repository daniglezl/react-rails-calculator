import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RecentList from '../recent_list/recent_list'
import { getEvalExpression } from '../../api'
import styled from 'styled-components'
import { colors } from '../../ui/variables'
import { Button, Screen } from '../../ui'
import { setCaretPosition } from '../../lib/util'

const buttons = [
  { text: "(", cols: 1 },
  { text: ")", cols: 1 },
  { text: "<", cols: 1 },
  { text: ">", cols: 1 },
  { text: "AC", cols: 1, input: "" },
  { text: "⌫", cols: 1, input: "" },
  { text: "√", cols: 1 },
  { text: "^", cols: 1 },
  { text: "7", cols: 1 },
  { text: "8", cols: 1 },
  { text: "9", cols: 1 },
  { text: "÷", cols: 1, input: "\/÷" },
  { text: "4", cols: 1 },
  { text: "5", cols: 1 },
  { text: "6", cols: 1 },
  { text: "×", cols: 1, input: "*×" },
  { text: "1", cols: 1 },
  { text: "2", cols: 1 },
  { text: "3", cols: 1 },
  { text: "-", cols: 1, input: "\\-" },
  { text: "0", cols: 1 },
  { text: "00", cols: 1, input: "" },
  { text: ".", cols: 1 },
  { text: "+", cols: 1 },
  { text: "=", cols: 4, className: "equals"}
]

const PERMITTED_KEYS_REGEX =
  new RegExp(`[^${buttons.map(b => b.input == null ? b.text : b.input).join('')}]`, 'g')

const SPECIAL_OPS = ["AC", "=", "⌫", "<", ">"]

class Calculator extends Component {
  state = {
    expression: "",
    result: 0,
    error: ""
  }

  static defaultProps = {
    saveCalc: () => {}
  }

  // ref to expression input to use when moving caret
  expressionInput = React.createRef()

  componentDidMount() {
    this.expressionInput.current.focus()
  }

  handleInputExpression = (text) => {
    const currentPos = this.expressionInput.current.selectionStart
    SPECIAL_OPS.indexOf(text) > -1 ?
      this.handleSpecialOp(text, currentPos) :
      this.addToExpression(text, currentPos)
  }

  // handle input of operators that don't write to screen
  handleSpecialOp = (text, pos) => {
    switch (text) {
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

  saveResult = () => {
    const { expression, result } = this.state
    this.props.saveCalc(expression, result)
  }

  evalExpression = (pos) => {
    // clean expression
    const cleanExpression = this.state.expression
      .replace(/√\(/g, "Math.sqrt(")
      .replace(/√([0-9]+)/g, "Math.sqrt($1)")
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/\^/g, "**")

    if (this.props.evalOnServer) {
      getEvalExpression(cleanExpression)
        .then(res => {
          this.setState({ result: res.data.result, error: "" })
          this.saveResult()
        })
        .catch(err => {
          this.setState({ error: err.response.data.error })
        })
        .finally(() => {
          setCaretPosition(this.expressionInput.current, pos, true)
        })
    } else {
      try {
        const result = eval(cleanExpression)
        this.setState(
          { result, error: "" },
          () => {
            setCaretPosition(this.expressionInput.current, pos, true)
            this.saveResult()
          }
        )
      } catch(e) {
        this.setState({ error: "Invalid expression" })
      }
    }
  }

  addToExpression = (text, pos) => {
    this.setState(
      ({ expression }) => ({ expression: [expression.slice(0, pos), text, expression.slice(pos)].join('') }),
      () => setCaretPosition(this.expressionInput.current, pos + text.length, true)
    )
  }

  onExpressionChange = (e) => {
    if (e.target.value.match(PERMITTED_KEYS_REGEX) == null)
      this.setState({ expression: e.target.value.replace(/\//g, "÷").replace(/\*/g, "×") })
  }

  onExpressionKeyPress = (e) => {
    if (e.key === "Enter") {
      const currentPos = e.target.selectionStart
      this.handleSpecialOp("=", currentPos)
    }
  }

  onRecentClick = (expression, result) => {
    this.setState(
      { expression, result },
      () => this.expressionInput.current.focus()
    )
  }

  render() {
    const { className, recent } = this.props
    const { error, expression, result } = this.state
    return (
      <div className={className}>
        <div className="recent-calc">
          <h2>Recent Calculations</h2>
          <RecentList
            recent={recent}
            handleClick={this.onRecentClick}
          />
        </div>
        <div className="calc-container">
          <h1 className="header">React/Rails Calculator</h1>
          <div className="calculator">
            { error && <span className="error">{ error }</span> }
            <Screen
              expression={expression}
              result={result}
              expressionRef={this.expressionInput}
              onExpressionChange={this.onExpressionChange}
              onExpressionKeyPress={this.onExpressionKeyPress}
            />
            { buttons.map(button => (
              <Button
                key={button.text}
                cols={button.cols}
                className={button.className}
                onClick={() => this.handleInputExpression(button.text)}
              >
                { button.text }
              </Button>
            )) }
          </div>
        </div>
      </div>
    )
  }
}

Calculator.propTypes = {
  evalOnServer: PropTypes.bool.isRequired,
  saveCalc: PropTypes.func.isRequired,
  recent: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default styled(Calculator)`
  display: flex;
  height: 100%;
  background-color: ${ colors.lightBg };
  > .recent-calc {
    flex: 1;
    min-width:0;
    height: 100%;
    background-color: ${ colors.secondary };
    text-align: center;
    > h2 { color: ${ colors.darkText }; }
  }
  > .calc-container {
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    > .header {
      color: ${ colors.darkText }
      position: absolute;
      top: 0;
    }
    > .calculator {
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
    }
  }
  @media (max-width: 980px) {
    > .recent-calc { display: none; }
  }
`
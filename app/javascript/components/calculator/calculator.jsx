import React, { Component } from 'react'
import styled from 'styled-components'
import { colors } from '../../ui/variables'
import { Button, Screen } from '../../ui'

const buttons = [
  { text: "(", cols: 1, action: () => {} },
  { text: ")", cols: 1, action: () => {} },
  { text: "<", cols: 1, action: () => {} },
  { text: ">", cols: 1, action: () => {} },
  { text: "AC", cols: 1, action: () => {} },
  { text: "sqrt", cols: 1, action: () => {} },
  { text: "^", cols: 1, action: () => {} },
  { text: "/", cols: 1, action: () => {} },
  { text: "7", cols: 1, action: () => {} },
  { text: "8", cols: 1, action: () => {} },
  { text: "9", cols: 1, action: () => {} },
  { text: "*", cols: 1, action: () => {} },
  { text: "4", cols: 1, action: () => {} },
  { text: "5", cols: 1, action: () => {} },
  { text: "6", cols: 1, action: () => {} },
  { text: "-", cols: 1, action: () => {} },
  { text: "1", cols: 1, action: () => {} },
  { text: "2", cols: 1, action: () => {} },
  { text: "3", cols: 1, action: () => {} },
  { text: "+", cols: 1, action: () => {} },
  { text: "0", cols: 1, action: () => {} },
  { text: ".", cols: 1, action: () => {} },
  { text: "=", cols: 2, action: () => {} }
]

class Calculator extends Component {
  state = {
    expression: "",
    result: 0
  }

  render() {
    const { className } = this.props
    return (
      <div className={className}>
        <Screen expression={this.state.expression} result={this.state.result} />
        { buttons.map(button => (
          <Button key={button.text} cols={button.cols} onClick={button.action}>
            { button.text }
          </Button>
        ))}
      </div>
    )
  }
}

export default styled(Calculator)`
  max-width: 200px;
  background: ${ colors.darkBg };
`
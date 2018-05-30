import React from "react"
import PropTypes from "prop-types"

class HelloWorld extends React.Component {
  static defaultProps = {
    greeting: "Daniel"
  }
  render () {
    return (
      <React.Fragment>
        Greeting: {this.props.greeting}
      </React.Fragment>
    );
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};

export default HelloWorld

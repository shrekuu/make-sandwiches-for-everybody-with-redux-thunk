import { connect } from 'react-redux'
import React, { Component } from 'react'
import { makeASandwichWithSecretSauce, makeSandwichesForEverybody } from './store/actions'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(
      // make only one sandwich for me
      // makeASandwichWithSecretSauce(this.props.forPerson)

      // make everybody a sandwich
      makeSandwichesForEverybody()
    )
  }

  render() {
    const sandwiches = this.props.sandwiches.sandwiches.map((v, k) =>
      <li key={k.toString()}>{v}</li>
    )
    return (
      <ol>{sandwiches}</ol>
    )
  }
}

export default connect(
  state => ({
    sandwiches: state.sandwiches,
    forPerson: 'me :D'
  })
)(App)

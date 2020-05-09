import './index.styl'
import React, { Component } from 'react'
// import { findDOMNode } from 'react-dom'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ColorPickerTrigger from 'components/color-picker/trigger'
import ColorPickerModal from 'components/color-picker/modal'

@connect((state) => {
  return { state }
})

class Leaves extends Component {
  static propTypes = {
    className: React.PropTypes.string,
    id: React.PropTypes.number,
    title: React.PropTypes.string,
    children: React.PropTypes.array
  }

  render() {
    return (
      <div className={this.props.className}>
        <h1>{this.props.title}</h1>
        {this.props.children}
      </div>
    )
  }
}

class Root extends Component {
  static propTypes = {
    leaves: React.PropTypes.array
  }

  constructor() {
    super()
    this.state = {
      leaves: [
        ['0', '1', '2', '3'],
        ['0', '1', '2', '3'],
        ['0', '1', '2', '3'],
        ['0', '1', '2', '3'],
      ]
    }
  }

  componentDidMount() {
    /*
    let h1 = findDOMNode(this).querySelectorAll('h1')

    function observer(elem) {
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

      let observer = new MutationObserver(function(mutations) {
        //console.log(mutations)
      });

      observer.observe(elem, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      });
    }

    h1.forEach(node => {
      observer(node)
    })
    */
  }

  handleTest() {
    let { leaves } = this.state
    leaves[0] = ['zero', '1', '2', 'three']

    this.setState(leaves)
  }

  render() {
    let leaves = []
    if (this.state.leaves) {
      leaves = this.state.leaves.map((leaves, index) => {
        return (<Leaves key={index} id={index} title={`${index}`} className="level-2">{
          leaves.map((l, i) => {
            return <Leaves key={i} id={i} title={l} className="level-3" />
          })
        }</Leaves>)
      })
    }

    return (
      <div className="clearfix">
        <h1>root</h1>
        { leaves }
        <button onClick={this.handleTest.bind(this)}>Test</button>
      </div>
    )
  }
}

class Demo extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func
  }

  constructor(props) {
    super(props)
  }

  handleGoToHome() {
    this.props.dispatch(push('/'))
  }

  showModal() {
    this.refs.modal.show()
  }

  handleColorChange() {

  }

  render() {
    return (
      <div>
        <Root />
        <h1>Demo</h1>
        <button onClick={this.handleGoToHome.bind(this)}>go to home</button>
        <Link to="/editor/7">7</Link>
        <div>
          <ColorPickerTrigger color="rgba(255, 0, 0, 0.5)" onChange={this.handleColorChange.bind(this)} />
        </div>
        <span style={{ display: 'inline-block', marginTop: 1111 }}>
          <ColorPickerTrigger color="#fcc" />
        </span>
        <ColorPickerModal />
      </div>
    )
  }
}

export default Demo

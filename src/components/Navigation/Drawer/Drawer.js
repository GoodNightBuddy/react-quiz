import React, {Component} from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink, useMatch } from 'react-router-dom'

const links = [
  {to: '/', label: 'List'},
  {to: '/auth', label: 'Authorithation'},
  {to: '/quiz-creator', label: 'Create test'},
]

const setClass = ({isActive}) => isActive ? classes.active : null

class Drawer extends Component {

  // clickHandler = () => {
  //   this.props.onClose()
  // }

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink to={link.to} className={setClass} onClick={this.props.onClose}>
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <>
      <nav className={cls.join(' ')}>
        <ul>
          { this.renderLinks() }
        </ul>
      </nav>
      {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
      </>
    )
  }
}

export default Drawer
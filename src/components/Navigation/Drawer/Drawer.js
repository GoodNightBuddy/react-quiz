import React, {Component} from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'


const setClass = ({isActive}) => isActive ? classes.active : null

class Drawer extends Component {

  // clickHandler = () => {
  //   this.props.onClose()
  // }

  renderLinks(links) {
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

    let links = [
      {to: '/', label: 'List'}
    ]

    if(this.props.isAuthenticated) {
      links.push({to: 'quiz-creator', label: 'Create test'})
      links.push({to: 'logout', label: 'Log out'})
    } else {
      links.push({to: 'auth', label: 'Authorithation'})
    }

    return (
      <>
      <nav className={cls.join(' ')}>
        <ul>
          { this.renderLinks(links) }
        </ul>
      </nav>
      {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
      </>
    )
  }
}

export default Drawer
import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import "./Header.css";

class Header extends Component {
  state = {hover: false}
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div className='header-loggedin'>
        <span className="header-username">
          <i className="fas fa-user-circle"/>
          {this.context.user.name}
        </span>
        <nav className="header-navigation">
          <Link className="logout-link"
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav className="header-navigation">
        <Link className="login-link" to='/login'>Login</Link>
        {' '}
        <Link className="register-link" to='/register'>Sign up</Link>
      </nav>
    )
  }

  // methods for on hover header title effect
  hoverOn = () => {
    this.setState({ hover: true });
  }
  hoverOff = () => { 
      this.setState({ hover: false });    
  }

  render() {
    return (
      <header role="banner" className="main-header">
        <div className="header-container" >
          <h1 className="header-title">
          <Link className="header-title-link" to='/' data-hover='Spaced Repetition' onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}><img className='header-icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/800px-Flag_of_Mexico.svg.png' alt='spain header icon'></img>
              {this.state.hover ? "Repetición Espaciada" : "Spaced Repetition"}
            </Link>
          </h1>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
          </div>
      </header>
    );
  }
}

export default Header

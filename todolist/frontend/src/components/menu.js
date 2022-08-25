import React from 'react';
import { Link, Router } from "react-router-dom";


class Menu extends React.Component {
    constructor(props) {
      super(props)
    }
// const Menu = () => {

  render() {
      // (() => this.props.is_authenticated) ? console.log('login success!') : console.log(this)
      // console.log(this.props.is_authenticated)
    return (

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">To Do LLC</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <nav>
              <ul class="navbar-nav">
                <li class="nav-item active">
                  <Link to="/" class="nav-link">Users<span class="sr-only"></span></Link>
                </li>
                <li class="nav-item">
                  <Link to="todo" class="nav-link">To do</Link>
                </li>
                <li class="nav-item">
                  <Link to="projects" class="nav-link">Projects</Link>
                </li>
                <li class="nav-item">
                  <Link to="authors" class="nav-link">About Us</Link>
                </li>
                <li class="nav-item">
                   <Link to="login" class="nav-link">Login</Link>
                </li>
                  <li class="nav-item">
                 <button  type="button" class="btn btn-primary btn-block mb-4" onClick={()=>this.props.logout}>Logoff</button>
                </li>
              </ul>
            </nav>

          </div>
        </nav>
    )
  }
}

export default Menu;
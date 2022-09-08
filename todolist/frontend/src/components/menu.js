import React from 'react';
import { Link, } from "react-router-dom";

const Menu = (auth, logout) => {
    let login_button = ''


    if (auth.auth.isLogin) {
    login_button = <button className="btn btn-outline-success my-2 my-sm-0" onClick={()=>auth.logout()}>Hello, {auth.auth.username} Logout</button>
    }
    else {
      login_button = <Link to='/login' className="btn btn-outline-success my-2 my-sm-0">Login</Link>
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">To Do LLC</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <nav>
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to="/" className="nav-link">Users<span className="sr-only"></span></Link>
                </li>
                <li className="nav-item">
                  <Link to="todo" className="nav-link">To do</Link>
                </li>
                <li className="nav-item">
                  <Link to="projects" className="nav-link">Projects</Link>
                </li>
                <li className="nav-item">
                  <Link to="authors" className="nav-link">About Us</Link>
                </li>
                <li className="nav-item">
                      {login_button}
                </li>
              </ul>
            </nav>

          </div>
        </nav>
    )

}

export default Menu;
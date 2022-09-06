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
                      {login_button}
                </li>
              </ul>
            </nav>

          </div>
        </nav>
    )

}

export default Menu;
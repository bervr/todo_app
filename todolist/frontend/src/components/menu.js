import React from 'react';
import { Link, Router } from "react-router-dom";


const Menu = () => {
    return(
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">ToDo LLC</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
            <Link to="projects" class="nav-link" >Projects</Link>
          </li>
        </ul>
          </nav>

      </div>
    </nav>
    )

}

export default Menu;
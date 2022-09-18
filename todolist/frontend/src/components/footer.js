import React from 'react';


const Footer = () => {
    return(
    <footer className="py-3 my-4">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li> <i className="bi bi-alarm-fill"></i></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Users</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Features</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Pricing</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">FAQs</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About</a></li>
    </ul>
    <p className="text-center text-muted">© {new Date().getFullYear()} To_Do LLC, Inc</p>
  </footer>


    )
  }
export default Footer;
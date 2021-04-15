import React from 'react'
// import { useAuth } from '../auth/useAuth'
import { Navbar, Row, Col, Button, Nav } from 'react-bootstrap'

const NavBar = ({scrollTop}) => {
  
  scrollTop = scrollTop ? scrollTop : false

  return (
    <Navbar id="nav"
      bg={`${scrollTop ? "trans" : "jet"}`}
      variant={`${scrollTop ? "light" : "dark"}`}
      expand="md"
      fixed="top"
      className={`${scrollTop ? "test" : "blur"} px-lg-5`}>
      <Navbar.Brand href="/" id="brand" className="mr-0 mr-md-4 mr-lg-5">
        PharmaApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="">
        <Nav className="mr-0 mr-md-auto">
          <Nav.Link href="/search">Search</Nav.Link>
          <Nav.Link href="/about">About Us</Nav.Link>
        </Nav>
        <hr className="my-2 d-md-none" />
        <Nav className="fw-200">
          <Nav.Link href="/pharmacist">
            <Button variant="jet" size="sm">Pharmacists</Button>
          </Nav.Link>
          <Nav.Link href="/login">
            <Button variant="green" size="sm">Log in</Button>
          </Nav.Link>
          <Nav.Link href="/login">
            <Button variant="sky-blue" size="sm">Sign up</Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      
      

      
    </Navbar>
  )
}

export default NavBar

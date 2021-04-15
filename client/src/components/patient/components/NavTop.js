import React from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { Navbar, Row, Col, Button, Nav } from 'react-bootstrap'

const NavBar = ({scrollTop}) => {
  scrollTop = scrollTop ? scrollTop : false

  return (
    <Navbar id="nav"
      bg={`${scrollTop ? "trans" : "deep-blue"}`}
      variant={`${scrollTop ? "light" : "dark"}`}
      expand="md"
      fixed="top"
      className={`${scrollTop ? "test" : "blur"} px-lg-4 px-xl-5`}>
      <Navbar.Brand href="/" id="brand" className="align-self-baseline fw-200 mr-0 mr-md-3 mr-lg-4 mr-xl-5">
        PharmaApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="">
        <Nav className="mr-auto">
          <Nav.Link href="/search" className="pr-4">Search</Nav.Link>
          <Nav.Link href="/about">About Us</Nav.Link>
        </Nav>
        <hr className="my-2 d-md-none" />
        <NavProfile />
      </Navbar.Collapse>
    </Navbar>
  )
}

const NavProfile = () => {
  let auth = useAuth()

  // console.log(auth.user.name)
  return auth.user ? (
    <Nav className="fw-200">
      
      <Nav.Link href="/login" className="px-0">
        <Button variant="deep-blue" size="sm" disabled>{auth.user.name}</Button>
      </Nav.Link>
      <Nav.Link className="pl-0 pr-2">
        <Button variant="deep-blue" size="sm" onClick={e => {
          e.preventDefault()
          auth.signOut()
        }}>Sign Out</Button>
      </Nav.Link>
      <Nav.Link href="/pharmacist" className="px-0">
        <Button variant="sky-blue" size="sm" >Go to Dashboard</Button>
      </Nav.Link>
    </Nav>
  ) : (
    <Row className="fw-200 justify-content-end mx-0">
      <Nav.Link href="/pharmacist" className="pl-0 pr-3">
        <Button variant="deep-blue" size="sm">Pharmacists</Button>
      </Nav.Link>
      <Nav.Link href="/login" className="px-2">
        <Button variant="green" size="sm">Log in</Button>
      </Nav.Link>
      <Nav.Link href="/login" className="px-0">
        <Button variant="sky-blue" size="sm">Sign up</Button>
      </Nav.Link>
    </Row>
  )

}

export default NavBar

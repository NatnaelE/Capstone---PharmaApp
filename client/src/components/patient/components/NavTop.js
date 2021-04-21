import React from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { Navbar, Row, Button, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { routes } from '../../../constants/routes'

const NavBar = ({scrollTop}) => {
  scrollTop = scrollTop ? scrollTop : false

  return (
    <Navbar id="client-navbar"
      bg={`${scrollTop ? "trans" : "deep-blue"}`}
      variant={`${scrollTop ? "light" : "dark"}`}
      expand="md"
      fixed="top"
      className={`${scrollTop ? "test" : "blur"} px-lg-4 px-xl-5`}>
      <Navbar.Brand as={Link} to={routes.landing}
        className="align-self-baseline fw-200 mr-0 mr-md-3 mr-lg-4 mr-xl-5">
        PharmaApp
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={routes.search} className="pr-4">Search</Nav.Link>
          <Nav.Link as={Link} to={'/about'}>About Us</Nav.Link>
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
  return auth.loading ? '' : auth.user ? (
    <Nav className="fw-200">
      
      <Nav.Link href="/login" className="px-0">
        <Button variant="deep-blue" size="sm" disabled>{auth.user.displayName}</Button>
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
      <Nav.Link as={Link} to={routes.pharmacistLanding} className="pl-0 pr-3">
        <Button variant="deep-blue" size="sm">Host Your Pharmacy</Button>
      </Nav.Link>
      <Nav.Link as={Link} to={routes.auth.signin} className="px-2">
        <Button variant="green" size="sm">Log in</Button>
      </Nav.Link>
      <Nav.Link as={Link} to={routes.auth.signup + '?view=pharmacist'} className="px-0">
        <Button variant="sky-blue" size="sm">Sign up</Button>
      </Nav.Link>
    </Row>
  )

}

export default NavBar

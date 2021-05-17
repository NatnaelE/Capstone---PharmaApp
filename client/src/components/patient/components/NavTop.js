import React, { useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useScroll } from '../../../hooks/useScroll'
import { Navbar, Row, Button, Nav, Dropdown, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { routes } from '../../../constants/routes'

import logo from '../../../assets/logo-cropped.png'

const NavBar = () => {
  let { scrollTop } = useScroll(20);

  useEffect(() => {
   if (scrollTop > 20) {
     console.log(window.scrollY)
   } else {
     console.log('top')
   }
  }, [scrollTop])

  return (
    <Navbar id="client-navbar"
      bg={`${scrollTop ? "trans" : "ultra-blue"}`}
      variant={`${scrollTop ? "light" : "dark"}`}
      expand="md"
      fixed="top"
      className={`${scrollTop ? "bg-blurX" : ""} px-lg-4 px-xl-5`}>
      <Navbar.Brand as={Link} to={routes.landing}
        className="align-self-baseline fw-200 mr-0 mr-md-3 mr-lg-4 mr-xl-5">
        <img alt="logo" src={logo} width="30" height="30" className="d-inline-block align-top mr-3" />
        World's Pharmacy
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={routes.search} className="pr-lg-4">Search Now</Nav.Link>
          <Nav.Link as={Link} to={'/about'} className="pr-lg-4">About Us</Nav.Link>
        </Nav>
        <hr className="my-2 d-md-none" />
        <NavProfile scrollTop={scrollTop} />
      </Navbar.Collapse>
    </Navbar>
  )
}

const NavProfile = ({ scrollTop }) => {
  let auth = useAuth()

  return auth.loading ? '' : auth.user ? (
    <Nav className="fw-200">
      
      <Nav.Item className="pl-0 pr-2">
        <Dropdown as={ButtonGroup} size="sm">
          <Button disabled variant={`${scrollTop ? "transparent" : "deep-blue"}`}>{auth.user.displayName}</Button>
          <Dropdown.Toggle split variant={`${scrollTop ? "transparent" : "green"}`} />
          <Dropdown.Menu align="right">
            <Dropdown.Header className="text-center text-darker">
              {/* <span className="fw-300">Signed in as</span> */}
              <h1 className="fs-1 fw-500 ff-montserrat">{auth.user.email}</h1>
              <h2 className="fs-09 fw-300 ff-montserrat">Pharmacist</h2>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item href={routes.pharmacist.dashboard} className="text-rightX fs-085">
              Dashboard
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.ItemText  className="text-rightX fs-085">
              Profile
            </Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.ItemText className="text-rightX fs-085">
              Settings
            </Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item className="text-center fs-085 fw-600" onClick={e => {
              e.preventDefault()
              auth.signOut()
            }}>Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>

      <Nav.Link href="/pharmacist" className="px-0">
        <Button variant="sky-blue" size="sm" >Go to Dashboard</Button>
      </Nav.Link>

    </Nav>
  ) : (
    <Nav as={Row} className="fw-200 justify-content-end mx-0">
      <Nav.Link as={Link} to={routes.pharmacistLanding} className="pl-0 pr-3 align-self-center">
        <span className={`fw-500 ${scrollTop ? "text-golden" : "text-alabaster"}`}>Host Your Pharmacy</span>
      </Nav.Link>
      <Nav.Link as={Link} to={routes.auth.signin} className="px-2">
        <Button variant="green" size="sm">Log in</Button>
      </Nav.Link>
      <Nav.Link as={Link} to={routes.auth.signup + '?view=pharmacist'} className="px-0">
        <Button variant={`${scrollTop ? "sky-blue" : "golden"}`} size="sm">Sign up</Button>
      </Nav.Link>
    </Nav>
  )
}

export default NavBar

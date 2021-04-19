import React, { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { Container, Jumbotron, Row, Col, Button } from 'react-bootstrap'

const SideBar = () => {
  let auth = useAuth()
  // const [expand, setExpand] = useState(false)
  return <Jumbotron id="sideBar"
            className="bg-sky-blue text-light h-100 my-3 p-4" >
        <Row className="h-100 flex-column">
          <Col xs={"auto"} className="flex-grow-0">
            <h1 className="fw-200">PharmaApp</h1>
          </Col>
          <Col xs={5} className="my-3 d-flex flex-column justify-content-around">
            <a href="/pharmacist/dashboard"><h2>Dashboard</h2></a>
            <a href="/pharmacist/inventory"><h2>Inventory</h2></a>
            <a href="/pharmacist/orders"><h2>Orders</h2></a>
            <a href="/pharmacist/pharmacy"><h2>My Pharmacy</h2></a>
          </Col>
          <Col xs={"auto"} className="mt-auto d-flex flex-column">
            <a href="/" className=""><h3>Back to Home</h3></a>
            <hr />
            <Button variant="dark-red" className="mt-2" onClick={e => {
                e.preventDefault()
                auth.signOut()
              }}>Sign Out</Button>
          </Col>
        </Row>
    
    
  </Jumbotron>
}

export default SideBar
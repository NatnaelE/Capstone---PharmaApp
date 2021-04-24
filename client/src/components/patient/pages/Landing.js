import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { routes } from '../../../constants/routes'

const LandingPage = () => {
  let history = useHistory()
  
  return <>
    <Container fluid className="vh-100 pt-5 px-3 bg-beige bg-img-cover d-flex flex-column" style={{}}>
      <Row className="my-5 justify-content-center">
        <Col xs="auto">
          <Button variant="green" size="lg">Search Now</Button>
        </Col>
        
      </Row>
      <Row className="my-5 ml-md-3 ml-lg-4 ml-xl-5 flex-grow-1">
        <Col md={8} className="d-flex flex-column justify-content-around pr-5">
          <div>
          <h1 className="mb-0">Medication you need,</h1>
          <h1 className="text-nowrap">from pharmacies near you</h1>
          <p>Connecting you quickly to the medications you need. Find prescriptions and medication from nearby pharmacies.</p>
          </div>
          <div className="d-flex">
          <Button variant="ultra-blue" size="lg"
            className="mr-3 px-5" onClick={() => history.push(routes.search)}>Get Started</Button>
          <Button variant="golden" size="lg"
            className="px-5"><a href="/#learn-more"></a>Learn More</Button>

          </div>
          
        </Col>
        <Col className="pr-0">
          <div className="h-100 w-100 bg-img-cover pharmacy-bg"></div>
          {/* <img src={bgImg} /> */}
        </Col>
      </Row>
      <Row>
        {/* More content */}
      </Row>
      <Row className="my-5 justify-content-center">
        <h5 className="fw-500">Pharmacy or Pharmacist? {' '}<a href={routes.pharmacistLanding}>Join our platform today</a></h5>
      </Row>
    </Container>
    <Container fluid className="vh-100 pt-5 px-3 bg-sky-blue">

    </Container>
    <Container fluid className="vh-100 pt-5 px-3 bg-jet">

    </Container>
  </>
}

export default LandingPage
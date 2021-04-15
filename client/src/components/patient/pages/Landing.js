import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const LandingPage = () => {
  return <Container fluid className="vh-100 pt-5 px-3">
    <h5 className="mt-3">LANDING PAGE</h5>

    <Row className="my-5 mx-md-3 mx-lg-4 mx-xl-5">
      <Col md={7}>
        <h1 className="mb-0">Medication you need,</h1>
        <h1 className="text-nowrap">from pharmacies near you</h1>
        <p>Connecting you quickly to the medications you need. Find prescriptions and medication from nearby pharmacies.</p>
      </Col>
      <Col md={5}>
        {/* Insert img here */}
      </Col>
    </Row>
    <Row>
      {/* More content */}
    </Row>
    <Row>
      {/* More content */}
    </Row>
  </Container>
}

export default LandingPage
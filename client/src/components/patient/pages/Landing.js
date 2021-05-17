import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSearch } from '../../../hooks/useSearch'
import { Container, Row, Col, Button, Alert } from 'react-bootstrap'
import { routes } from '../../../constants/routes'

import { SearchController } from '../components/SearchInput'

import pillImg from '../../../assets/pill_cropped.png';
import computerImg from '../../../assets/computer_cropped.png';

const Landing = () => {
  return <Container fluid className="px-0" id="landing">
    <LandingScreen />
    <ValueScreen 
      imgClass={patientValues.imgClass}
      header={patientValues.header}
      subtitle={patientValues.subtitle}
      text1={patientValues.text1}
      text2={patientValues.text2}
      href={routes.search} 
      css={"bg-alabaster text-dark"}
      id={"learn-more"}
      />
    
    <ValueScreen 
      imgClass={pharmacistValues.imgClass}
      header={pharmacistValues.header}
      subtitle={pharmacistValues.subtitle}
      text1={pharmacistValues.text1}
      text2={pharmacistValues.text2}
      href={routes.pharmacistLanding}
      css={"bg-light"} />
    <MissionScreen css="bg-alabaster" />
    <LandingContainer css="bg-jet"></LandingContainer>
  </Container>
}


// USE: <LandingScrollContainer id="landing"> ... </>
// CSS styles in: partials/_landing.scss
// const LandingScrollContainer = ({  children, css, ...rest }) => {
//   return (
//     <div className="scroll-wrapper" {...rest}>
//       <div className="scroll-container" style={{marginTop: '5vh', height: '95vh'}}>
//         {children}
//       </div>
//     </div>
//   )
// }

const LandingContainer = ({ children, css, height, ...rest }) => {
  const style = { height: height ? height + 'vh' : '100vh'}
  return (
    <Container fluid className={"p-3 " + css} style={style} {...rest}>
      {children}
    </Container>
  )
}

const LandingScreen = () => {
  let history = useHistory()
  let { search } = useSearch()
  
  return (
    <LandingContainer css="bg-holistic bg-gradient-light bg-img-cover pt-5r pb-0 d-flex flex-column">
      <Row className="mt-3 mb-5 justify-content-center">
        <Col xs="auto" lg={12} xl={10}>
          <h5 className="text-center mb-3 fw-300">Search Nearby Pharmacies</h5>
          <SearchController
            id={"patient"}
            labelKey={"BrandName"}
            useLocation
            cloudFunction={search} />
        </Col>
      </Row>

      <Row className="mt-3 mb-3 justify-content-around flex-grow-1">
        <Col md={9}
          className="d-flex flex-column justify-content-around pr-10r text-darkest-brown">
          <div>
          <h1 className="mb-0 fw-800 display-4 text-nowrap">Medication you need,</h1>
          <h1 className="text-nowrap fw-800 display-4">from pharmacies near you</h1>
          <p className="fw-200" style={{fontSize:'1.75rem'}}>Connecting you quickly to essential medications. Find prescriptions and medication from nearby pharmacies.</p>
          </div>
          <div className="d-flex">
          <Button variant="green" size="lg"
            className="mr-3 px-5" onClick={() => history.push(routes.search)}>Get Started</Button>
          <Button variant="sky-blue" size="lg"
            className="px-5" onClick={() => history.push("#learn-more")}>Learn More</Button>
          </div>
        </Col>
      </Row>

      <Row className="my-5 justify-content-center">
        <Alert variant="trans" className="mb-0 text-dark">
        <span className="fw-600">Pharmacy or Pharmacist?{' '}</span>
          <Alert.Link href={routes.pharmacistLanding}>
            Join our platform today
          </Alert.Link>
        </Alert>
      </Row>
    </LandingContainer>
  )
}

const MissionScreen = ({ css }) => {
  return (
    <LandingContainer css={"d-flex flex-column pt-5 " + css}>
      <Row className="justify-content-center flex-grow-1 pt-5">
        <Col lg={14}>
          <h1>Our Mission</h1>
          <p>Millions of people die every year from preventable diseases due to lack of access to basic medication.
            We aim to bridge the gap between patient and pharmacy by making medication accessible, equitable and transparent.</p>
          {/* <hr className="my-5" /> */}
          <Row className="mt-4r justify-content-between flex-grow-1">
            <Col lg={4} className="d-flex flex-column align-items-center">
              <img className="mission-img mb-4" src={pillImg} alt="pill clip art" />
              <hr className="w-75" />
              <p className="p-2 text-center">Connect people with essential medications by making it easy to
                <span className="fw-600"> search and find</span> medications locally</p> 
            </Col>
            <Col lg={4} className="d-flex flex-column align-items-center">
              <img className="mission-img mb-4" src={computerImg} alt="pill clip art" />
              <hr className="w-75" />
              <p className="p-2 text-center">Provide an <span className="fw-600">accessible platform </span>
                for locally owned pharmacies to better serve their communities</p>
            </Col>
            <Col lg={4} className="d-flex flex-column align-items-center">
              <div className="mission-img bg-img-cover boxes-clipart-bg mb-4" />
              <hr className="w-75" />
              <p className="p-2 text-center">Increase transparency in medications by allowing
                customers to <span className="fw-600">see inventory in real-time</span></p>
            </Col>
          </Row>
        </Col>
      </Row>
      
      <Row>

      </Row>
    </LandingContainer>
  )
}

const ValueScreen = ({  imgClass, header, subtitle, text1, text2, href, css, id }) => {
  return (
    <LandingContainer height={90} css={"d-flex flex-column " + css} id={id}>
      <Row className="flex-grow-1">
        <Col lg={9} className="pr-3 p-6r pr-lg-5">
          <div className="img-container">
            <div className={"img-wrapper bg-img-cover " + imgClass} />
            <div className="img-bg-rect" />
          </div>
        </Col>
        <Col className="pr-lg-8r">
          <Row className="h-100 flex-column justify-content-center">
            <Col xs={"auto"} className="mb-4r">
              <h2>{header}</h2>
              <h3>{subtitle}</h3>
            </Col>
            <Col xs={"auto"}>
              <p className="fs-1-25 mb-2r">
                {text1}
              </p>
              <p className="fs-1-25 mb-5">
                {text2}
              </p>
              <h6><a href={href}>Get Started</a></h6>
            </Col>
          </Row>
        </Col>
      </Row>

    </LandingContainer>
  )
}

const patientValues = {
  imgClass: "pharmacy-bg",
  header: "Picking up a prescription?",
  subtitle: "We make medication easy",
  text1: `Our mission is to make finding medication as easy and transparent as possible.
          We connect you to local pharmacies to help you find the medication you need!`,
  text2: `Search and find medications from pharmacies near you.
          Compare pricing, save orders, reserve medication and more.`
}

const pharmacistValues = {
  imgClass: "pharmacy-bg",
  header: "Local Pharmacist?",
  subtitle: "Here's what we can do for you",
  text1: `Realtime inventory tracking on our online database. Quickly store and see inventory levels of your medication, all on our website!`,
  text2: `Update and view medication inventory. Get alerts on low inventory.
  Share medication levels with customers`,
}

export default Landing
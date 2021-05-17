import React from 'react'
// eslint-disable-next-line
import { Container, Row, Col } from 'react-bootstrap'

// Create a simple, single website that provides:
// - overview of your project
// - your target stakeholders and users
// - a summary of what you did (your actions) and what benefit your project or solution provides

const AboutPage = () => {
  return (
    <Container fluid className="px-0">
      <LandingContainer height={"auto"} css="pt-5r pb-5r d-flex flex-column">
        <Row className="mx-0 mt-8r mb-5"><Col className="px-5 px-md-5r px-lg-8r px-xl-10r">
        <h1 class="display-3 fw-800 mb-5">About Us</h1>
        <h1 className="fw-200 display-4 mb-3">What we do</h1>
        <p className="mb-6r fw-200 ff-manrope">
          World’s Pharmacy is a platform that works by connecting pharmacists with patients in rural or disenfranchised areas. People are not getting reliable information on the price and availability on certain medications. On the other hand, these pharmacists do not have an accurate way of relaying this information. This platform aims to solve all of these issues by connecting these two groups of people.
        </p>

        <h2 className="fw-300 ">Our Users</h2>
        <p className="mb-5r fw-200 ff-manrope">Pharmacists and Patients</p>

        <h1 className="fw-200 display-4 mb-3">How we did it</h1>
        <p className="mb-6r fw-200 ff-manrope">
        Our team did weeks of market and user research in order to fully understand the problem at hand. By speaking to people who have not only worked in the healthcare field, but also worked in the described disenfranchised area, gave us valuable insight in some of the problems that they have seen first hand. By finding potential solutions to these problems, we came up with the idea of the platform. After more iterations and further user testing, we finalized the idea for the platform.
        </p>

        
        <h2 className="fw-300">Key Stakeholders</h2>
        <p className="mb-5r fw-200 ff-manrope">Pharmacists, Patients, Big Pharma, Supply Chain employees</p>
        
        <h1 className="fw-200 display-4 mb-3">What issues are we solving?</h1>
        <p className="mb-6r fw-200 ff-manrope">
This platform solves these in various ways, the first being able to provide each pharmacy with a platform tailored to their store. This will also increase transparency by allowing these patients to see exactly what is and is not available at a specific pharmacy. The information disconnect will be solved, and with the new method of organization, supply will be higher and as a result demand and prices will be lower.
        </p>
        </Col></Row>
      </LandingContainer>
      {/* <LandingContainer height={100}  >
        
      </LandingContainer> */}
    </Container>
  )
  //   <h5 className="mt-3">About Us</h5>
  // </div>
}

const LandingContainer = ({ children, css, height, ...rest }) => {
  const style = { height: height ? height === "auto" ? height : height + 'vh' : '100vh'}
  return (
    <Container fluid className={"p-3 " + css} style={style} {...rest}>
      {children}
    </Container>
  )
}

export default AboutPage
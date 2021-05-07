import React from 'react'
// eslint-disable-next-line
import { Container, Row, Col } from 'react-bootstrap'

// Create a simple, single website that provides:
// - overview of your project
// - your target stakeholders and users
// - a summary of what you did (your actions) and what benefit your project or solution provides

const AboutPage = () => {
  return (
    <Container fluid className="px-0" id="landing">
      <LandingContainer height={100} className="pt-5r pb-0 d-flex flex-column">
        <h1>About Us</h1>
      </LandingContainer>

      <LandingContainer height={100}  >
        
      </LandingContainer>
    </Container>
  )
  //   <h5 className="mt-3">About Us</h5>
  // </div>
}

const LandingContainer = ({ children, css, height, ...rest }) => {
  const style = { height: height ? height + 'vh' : '100vh'}
  return (
    <Container fluid className={"p-3 " + css} style={style} {...rest}>
      {children}
    </Container>
  )
}

export default AboutPage
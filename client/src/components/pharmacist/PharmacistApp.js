import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Container, Jumbotron, Row, Col, Button } from 'react-bootstrap'

const PharmacistApp = () => {
  

  return (
   <Dashboard /> 
  )
}

const Dashboard = () => {
  return <Container fluid className="bg-light vh-100">
    <Row className="h-100">
      <Col xs={2} md={1} lg={4} xl={3} className="d-flex flex-column">
        <SideBar />
      </Col>
      <Col>
        <DashboardContent />
      </Col>
    </Row>
  </Container>
}

const SideBar = () => {
  return <Jumbotron className="h-100 my-3 p-4" id="sideBar">
    <h1 className="fw-200">PharmaApp</h1>
  </Jumbotron>
}

const DashboardContent = () => {
  return <Container fluid className="h-100 d-flex flex-column px-0">
    <DashboardHeader />

    <DashboardRow>
      <WidgetCol hasNeighbor>
        <DashboardRow>
          <WidgetCol>
            <WidgetContainer />
          </WidgetCol>
        </DashboardRow>
        <DashboardRow>
          <WidgetCol>
            <WidgetContainer />
          </WidgetCol>
        </DashboardRow>
      </WidgetCol>
      <WidgetCol xs={4} md={5} lg={6}>
        <WidgetContainer />
      </WidgetCol>
    </DashboardRow>

    <DashboardRow>
      <WidgetCol hasNeighbor>
        <WidgetContainer />
      </WidgetCol>
      <WidgetCol>
        <WidgetContainer />
      </WidgetCol>
    </DashboardRow>
  </Container>
}

const DashboardHeader = () => {
  let auth = useAuth()

  return <>
    <Row className="my-2 justify-content-between align-items-center">
      <Col xs={"auto"}><a href="/">{'<'} Back to Home</a></Col>
      <Col xs={"auto"}><Button onClick={e => {
          e.preventDefault()
          auth.signOut()
        }}>Sign Out</Button>
      </Col>
    </Row>
    <Row>
      <Col>
        <h1 className="fw-800">Dashboard</h1>
      </Col>
    </Row>
  </>
}

const DashboardRow = ({children, css, ...rest}) => {
  return <Row {...rest}
    className={"flex-grow-1 " + (css ? css : '')}>{children}</Row>
}

const WidgetCol = ({children, css, hasNeighbor, ...rest}) => {
  const style =
    // {} 
    { paddingRight: hasNeighbor ? '0' : '15px' }
  return <Col {...rest} style={style}
    className={"d-flex flex-column " + (css ? css : '')}>{children}</Col>
}

const WidgetContainer = ({children, css, ...rest}) => {
  const style = { marginBottom: '15px' }
  // const style = {}
  return <Jumbotron {...rest} style={style}
    className={"h-100 p-3 " + (css ? css : '')}>{children}</Jumbotron>
}

export default PharmacistApp
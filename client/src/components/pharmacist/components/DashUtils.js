import React from 'react'
// import { useAuth } from '../../hooks/useAuth'
import { Jumbotron, Row, Col } from 'react-bootstrap'

const DashboardHeader = ({ title, subtitle }) => {
  // let auth = useAuth()
  return <>
    <Row className="align-items-baseline mt-3">
      <Col xs={12} xl={"auto"}>
        <h1 className="fw-800 mb-1 mb-xl-2">{title ? title : 'Provide title'}</h1>
      </Col>
      <Col xs={12} xl={"auto"}>
        <h2 className="fw-200">{subtitle ? subtitle : 'Provide subtitle'}</h2>
      </Col>
    </Row>
  </>
}

const DashboardRow = ({children, css, ...rest}) => {
  return <Row {...rest}
    className={"flex-grow-1 " + (css ? css : '')}>{children}</Row>
}

const DashboardCol = ({children, css, hasNeighbor, ...rest}) => {
  const style =
    { paddingRight: hasNeighbor ? '0' : '15px' }
  return <Col {...rest} style={style}
    className={"d-flex flex-column " + (css ? css : '')}>{children}</Col>
}

const WidgetContainer = ({children, css, widget, ...rest}) => {
  const style = { marginBottom: '15px' }
  widget = widget ? widget : <TestWidget title="Widget Title" />
  return <Jumbotron {...rest} style={style}
    className={"h-100 p-3 " + (css ? css : '')}>{widget}</Jumbotron>
}

const TestWidget = ({ title }) => {
  return <Row className="h-100">
    <Col><h3>{title}</h3></Col>
  </Row>
}

export { DashboardHeader, DashboardRow, DashboardCol, WidgetContainer, TestWidget }
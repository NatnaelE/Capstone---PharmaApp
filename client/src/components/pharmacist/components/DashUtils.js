import React from 'react'
// import { useAuth } from '../../hooks/useAuth'
import { Jumbotron, Row, Col, Button } from 'react-bootstrap'
import { Menu, AccountCircle } from '@material-ui/icons'
import DefaultWidget from '../widgets/DefaultWidget'

const DashboardHeader = ({ title, subtitle, openSidebar }) => {
  // let auth = useAuth()
  return <>
    <Row className="align-items-baseline mt-3">
      <Col xs={16} xl={"auto"}>
        <h1 className="fw-800 mb-1 mb-xl-2">{title ? title : 'Provide title'}</h1>
      </Col>
      <Col xs={16} xl={"auto"} className="pl-xl-1">
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
  const style = {}
  // const classNames = "d-flex flex-column" + 
  return <Col {...rest} style={style}
    className={"d-flex flex-column " + (hasNeighbor ? 'has-neighbor ' : '') + (css ? css : '')}>{children}</Col>
}

const WidgetContainer = ({children, css, widget, title, ...rest}) => {
  const style = { marginBottom: '15px' }
  widget = widget ? widget : <DefaultWidget title={title} />
  return (
    <Jumbotron {...rest} style={style}
      className={"h-100 p-3 d-flex flex-column " + (css ? css : '')}>
        {widget}
    </Jumbotron>
  )
}

const MobileSidebarBtn = ({ openSidebar }) => {
  return (
    <Button variant="trans" className="d-md-none"
      onClick={e => openSidebar(e)}><Menu style={{ color: '#00a9d3' }}/></Button>
  )
}

const ProfilePicture = ({ src, width, height, border }) => {
  const style = {
    width: width ? width : '35px',
    height: width ? width : '35px',
    borderRadius: '50%',
    boxShadow: border ? '0 0 20px 5px gray' : '',
    backgroundImage: `url(${src})`
  }

  return src ? (
    <div style={style} className="bg-img-cover" alt="profile" />
  ) : <AccountCircle style={style}/>
}

export {
  DashboardHeader,
  MobileSidebarBtn,
  DashboardRow,
  DashboardCol,
  WidgetContainer,
  ProfilePicture
}
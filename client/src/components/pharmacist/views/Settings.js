import React, { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { Container, Row, Col, Button } from 'react-bootstrap'
import {
  DashboardHeader,
  DashboardRow as DashRow,
  DashboardCol as DashCol,
  WidgetContainer,
  ProfilePicture
} from '../components/DashUtils'

const Settings = () => {
  return <Container fluid className="h-100 d-flex flex-column px-0">
    
    <DashRow css="justify-content-center">
      <DashCol lg={14}>
        <DashboardHeader title="Settings"
          subtitle="Edit your profile, preferences and link pharmacies" />
        <DashRow css="mt-lg-3 mb-lg-5">
          <DashCol xs={16} lg={6} hasNeighbor css="flex-shrink-1">
            <WidgetContainer widget={<ProfileContent />} title="Profile" css="h-auto" />
          </DashCol>
          <DashCol lg={10}>
            <WidgetContainer widget={<SettingsContent />} title="Preferences" />
            <WidgetContainer widget={<PharmacyContent />} title="Linked Pharmacies" />
          </DashCol>
      </DashRow>
      </DashCol>
    </DashRow>
    
    {/* <DashRow>
      
    </DashRow> */}
    
    
  </Container>
}

const ProfileContent = () => {
  let auth = useAuth()
  const [state, setState] = useState(auth.userData ?
    {
      name: auth.userData.name,
      email: auth.userData.email,
      profileImg: auth.userData.profile_img
    } : null)
  
  console.log(state)
  return <Row className="flex-lg-grow-1 flex-lg-column justify-content-between">
    <Col xs={7} sm={5} lg={"auto"} className="mt-3 px-lg-5">
      
      <ProfilePicture src={state ? state.profileImg : null} width="100%" border />
     
      
    </Col>
    <Col className="d-flex flex-column justify-content-between">
      <div className="mt-lg-5">
        <h4>{state ? state.name : ''}</h4>
        <p>{state ? state.email : ''}</p>
      </div>
      <Button className="w-100" variant="jet" onClick={e => {
        e.preventDefault()
        auth.updateProfile({
          name: "Jimmy Heaters",
          img: "https://images-na.ssl-images-amazon.com/images/I/61ZQxQke2rL._SL1203_.jpg"
        })
      }}>Edit Profile</Button>
    </Col>
  </Row>
}

const PharmacyContent = () => {
  return <Row>
    
  </Row>
}

const SettingsContent = () => {
  return <Row>
    <Col>
      <p>Start Sidebar Minimized</p>
      <p>Start Sidebar Minimized</p>
      <p>Start Sidebar Minimized</p>
      <p>Start Sidebar Minimized</p>
      {/* <p>Start Sidebar Minimized</p> */}
    </Col>
  </Row>
}

export default Settings
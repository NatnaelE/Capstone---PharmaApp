import React, { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { Container, Row, Col, Button } from 'react-bootstrap'
import {
  DashboardHeader,
  DashboardRow as DashRow,
  DashboardCol as DashCol,
  WidgetContainer
} from '../components/DashUtils'
import { AccountCircle } from '@material-ui/icons'

const Settings = () => {
  return <Container fluid className="h-100 d-flex flex-column px-0">
    
    <DashRow css="justify-content-center">
      <DashCol lg={14}>
        <DashboardHeader title="Settings"
          subtitle="Edit your profile, preferences and link pharmacies" />
        <DashRow css="mt-lg-3 mb-lg-5">
          <DashCol css="">
            <WidgetContainer widget={<ProfileContent />} title="Profile" css="h-auto" />
          </DashCol>
      </DashRow>
      </DashCol>
    </DashRow>
  </Container>
}

const ProfileContent = () => {
  const { userData, updateProfile } = useAuth()
  // eslint-disable-next-line
  // const [state, setState] = useState(auth.userData ?
  //   {
  //     name: auth.userData.name,
  //     email: auth.userData.email,
  //     profileImg: auth.userData.profile_img
  //   } : null)
  console.log(userData.profile_img)

  return userData ? (
    <Row className="justify-content-between">
      <Col xs={"auto"} className="my-3 px-lg-5">
        
        <SettingsProfilePicture src={userData ? userData.profile_img : null} border />
      
        
      </Col>
      <Col className="d-flex flex-column">
        <div className="mt-lg-5">
          <h4>{userData ? userData.name : ''}</h4>
          <p>{userData ? userData.email : ''}</p>
        </div>
        <div>
          <Button className="w-auto" variant="green" onClick={e => {
            e.preventDefault()
            updateProfile({
              name: "Kyler Sakumoto",
              img: "https://images-na.ssl-images-amazon.com/images/I/61ZQxQke2rL._SL1203_.jpg"
            })
          }}>Edit Profile</Button>
        </div>
      </Col>
    </Row>
  ) : (
    <div>No user profile detected</div>
  )
}

const SettingsProfilePicture = ({ src, width, border }) => {
  const style = {
    width: width ? width : '250px',
    height: width ? width : '250px',
    borderRadius: '50%',
    boxShadow: border ? '0 0 20px 5px gray' : '',
    backgroundImage: `url(${src})`,
    backgroundPosition: 'center'
  }
  console.log(src)

  return src ? (
    <div style={style} className="bg-img-cover" alt="profile" />
  ) : <AccountCircle style={style}/>
}

// const PharmacyContent = () => {
//   return <Row>
    
//   </Row>
// }

// const SettingsContent = () => {
//   return <Row>
//     <Col>
//       <p>Start Sidebar Minimized</p>
//       <p>Start Sidebar Minimized</p>
//       <p>Start Sidebar Minimized</p>
//       <p>Start Sidebar Minimized</p>
//       {/* <p>Start Sidebar Minimized</p> */}
//     </Col>
//   </Row>
// }

export default Settings
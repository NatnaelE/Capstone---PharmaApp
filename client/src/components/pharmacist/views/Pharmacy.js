import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { Container, Row, Col, Button } from 'react-bootstrap'
import {
  DashboardHeader,
  DashboardRow as DashRow,
  DashboardCol as DashCol,
  WidgetContainer,
  ProfilePicture
} from '../components/DashUtils'

const PharmacyContent = () => {
  return <Container fluid className="h-100 d-flex flex-column px-0">
    
    <DashRow css="justify-content-center">
      <DashCol lg={14}>
        <DashboardHeader title="My Pharmacy"
          subtitle="View and edit your pharmacy's details" />
        <DashRow css="mt-lg-3 mb-lg-5">
          <DashCol>
            <WidgetContainer widget={<PharmacyHeader />} title="Preferences" css="h-auto" />
          </DashCol>
        </DashRow>
      </DashCol>
    </DashRow>
    
  </Container>
}

const PharmacyHeader = () => {
  const { userData, loading } = useAuth()
  const [pharmacy, setPharmacy] = useState()
  // eslint-disable-next-line
  // const [state, setState] = useState(auth.userData ?
  //   {
  //     name: auth.userData.name,
  //     email: auth.userData.email,
  //     profileImg: auth.userData.profile_img
  //   } : null)
  
  // console.log(state)
  useEffect(() => {
    userData && setPharmacy(
      {...userData.pharmacies[userData.primary_pharmacy]}
    )
    console.log(pharmacy)
  }, [userData])

  //"https://images-na.ssl-images-amazon.com/images/I/61ZQxQke2rL._SL1203_.jpg"

  return pharmacy ? (
    <Row className="flex-column">
      <Col>
        <h1 className="fs-1-5 fw-600">{pharmacy.pharmacyName}</h1>
        <h2 className="fs-1-25 fw-300">{pharmacy.location.address}</h2>
      </Col>
    </Row>
  ) : (
    <div>Add a Pharmacy</div>
  )
}

export default PharmacyContent
import React from 'react'
import { Container } from 'react-bootstrap'
import {  DashboardHeader,
  DashboardRow as DashRow,
  DashboardCol as DashCol,
  WidgetContainer,
  TestWidget  } from '../components/DashUtils'

const DashboardContent = () => {
  return <Container fluid className="h-100 d-flex flex-column px-0">
    <DashboardHeader
      title="Dashboard" subtitle="Your pharmacy at a glance"/>
    <DashRow>
      <DashCol hasNeighbor>
        <DashRow>
          <DashCol>
            <WidgetContainer widget={<TestWidget title={'Quick Actions'} />} />
          </DashCol>
        </DashRow>
        <DashRow>
          <DashCol>
            <WidgetContainer />
          </DashCol>
        </DashRow>
      </DashCol>
      <DashCol xs={4} md={5} lg={6}>
        <WidgetContainer />
      </DashCol>
    </DashRow>

    <DashRow>
      <DashCol hasNeighbor>
        <WidgetContainer />
      </DashCol>
      <DashCol>
        <WidgetContainer />
      </DashCol>
    </DashRow>
  </Container>
}

export default DashboardContent

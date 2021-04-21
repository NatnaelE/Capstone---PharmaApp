import React from 'react'
import { Container } from 'react-bootstrap'
import {  DashboardHeader,
  DashboardRow as DashRow,
  DashboardCol as DashCol,
  WidgetContainer,
  TestWidget  } from '../components/DashUtils'

const DashboardContent = ({ openSidebar }) => {
  return <Container fluid className="h-100 d-flex flex-column px-0">
    <DashboardHeader
      title="Dashboard" subtitle="Your pharmacy at a glance" />
    <DashRow>
      <DashCol hasNeighbor xs={16} md={10}>
        <DashRow>
          <DashCol>
            <WidgetContainer widget={<TestWidget />} title={'Quick Actions'} />
          </DashCol>
        </DashRow>
        <DashRow>
          <DashCol>
            <WidgetContainer title={'At a Glance'} />
          </DashCol>
        </DashRow>
      </DashCol>
      <DashCol xs={16} md={6} >
        <WidgetContainer title={'Recent Orders'} />
      </DashCol>
    </DashRow>

    <DashRow>
      <DashCol hasNeighbor xs={16} sm={8}>
        <WidgetContainer title={'Order Trends'} />
      </DashCol>
      <DashCol>
        <WidgetContainer title={'Order Next'} css="bg-red text-light" />
      </DashCol>
    </DashRow>
  </Container>
}

export default DashboardContent

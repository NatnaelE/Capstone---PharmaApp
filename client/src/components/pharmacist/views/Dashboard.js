import React from 'react'
import { Container } from 'react-bootstrap'
import {  DashboardHeader,
  DashboardRow as DashRow,
  DashboardCol as DashCol,
  WidgetContainer,
} from '../components/DashUtils'
import DefaultWidget from '../widgets/DefaultWidget'

const DashboardContent = ({ openSidebar }) => {
  return <Container fluid className="h-100 d-flex flex-column px-0">
    <DashboardHeader
      title="Dashboard" subtitle="Your pharmacy at a glance" />
    <DashRow>
      <DashCol hasNeighbor xs={16} md={9}>
        <DashRow>
          <DashCol>
            <WidgetContainer widget={<DefaultWidget />} title={'Quick Actions'} />
          </DashCol>
        </DashRow>
        <DashRow>
          <DashCol>
            <WidgetContainer title={'At a Glance'} />
          </DashCol>
        </DashRow>
      </DashCol>
      <DashCol xs={16} md={7} >
        <WidgetContainer title={'Recent Orders'} />
      </DashCol>
    </DashRow>

    <DashRow>
      <DashCol hasNeighbor xs={16} sm={8} md={9}>
        <WidgetContainer title={'Order Trends'} />
      </DashCol>
      <DashCol>
        <WidgetContainer title={'Order Next'} css="bg-red text-light" />
      </DashCol>
    </DashRow>
  </Container>
}

export default DashboardContent

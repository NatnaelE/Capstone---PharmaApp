import React from 'react'
import { Container } from 'react-bootstrap'
import {  DashboardHeader,
  DashboardRow as DashRow,
  DashboardCol as DashCol,
  WidgetContainer,
} from '../components/DashUtils'
import { OrderNext } from '../widgets/Widgets'
import QuickActions from '../widgets/QuickActions'
import AtAGlance from '../widgets/AtAGlance'

const DashboardContent = ({ openSidebar }) => {
  return <Container fluid className="h-100 d-flex flex-column px-0">
    <DashboardHeader
      title="Dashboard" subtitle="Your pharmacy at a glance" />
    <DashRow>
      <DashCol hasNeighbor xs={16} md={9}>
        <DashRow>
          <DashCol>
            <WidgetContainer widget={<QuickActions title={'Quick Actions'} />} />
          </DashCol>
        </DashRow>
        <DashRow>
          <DashCol>
            <WidgetContainer widget={<AtAGlance title={'At A Glance'} />} />
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
        <WidgetContainer widget={<OrderNext title="Order Next" />} css="bg-red text-light" />
      </DashCol>
    </DashRow>
  </Container>
}

export default DashboardContent

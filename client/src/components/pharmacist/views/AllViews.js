import React from 'react'
import { Container } from 'react-bootstrap'
import {  DashboardHeader } from '../components/DashUtils'
import DashboardContent from './Dashboard'

// Main dashboard for pharmacists
const DashboardView = () => {
  return <DashboardContent />
}

const InventoryView = () => {
  return <Container fluid className="h-100 d-flex flex-column px-0">
    <DashboardHeader title="Inventory Tracker"
      subtitle="View, add and update medications" />
  </Container>
}

const OrdersView = () => {
  return <Container fluid className="h-100 d-flex flex-column px-0">
    <DashboardHeader title="Orders"
      subtitle="View orders and history" />
  </Container>
}

const PharmacyView = () => {
  return <Container fluid className="h-100 d-flex flex-column px-0">
    <DashboardHeader title="My Pharmacy"
      subtitle="View or update your pharmacy's information" />
  </Container>
}

export { DashboardView, InventoryView, OrdersView, PharmacyView }
import React from 'react';
import { InvSearchController } from '../components/InventorySearch';
import { Row, Col, Button } from 'react-bootstrap';

const QuickActions = ({title}) => {
  return <Row className="flex-column">
    <Col xs={"auto"}><h3>{title ? title : 'Widget'}</h3></Col>
    <Col xs={"auto"} className="pt-3">
      <h4>Search Inventory</h4>
      <InvSearchController 
        id="dashboard"
        labelKey={"BrandName"}
        cloudFunction={data => {console.log(data)}}
      />
    </Col>
    <Col xs={"auto"} className="pt-4">
      <h4>More Actions</h4>
      <Row>
        <Col className="d-flex pr-0">
          <Button size="lg" variant="green" className="flex-grow-1">
            Add New Medication
          </Button>
        </Col>
        <Col className="d-flex">
          <Button size="lg" variant="sky-blue" className="flex-grow-1">
            Update Medication
          </Button>
        </Col>
      </Row>
    </Col>
  </Row>
}

export default QuickActions;
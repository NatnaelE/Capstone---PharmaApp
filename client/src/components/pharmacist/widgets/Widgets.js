import React from 'react';
import { Row, Col } from 'react-bootstrap';

const OrderNext = ({title}) => {
  const rows = lowMedData.map(d => {
    return (
      <Row className="align-items-baseline">
        <Col><h4 className="fs-1-1 fw-300">{d.name}</h4></Col>
        <Col xs={"auto"}><h5 className="fs-1">{d.numLow + ' low dosages'}</h5></Col>
      </Row>
    )
  })

  return <Row className="h-100 flex-column">
    <Col xs={"auto"}><h3>{title ? title : 'Widget'}</h3></Col>
    <Col>
      {rows}
    </Col>
    <Col className="d-flex justify-content-end align-items-end">
      <h5 className="m-0">See All Low Medications</h5>
    </Col>
  </Row>
}

const lowMedData = [
  {
    name: "Amoxicillin",
    numLow: 6
  },
  {
    name: "Ciprofloaxin",
    numLow: 3
  },
  {
    name: "Vitamin A",
    numLow: 10
  },
  {
    name: "Naproxen",
    numLow: 8
  },
  {
    name: "Ritalin",
    numLow: 2
  },
]
export { OrderNext };
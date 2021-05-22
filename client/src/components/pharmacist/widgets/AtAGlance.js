import React from 'react';
import { Row, Col } from 'react-bootstrap';

import ActivityRings from "react-activity-rings";

const AtAGlance = ({title}) => {
  const rings = ringData.map(d => {
    return (
      <Col className="px-0 d-flex flex-column align-items-center">
        <ActivityRings
          data={[{
            value: d.value,
            color:
              d.value > 0.75 ? '#00D315' : 
              d.value > .5 ? '#E1D800' :
              d.value > .25 ? '#FF8831' : '#DE350B',
            backgroundColor: '#6c757d'
          }]}
          config={{ width: 110, height: 110, radius: 45, ringSize: 10 }}
        />
        <h5 className="text-center m-0 pt-3">{d.label}</h5>
      </Col>
    )
  })

  return <Row className="flex-column">
    <Col xs={"auto"}><h3>{title ? title : 'Widget'}</h3></Col>
    <Col>
      <Row className="mx-0 pt-3 align-items-center">
        {rings}
      </Row>
    </Col>
  </Row>
}

const ringData = [
  { value: 0.82, label: "Cardiovascular" },
  { value: 0.65, label: "Diabetics" },
  { value: 0.43, label: "Antibiotics" },
  { value: 0.85, label: "Topicals" },
  { value: 0.76, label: "Cold & Flu" },
  { value: 0.29, label: "Vitamins" }
]

export default AtAGlance;
import React from 'react';
import { Row, Col } from 'react-bootstrap';

const DefaultWidget = ({title}) => {
  return <Row className="h-100 flex-column">
    <Col xs={"auto"}><h3>{title ? title : 'Widget'}</h3></Col>
    <Col className="text-warning">Feature coming soon!</Col>
  </Row>
}

export default DefaultWidget;
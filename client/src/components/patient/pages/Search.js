import React, { useState } from 'react'
import { Container, Jumbotron, Row, Col } from 'react-bootstrap'
import { SearchController } from '../components/SearchInput'
import Parse from 'parse';

import brandNames from '../../../constants/brandNames.json'

const SearchPage = () => {
  const [results, setResults] = useState()

  const search = async (data) => {
    const searchTerm = data.medication[0].label ? data.medication[0].label : data.medication[0]
    Parse.Cloud.run('getByBrandNameSearch', {brandName: searchTerm})
      .then(resp => {
        console.log(resp)
        return resp
      }).then(resp => {
        const results = {
          header: resp[0].BrandName,
          subtitle: resp[0].GenericName,
          count: resp.length,
          brandNames: resp.map(d => d.BrandName),
          genericNames: resp.map(d => d.GenericName),
          dosages: resp.map(d => d.Dosage),
          dosageForms: resp.map(d => d.DosageForm)
        }
        setResults(results)
      })
      .catch(console.error)
  }

  return <Container fluid
            className="vh-100 pt-5 px-3 d-flex flex-column abstract-bg bg-img-cover">
    <Row className="flex-grow-1 justify-content-center">
      <Col lg={12} xl={10} className="d-flex align-items-center">
        <Jumbotron className="pt-3 pb-4 flex-grow-1">
          <h2 className="mt-3 text-center fw-700">Medication Search</h2>
          <hr className="mb-4" />
          <SearchController
            options={brandNames.sort()}
            id={"patient"}
            useLocation
            cloudFunction={search} />
        </Jumbotron>
        
      </Col>
    </Row>
    {results && (<>
      <Row className="flex-grow-1 justify-content-center">
        <Col>
          {results && (
            <h3>{'Found ' + results.count + ' Results for ' + results.header}
              <small className="text-muted">{' ' + results.subtitle}</small></h3>
          )}
          
        </Col>
      </Row>
      <Row className="flex-grow-1 justify-content-center flex-nowrap">
        <Col xs={6}>
          <h5>Brand Name</h5>
          { results.brandNames.map(d => {
            return <div className="text-ellipsis">{d}</div>
          })}
        </Col>
        <Col xs={6}>
          <h5>Generic Name</h5>
          { results.genericNames.map(d => {
            return <div className="text-ellipsis">{d}</div>
          })}
        </Col>
        <Col xs={4}>
          <h5>Dosage</h5>
          { results.dosages.map(d => {
              return <div className="text-ellipsis">{d}</div>})}
        </Col>
        {/* <Col>{results.dosageForms.map(d => {
          return <div>{d}</div>})}
        </Col> */}
      </Row>
    </>)}
    
  </Container>
}

export default SearchPage
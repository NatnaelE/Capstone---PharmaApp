import React, { useEffect, useState } from 'react'
import { useSearch } from '../../../hooks/useSearch'
import { Container, Jumbotron, Row, Col, Collapse, Button } from 'react-bootstrap'
import { SearchController } from '../components/SearchInput'
import { LocalPharmacy, LocationOn, ExpandMore, AddCircle, MoreHoriz } from '@material-ui/icons';
// import Parse from 'parse';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const SearchPage = ({ location }) => {
  const { loading, loadParamsFromQuery } = useSearch()
  const [showSearchBar, setShowSearchBar] = useState(true)
  const [showBuffer, setShowBuffer] = useState(true)

  // On mount, check query params
  useEffect(async () => {
    // Check for query params
    const hasParams = await loadParamsFromQuery(location.search)
    
    // Decide to search or show search bar
    if (hasParams) {
      searchAnimation()
    } else {
      await loadAnimation()
    }
  }, [location])

  // Show buffer if loading
  useEffect(() => {
    setShowBuffer(loading)
  }, [loading])


  //// Animation Functions ////

  // Show search bar on load
  const loadAnimation = async () => {
    console.log("no params load animation fired")
    setShowSearchBar(true)
    setShowBuffer(true)
  }

  // Show results on search
  const searchAnimation = async () => {
    console.log("search animation fired")
    console.log(loading)

    // Begin animation
    setShowBuffer(true)
    setShowSearchBar(false)
  }

  // Hide results and return to search bar
  const clearSearch = async () => {
    // Begin animation
    setShowBuffer(true)     // add buffer
    await sleep(200)        // delay ...
    setShowSearchBar(true)  // show search bar
  }

  // Pass props to view controller
  const inputProps = { loading, showSearchBar, showBuffer, clearSearch }

  return (
    <Container fluid className="vh-100 px-3  bg-pills-01 bg-gradient-dark" style={{
      overflowY: 'hidden'
    }}>
      <SearchViewController {...inputProps} />
    </Container>
  )
}

const SearchViewController = ({ loading, showSearchBar, showBuffer, clearSearch }) => {
  return (<>
    <SearchBar show={showSearchBar} />   
    <LoadingView show={showBuffer} loading={loading} />
    <ResultsView clearSearch={clearSearch} />
  </>)
}

const LoadingView = ({ show, loading }) => {
  return (
    <Collapse in={show}>
      <div>
        <div className="d-flex justify-content-center" style={{height: '70vh', paddingBottom: '25vh'}}>
          {loading && (
            <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
          )}
        </div>
      </div>
    </Collapse>
  )
}

const SearchBar = ({ show }) => {
  let { search } = useSearch()

  return (
    <div className="pt-5" style={{minHeight: '25vh'}}>
      <Row className="justify-content-center">
        <div className="w-100">
          <Collapse in={show}>
            <div className="">
              <div className="pt-3 pb-0 mb-0 d-flex justify-content-center align-items-end"  style={{height: '30vh'}}>
                <h1 className="display-4 mb-5 text-center fw-800">Search Medications</h1>
              </div>
            </div>
          </Collapse>
        </div>
      </Row>
      <Row className="justify-content-center" style={{paddingTop: '5vh'}}>
        <Col lg={14} xl={12} className="">
          <SearchController
          id={"patient"}
          labelKey={"BrandName"}
          useLocation
          cloudFunction={search} />
        </Col>
      </Row>
    </div>
  )
}

const ResultsView = ({ clearSearch }) => {
  let { params, results } = useSearch()
  console.log(results)

  return (
    <div className=""  style={{height: '75vh', maxHeight: '75vh'}}>
      <Jumbotron className="h-100 bg-ghost-white box-shadow-strong" style={{paddingTop: '5vh'}}>
        <Container fluid className="px-0 h-100 d-flex flex-column">
          <Row className="justify-content-center align-items-center">
            <Col xs={"16"}><h3 className="text-dark fw-200">Found {results && results.count} pharmacies </h3></Col>
            <Col xs={"auto"}><h4 className="mb-0 text-muted fw-600 fs-1">WITH</h4></Col>
            <Col xs={"auto"} className="px-0"><Button disabled variant="green" style={{borderRadius: '45px'}}>
              <LocalPharmacy style={{fontSize: 'inherit'}} />{params && <span>{' ' + params.med}</span>}</Button>
            </Col>
            <Col xs={"auto"} className="pl-4"><h4 className="mb-0 text-muted fw-600 fs-1">NEAR</h4></Col>
            <Col xs={"auto"} className="px-0 fw-200 ff-montserrat"><Button disabled variant="sky-blue" style={{borderRadius: '45px'}}>
              <LocationOn style={{fontSize: 'inherit'}} />{params && <span>{' ' + params.loc}</span>}</Button>
            </Col>
            <Col xs={"auto"} className="ml-auto"><Button size="sm" variant="light-gray" onClick={clearSearch}>Hide</Button></Col>
          </Row>
          
          <ResultHeader />
          <Row className="flex-grow-1 mx-0 box-shadow-strong" style={{
            overflow: 'hidden'
          }}>
            <Col className="h-100" style={{
              overflow: 'scroll',
              overflowY: 'overlay',
              overflowX: 'hidden',
              border: '1px #e9ecef solid'
            }}>
              {results && results.rows.map(d => {
                return (
                  <ResultRow key={d.id}
                    id={d.id}
                    name={"Local Pharmacueticals"}
                    dist={d.dist + " miles"}
                    brandName={results.medType.BrandName}
                    dosage={results.medType.Dosage}
                    quant={d.quant}
                    genericName={results.medType.GenericName}
                    dosageForm={results.medType.DosageForm}
                  />
                )
              })}
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </div>
  )
}

const ResultHeader = ({  }) => {
  const headers = [
    {n: "Pharmacy", xs: ''},
    {n: "Distance", xs: 2},
    {n: "Brand Name", xs: ''},
    {n: "Dosage", xs: 2},
    {n: "Quantity", xs: 2},
    {n: "Details", xs: 1}
  ]

  return (
    <Row className="mt-4 mx-0">
      {headers.map(d => {
        return <Col xs={d.xs} className="py-2 bg-ultra-blue text-light text-center" key={d.n}>{d.n}</Col>
      })}
    </Row>
  )
}

const ResultRow = ({ id, name, dist, brandName, dosage, quant, genericName, dosageForm }) => {
  const [expand, setExpand] = useState(false)

  return (<Container fluid style={{height: '', borderBottom: "1px #e9ecef solid"}} id={id}>
    <Row className="py-2 fw-300" >
      <Col className="pl-4 text-truncate">{name}</Col>
      <Col xs={2} className="pl-4X text-center text-truncate fw-600">{dist}</Col>
      <Col className="pl-4 text-center text-truncate">{brandName}</Col>
      {/* <Col className="pl-4">111 Pharmacy Ave</Col> */}
      <Col xs={2} className="pl-4 pr-4 text-right">{dosage}</Col>
      <Col xs={2} className="pl-4 pr-4 text-right">{quant}</Col>
      <Col xs={1} className="pl-4 text-right d-flex justify-content-end">
        <Button variant="sky-blue" className="p-0 px-1 d-flex align-items-center" onClick={e => {
          e.preventDefault()
          setExpand(!expand)
        }}><MoreHoriz /></Button>

        {/* <Button variant="green" disabled className="ml-2 p-0 px-1 fs-09 d-flex align-items-center">Add <AddCircle className="ml-1 " style={{fontSize: '0.95rem'}}/></Button>   */}
      </Col>
      
      {/* <Collapse in={expand}>
      <Col xs={16}>
        Expand
        </Col>
        </Collapse> */}
    </Row>
    
      <Collapse in={expand}>
        <div>
        <Row className="pb-2">
          <Col xs={8} className="pl-4"><LocationOn style={{fontSize: '1.125rem'}} /><span className="text-secondary text-truncate">{' '}111 Pharmacy Ave, Seattle WA 98105</span></Col>
          <Col className="pl-4">
            <p className="fs-1 fw-700 text-uppercase">Medicine Details</p>
            <p className="mb-1 fs-09 fw-600">Generic Name: {genericName}</p>
            <p className="mb-1 fs-09 fw-600">Dosage Form: {dosageForm}</p>
          </Col>
        </Row>
        </div>
      </Collapse>
    </Container>
  )
}

{/* <Row className="flex-grow-1 justify-content-center flex-nowrap">
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
  <Col>{results.dosageForms.map(d => {
    return <div>{d}</div>})}
  </Col>
</Row> */}

// const search = async (data) => {
//   const searchTerm = data.medication[0].label ? data.medication[0].label : data.medication[0]
//   Parse.Cloud.run('getByBrandNameSearch', {brandName: searchTerm})
//     .then(resp => {
//       console.log(resp)
//       return resp
//     }).then(resp => {
//       const results = {
//         header: resp[0].BrandName,
//         subtitle: resp[0].GenericName,
//         count: resp.length,
//         brandNames: resp.map(d => d.BrandName),
//         genericNames: resp.map(d => d.GenericName),
//         dosages: resp.map(d => d.Dosage),
//         dosageForms: resp.map(d => d.DosageForm)
//       }
//       setResults(results)
//     })
//     .catch(console.error)
// }

export default SearchPage
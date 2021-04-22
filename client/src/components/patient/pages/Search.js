import React from 'react'
import { Container } from 'react-bootstrap'
import { SearchInput } from '../components/SearchInput'

const SearchPage = () => {
  return <Container fluid className="vh-100 pt-5 px-3">
    <h5 className="mt-3">Search Medications</h5>
    <SearchInput />
  </Container>
}

export default SearchPage
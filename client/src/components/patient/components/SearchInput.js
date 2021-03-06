import React, { useState, useEffect } from 'react'
// import { usePosition } from '../../../hooks/usePosition'

import { useForm, Controller } from 'react-hook-form'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

// Icons
import { LocalPharmacy, LocationOn, Search } from '@material-ui/icons';

const SearchController = ({ options, id, useLocation, cloudFunction }) => {
  const { handleSubmit, control, formState: { errors }, clearErrors } = useForm();
  console.log(errors)
  // let position = usePosition()
  // console.log(position.latitude)
  // console.log(position.longitude)
  const [validated, setValidated] = useState(false)

  const onSubmit = (data, e) => {
    e.preventDefault()
    console.log("submit fired")
    console.log(data)
    cloudFunction(data)
  }

  useEffect(() => {
    errors ? setValidated(false) : setValidated(true)
  }, [errors, setValidated])

  return (
    
    <Form validated={validated} onSubmit={handleSubmit(onSubmit)}>
      <Form.Row>
      <Form.Group as={Col} xs={useLocation && 9}>
      <InputLabel icon={LocalPharmacy} label={useLocation ? 'Find Medications' : 'Search Medications'} />
      <div onClick={() => clearErrors("medication")}>
        <Controller
          name="medication"
          rules={{ required: true }}
          control={control}
          render={({
            field: { ref, ...fields },
            fieldState: { invalid, ...fieldState },
            formState,
          }) => (
            <Typeahead
              {...fields}
              {...fieldState}
              isInvalid={invalid}
              id={(id ? id : 'X') + '-medication-search'}
              clearButton
              allowNew
              options={options}
              placeholder="What medication do you need?"
              size="lg"
            />
          )}  
        />
        <Form.Control.Feedback type="invalid" tooltip 
          className={`${errors.medication ? "d-block" : "d-none"} ml-3`}>
          Please enter at least 1 medication
        </Form.Control.Feedback>
        </div>
      </Form.Group>
      
      {useLocation && (
        <Form.Group as={Col}>
          <InputLabel icon={LocationOn} label="Near" />
          <div onClick={() => clearErrors("location")}>
            <Controller
              name="location"
              rules={{ required: true }}
              control={control}
              render={({
                field: { ref, ...fields },
                fieldState: { invalid, ...fieldState },
                formState,
              }) => (
                <Typeahead
                  {...fields}
                  {...fieldState}
                  isInvalid={invalid}
                  id={(id ? id : 'X') + '-location-search'}
                  options={locationOptions}
                  clearButton
                  placeholder="Where should we look?"
                  size="lg"
                />
              )}  
            />
            <Form.Control.Feedback type="invalid" tooltip 
              className={`${errors.location ? "d-block" : "d-none"} ml-3`}>
              Please enter a location
            </Form.Control.Feedback>
          </div>
        </Form.Group>
      )}
      <Form.Group as={Col} xs={"auto"} className="d-flex align-items-end">
        <Button type="submit" variant="green" size="lg"><Search /></Button>
      </Form.Group>
      </Form.Row>
    </Form>
    
  )
}


const InputLabel = ({ icon: Icon, label }) => {
  return <Row className="mb-1 align-items-center">
    <Col xs={"auto"} className="pr-0 d-flex">
      <Icon className="fs-11" />
    </Col>
    <Col className="pl-1">
      <Form.Label className="mb-0 text-uppercase fs-08 fw-600">{label}</Form.Label>
    </Col>
  </Row>
}

const locationOptions = [
  'My Current Location'
]
export { SearchController }

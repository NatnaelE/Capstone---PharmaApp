import React, { useState, useEffect } from 'react'
// import { usePosition } from '../../../hooks/usePosition'

import { useForm, useController, Controller } from 'react-hook-form'
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";


// Icons
import { LocalPharmacy, LocationOn, Search, SentimentDissatisfiedSharp } from '@material-ui/icons';

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

  const props = {}
  props.renderInput = ({
    inputRef,
    referenceElementRef,
    ...inputProps
  }) => (
    <InputGroup size="lg" id="custom-search">
      <InputGroup.Prepend>
        <InputGroup.Text className="px-3 py-0">
          <LocalPharmacy className="fs-1-1" />
        </InputGroup.Text>
      </InputGroup.Prepend>
      <Form.Control
        {...inputProps}
        ref={(node) => {
          inputRef(node);
          referenceElementRef(node);
        }}
      />
      
    </InputGroup>
  )

  return (
    
    <Form validated={validated} onSubmit={handleSubmit(onSubmit)}>
      <Form.Row className="align-items-center">
      <Form.Group as={Col} xs={useLocation && 8}>
      {/* <InputLabel icon={LocalPharmacy} label={useLocation ? 'Find Medications' : 'Search Medications'} /> */}
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
              {...props}
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
        <Form.Control.Feedback>Where will I appear?</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid" tooltip 
          className={`${errors.medication ? "d-block" : "d-none"} ml-3`}>
          Please enter at least 1 medication
        </Form.Control.Feedback>
        </div>
      </Form.Group>
      
      {useLocation && (
        <Form.Group as={Col}>
          {/* <InputLabel icon={LocationOn} label="Near" /> */}
          <div onClick={() => clearErrors("location")}>
            {/* <Controller
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
            /> */}
            <LocationInput name="location" control={control} id={id} />

            <Form.Control.Feedback type="invalid" tooltip 
              className={`${errors.location ? "d-block" : "d-none"} ml-3`}>
              Please enter a location
            </Form.Control.Feedback>
          </div>
        </Form.Group>
      )}
      <Form.Group as={Col} xs={"auto"} className="d-flex align-items-end">
        <Button type="submit" variant="green" size="lg" className="p-3" 
          id="search-button"
        style={{borderRadius: '45px'}}><Search /></Button>
      </Form.Group>
      </Form.Row>
    </Form>
    
  )
}

const LocationInput = ({ name, control, id }) => {
  const [showLoading, setShowLoading] = useState(false)
  const [options, setOptions] = useState([])

  // React Hook Form props
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, ...fieldState },
    formState: { touchedFields, dirtyFields }
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: "",
  });

  // Use Places Autocomplete props
  const {
    ready,
    value,
    suggestions: { loading, status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["(region)"]
    },
    // debounce: 300,
  });

  // Custom Render Styling Props
  const renderProps = {
    renderInput: ({
      inputRef,
      referenceElementRef,
      ...inputProps
    }) => (
      <InputGroup size="lg" id="custom-search">
        <InputGroup.Prepend>
          <InputGroup.Text className="px-3 py-0">
            <LocationOn className="fs-1-1" />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          {...inputProps}
          ref={(node) => {
            inputRef(node);
            referenceElementRef(node);
          }}
        />
        
      </InputGroup>
    )
  }

  // console.log(value)
  // console.log(status)
  // console.log(loading)
  // console.log(data)
  // console.log(options)

  const handleSearch = query => {
    console.log(query)
    setShowLoading(true)
    setValue(query)
  }

  useEffect(() => {
    console.log(data)
    console.log(status)
  }, [status, data])

  useEffect(() => {
    console.log(value)
    if (!value) {
      console.log("suggestions cleared")
      clearSuggestions()
    }
  }, [value, clearSuggestions])

  useEffect(() => {
    setOptions(data.map(d => ({
      location: d.description
    })))
    setShowLoading(false)
  }, [data, setOptions])

  return (
    <AsyncTypeahead
      {...inputProps}
      {...fieldState}
      {...renderProps}

      filterBy={() => true}
      labelKey="location"
      minLength={3}
      isLoading={showLoading}
      onSearch={handleSearch}
      options={options}

      isInvalid={invalid}
      id={(id ? id : 'X') + '-location-search'}
      clearButton
      placeholder="Where should we look?"
      size="lg"
    />
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

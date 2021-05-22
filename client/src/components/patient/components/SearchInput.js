import React, { useState, useEffect } from 'react'
import { useSearch } from '../../../hooks/useSearch'
import { useForm, useController, useWatch } from 'react-hook-form'
import usePlacesAutocomplete from 'use-places-autocomplete'

import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead'
import { Button, Col, Form, InputGroup } from 'react-bootstrap'

// Icons
import { LocalPharmacy, LocationOn, Search } from '@material-ui/icons'

// Autocomplete data
import medData from '../../../constants/medData.json'


const SearchController = ({ id, labelKey, useLocation, cloudFunction }) => {
  // Hook into search context provider
  const { loading, params } = useSearch()

  // Init React Hook Form
  const { handleSubmit, control, formState: { errors, isSubmitting }, clearErrors, setValue, getValues } = useForm({
    defaultValues: {
      medication: [],
      location: []
    }
  });

  // Control validation state
  const [validated, setValidated] = useState(false)

  // Control field values on useSearch param change
  useEffect(() => {
    if (params) {
      setValue("medication", [params.med])
      useLocation && setValue("location", [{location: params.loc}])
    } else {
      setValue("medication", [])
      useLocation && setValue("location", [])
    }
  }, [params])

  // Control validation state on error change
  useEffect(() => {
    errors ? setValidated(false) : setValidated(true)
  }, [errors, setValidated])

  // Handle form submit
  const onSubmit = async (data, e) => {
    e.preventDefault()
    console.log("SearchInput: submit fired")
    console.log(data)

    if (useLocation) {
      const { medication, location } = data
      await cloudFunction(medication, location[0].location)
    } else {
      // call other search function
      const { medication } = data
      await cloudFunction(data)
    }
  }

  return (    
    <Form validated={validated} onSubmit={handleSubmit(onSubmit)}>
      <Form.Row className="align-items-center">
        <Form.Group as={Col} xs={useLocation && 8} className="mb-0">
          <div onClick={() => clearErrors("medication")}>
            <MedicationInput 
              name="medication"
              control={control}
              labelKey={labelKey}
              id={id} />

            <Form.Control.Feedback type="invalid" tooltip 
              className={`${errors.medication ? "d-block" : "d-none"} ml-3`}>
              Please enter at least 1 medication
            </Form.Control.Feedback>
          </div>
        </Form.Group>
        
        {useLocation && (
          <Form.Group as={Col} className="mb-0">
            {/* <InputLabel icon={LocationOn} label="Near" /> */}
            <div onClick={() => clearErrors("location")}>
              <LocationInput 
                name="location" 
                control={control} 
                id={id} 
                searchLoading={loading} />

              <Form.Control.Feedback type="invalid" tooltip 
                className={`${errors.location ? "d-block" : "d-none"} ml-3`}>
                Please enter a location
              </Form.Control.Feedback>
            </div>
          </Form.Group>
        )}
        
        <Form.Group as={Col} xs={"auto"} className="mb-0 d-flex align-items-end">
          <Button variant="green" size="lg" id="search-button"
            className="p-3"
            style={{borderRadius: '45px'}}
            type="submit"
            disabled={isSubmitting || loading}><Search /></Button>
        </Form.Group>
      </Form.Row>
    </Form>
  )
}


const MedicationInput = ({ name, control, labelKey, id }) => {
  const { loading } = useSearch()             // get useSearch loading state
  const [options, setOptions] = useState([])  // control input options

  // On mount, load local med data into options
  useEffect(() => {
    const parsed = medData.map(d => {
      return d[labelKey]
    }).filter(d => {
      return typeof d === "string"
    })

    setOptions([...new Set(parsed)])
  }, [])

  // RHF controller props
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, ...fieldState },
    formState: { isSubmitting }
  } = useController({
    name,
    control,
    rules: { required: true }
  });

  // Watch RHF field value
  const selected = useWatch({
    control,
    name
  });

  // React Typeahead render props
  const renderProps = {
    renderInput: ({
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
  }

  return (
    <Typeahead
      {...inputProps}
      {...fieldState}

      {...renderProps}

      id={(id ? id : 'X') + '-medication-search'}
      labelKey={"label"}

      options={options}
      selected={selected}
      isInvalid={invalid}
      disabled={isSubmitting || loading}

      clearButton
      allowNew
      placeholder="What medication do you need?"
      size="lg"
    />
  )
}


const LocationInput = ({ name, control, id, searchLoading }) => {
  // RHF controller props
  const {
    field: { ref, onChange, ...inputProps },
    fieldState: { invalid, ...fieldState },
    formState: { isSubmitting }
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: [],
  });

  // Watch RHF field state
  const selected = useWatch({
    control,
    name: 'location'
  });

  // usePlacesAutocomplete hook and props
  const {
    ready,
    value,
    suggestions: { loading, status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["geocode"]
    },
    // debounce: 300,
  });

  // Control async loading and option state
  const [isLoading, setIsLoading] = useState(loading)
  const [options, setOptions] = useState([])

  // Custom render styling props for Typeahead
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

  // Syncs UPA responses with Typeahead options
  useEffect(() => {
    setOptions(data.map(d => ({
      location: d.description
    })))
    setIsLoading(false)
  }, [data, setOptions])

  // Pass typed value from Typeahead to usePlacesAutocomplete
  const handleSearch = query => {
    console.log(query)
    setIsLoading(true)  // show loading state
    setValue(query)     // set UPA query
  }
  
  // Handle Typeahead selection
  const handleChange = val => {
    console.log(val)
    onChange(val)  // call RHF onChange
    if (val.length === 0) {
      console.log("suggestions cleared")
      clearSuggestions()
    }
  }

  return (
    <AsyncTypeahead
      {...inputProps}
      {...fieldState}
      {...renderProps}
      
      filterBy={() => true}
      labelKey="location"
      minLength={1}
      disabled={!ready}
      isLoading={isLoading}
      onSearch={handleSearch}
      onChange={handleChange}
      options={options}
      selected={selected}
      

      id={(id ? id : 'X') + '-location-search'}
      isInvalid={invalid}
      disabled={isSubmitting || searchLoading}
      clearButton
      placeholder="Where should we look?"
      size="lg"
    />
  )
} 

// const InputLabel = ({ icon: Icon, label }) => {
//   return <Row className="mb-1 align-items-center">
//     <Col xs={"auto"} className="pr-0 d-flex">
//       <Icon className="fs-11" />
//     </Col>
//     <Col className="pl-1">
//       <Form.Label className="mb-0 text-uppercase fs-08 fw-600">{label}</Form.Label>
//     </Col>
//   </Row>
// }
export { SearchController }

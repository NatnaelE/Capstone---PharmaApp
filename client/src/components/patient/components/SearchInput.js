import React, { useState, useEffect } from 'react'
import { useSearch } from '../../../hooks/useSearch'
// import { usePosition } from '../../../hooks/usePosition'

import { useForm, useController, useWatch, Controller } from 'react-hook-form'
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead'
import usePlacesAutocomplete from "use-places-autocomplete";

// Icons
import { LocalPharmacy, LocationOn, Search } from '@material-ui/icons';

// Autocomplete data
import medData from '../../../constants/medData.json'
// import { initialize } from 'parse'


const SearchController = ({ id, labelKey, useLocation, cloudFunction }) => {
  const { loading, params } = useSearch()
  // console.log(params)
  // console.log(params ? params.med : 'no value found')
  const { handleSubmit, control, formState: { errors, isSubmitting }, clearErrors, setValue, getValues } = useForm({
    defaultValues: {
      medication: [],
      location: []
    }
  });

  // console.log(getValues())
  // console.log(getValues())

  const [validated, setValidated] = useState(false)
  const [options, setOptions] = useState([])

  // Load local med data
  useEffect(() => {
    // setValue("medication", [params.med])
    const parsed = medData.map(d => {
      return d[labelKey]
    }).filter(d => {
      return typeof d === "string"
    })

    setOptions([...new Set(parsed)])
  }, [])

  useEffect(() => {
    if (params) {
      setValue("medication", [params.med])
      useLocation && setValue("location", [{location: params.loc}])
    } else {
      setValue("medication", [])
      useLocation && setValue("location", [])
    }
  }, [params])

  const onSubmit = async (data, e) => {
    e.preventDefault()
    console.log("SearchInput: submit fired")
    console.log(data)

    if (useLocation) {
      const { medication, location } = data
      await cloudFunction(medication, location[0].location)
    } else {
      // call other search function
    }
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
      <Form.Group as={Col} xs={useLocation && 8} className="mb-0">
      {/* <InputLabel icon={LocalPharmacy} label={useLocation ? 'Find Medications' : 'Search Medications'} /> */}
      <div onClick={() => clearErrors("medication")}>
        <Controller
          name="medication"
          // defaultValue={params ? [params.med] : []}
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

              id={(id ? id : 'X') + '-medication-search'}
              labelKey={"label"}
              options={options}
              // defaultSelected={params ? [params.med] : []}
              selected={getValues("medication")}

              isInvalid={invalid}
              disabled={isSubmitting || loading}
              clearButton
              allowNew
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
        <Form.Group as={Col} className="mb-0">
          {/* <InputLabel icon={LocationOn} label="Near" /> */}
          <div onClick={() => clearErrors("location")}>
            <LocationInput 
              name="location" 
              control={control} 
              id={id} 
              initial={params ? [{location: params.loc}] : []}
              getValues={getValues}
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

const LocationInput = ({ name, control, id, searchLoading, initial, getValues, ...rest }) => {
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

  const [isLoading, setIsLoading] = useState(loading)
  const [options, setOptions] = useState([])
  // const [selected, setSelected] = useState(initial)

  const selected = useWatch({
    control,
    name: 'location',
    // defaultValue: 'default' // default value before the render
  });

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

  // Pass typed value from Typeahead to usePlacesAutocomplete
  const handleSearch = query => {
    console.log(query)
    setIsLoading(true)
    setValue(query)
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

  // useEffect(() => {
  //   // console.log(initial)
  //   // initial && setValue(initial)
  //   console.log(selected)
  //   console.log(initial)
  // }, [])

  // Syncs UPA responses with Typeahead options
  useEffect(() => {
    setOptions(data.map(d => ({
      location: d.description
    })))
    setIsLoading(false)
  }, [data, setOptions])

  // // Log usePlacesAutocomplete status
  // useEffect(() => {
  //   console.log("usePlacesAutocomplete Reponse Status: " + status)
  // }, [status])

  // Log usePlacesAutocomplete value
  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <AsyncTypeahead
      {...inputProps}
      {...fieldState}
      {...renderProps}
      {...rest}
      
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

// const locationOptions = [
//   'My Current Location'
// ]
export { SearchController }

import React, { useState, useEffect } from 'react'
import { useSearch } from '../../../hooks/useSearch'
import { useForm, useController, useWatch } from 'react-hook-form'

import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead'
import { Button, Col, Form, InputGroup } from 'react-bootstrap'

// Icons
import { LocalPharmacy, Search } from '@material-ui/icons'

// Autocomplete data
import medData from '../../../constants/medData.json'


const InvSearchController = ({ id, labelKey, cloudFunction }) => {

  // Init React Hook Form
  const { handleSubmit, control, formState: { errors, isSubmitting }, clearErrors, setValue } = useForm({
    defaultValues: {
      medication: []
    }
  });

  // Control validation state
  const [validated, setValidated] = useState(false)

  // Control validation state on error change
  useEffect(() => {
    errors ? setValidated(false) : setValidated(true)
  }, [errors, setValidated])

  // Handle form submit
  const onSubmit = async (data, e) => {
    e.preventDefault()
    console.log("InventorySearch: submit fired")
    console.log(data)
    await cloudFunction(data)
  }

  return (    
    <Form validated={validated} onSubmit={handleSubmit(onSubmit)}>
      <Form.Row className="align-items-center">
        <Form.Group as={Col} className="mb-0">
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
        
        <Form.Group as={Col} xs={"auto"} className="mb-0 d-flex align-items-end">
          <Button variant="green" size="lg" id="search-button"
            className="p-3"
            style={{borderRadius: '45px'}}
            type="submit"
            disabled={isSubmitting}><Search /></Button>
        </Form.Group>
      </Form.Row>
    </Form>
  )
}


const MedicationInput = ({ name, control, labelKey, id }) => {
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
      disabled={isSubmitting}

      clearButton
      allowNew
      placeholder="Search inventory for medication"
      size="lg"
    />
  )
}
export { InvSearchController }

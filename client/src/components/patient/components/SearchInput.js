import React, { useState, useEffect } from 'react'
import { usePosition } from '../../../hooks/usePosition'

import { useForm } from 'react-hook-form'
import { Jumbotron, Row, Col, Form, Button } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

// Icons
import { LocalPharmacy, LocationOn, Search } from '@material-ui/icons';

const SearchInput = ({ label, styleID }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log(errors)
  // const onSubmit = data => console.log(data);
  let position = usePosition()
  // console.log(position.latitude)
  // console.log(position.longitude)

  const options = optionsStr.split("\n").map(d => d.trim())
  // console.log(options)
  const [selections, setSelections] = useState([])
  const [location, setLocation] = useState([])
  const [validated, setValidated] = useState(true)
  const [showVal, setShowVal] = useState(false)
  const [touched, setTouched] = useState(false)

  const onSubmit = e => {
    e.preventDefault()
    // setShowVal(true)
    validate()
    console.log(selections)
    console.log(location)
    console.log(validated)
    console.log(touched)
  }

  const validate = () => {
    console.log('validate')
    if (!touched) {
      console.log("not touched, no change")
      return
    }
    
    if (selections.length === 0) {
      console.log("Show error")
      setValidated(false)
      setShowVal(true)
    } else {
      setValidated(true)
      setShowVal(false)
    }
  }

  useEffect(() => {
    validate()
  }, [selections, validate])

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     console.log("Geolocation available!");

  //     navigator.permissions
  //       .query({ name: "geolocation" })
  //       .then((result) => {
  //         if (result.state === "granted") {
  //           console.log(result.state);
  //           //If granted then you can directly call your function here
  //         } else if (result.state === "prompt") {
  //           console.log(result.state);
  //         } else if (result.state === "denied") {
  //           //If denied then you have to show instructions to enable location
  //         }
  //         result.onchange = () => {
  //           console.log(result.state);
  //         };
  //       });
  //   } else {
  //     console.log("Unable to get geolocation");
  //   }
  // }, [])

  let props = showVal ? {validated: validated} : null

  return (
    <Jumbotron className="pt-3 pb-4">
    <Form noValidate {...props} onSubmit={handleSubmit(onSubmit)}>
      <Form.Row>
      <Form.Group as={Col} xs={8} controlId="medication">
      {/* <Form.Label><LocalPharmacy />{label ? label : 'Search Now'}</Form.Label> */}
      <InputLabel icon={LocalPharmacy} label="Search Now" />
      <Typeahead
          id={styleID ? styleID : 'search'}
          labelKey="medication"
          multiple
          onChange={setSelections}
          options={options}
          placeholder="What medication do you need?"
          selected={selections}
          isInvalid={!validated}
          {...register("medication", {required: true})}
        />
        <Form.Control.Feedback type="invalid" tooltip className={`${validated ? "" : "d-block"}`}>
          Please enter a medication</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} controlId="location">
        <InputLabel icon={LocationOn} label="Location" />
        <Typeahead
            id={styleID ? styleID : 'search2'}
            labelKey="location"
            onChange={setLocation}
            options={locationOptions}
            placeholder="Search near..."
            selected={location}
            isValid={false}
            {...register("location", {required: true})}
          />
        {/* <Form.Control.Feedback type="invalid" className={`${validated ? "" : "d-block"}`}>
          Please enter a medication</Form.Control.Feedback> */}
      </Form.Group>

      <Form.Group as={Col} xs={"auto"} className="d-flex align-items-end">
        <Button type="submit" variant="green"><Search /></Button>
      </Form.Group>
      </Form.Row>
    </Form>
    </Jumbotron>
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
  'Search nearby'
]

const optionsStr =
  `Acetaminophen
  Adderall
  Amitriptyline
  Amlodipine
  Amoxicillin
  Ativan
  Atorvastatin
  Azithromycin
  Benzonatate
  Brilinta
  Bunavail
  Buprenorphine
  Cephalexin
  Ciprofloxacin
  Citalopram
  Clindamycin
  Clonazepam
  Cyclobenzaprine
  Cymbalta
  Doxycycline
  Dupixent
  Entresto
  Entyvio
  Farxiga
  Fentanyl
  Fentanyl Patch
  Gabapentin
  Gilenya
  Humira
  Hydrochlorothiazide
  Hydroxychloroquine
  Ibuprofen
  Imbruvica
  Invokana
  Januvia
  Jardiance
  Kevzara
  Lexapro
  Lisinopril
  Lofexidine
  Loratadine
  Lyrica
  Melatonin
  Meloxicam
  Metformin
  Methadone
  Methotrexate
  Metoprolol
  Naloxone
  Naltrexone
  Naproxen
  Omeprazole
  Onpattro
  Otezla
  Ozempic
  Pantoprazole
  Prednisone
  Probuphine
  Rybelsus
  Sublocade
  Tramadol
  Trazodone
  Viagra
  Wellbutrin
  Xanax
  Zubsolv`

export { SearchInput }

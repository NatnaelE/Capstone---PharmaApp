import React from 'react'
import { Container, Button } from 'react-bootstrap'
import Parse from 'parse';

//// Edit these fields ////
const FUNCTION_NAME = 'getByBrandNameExact'
const PARAMS = {
  brandName: 'Advil'
}


// Runs the function
function testCloudFunction() {
  // Return if empty to avoid crashes
  if (!FUNCTION_NAME) return

  // Run function and console log results
  Parse.Cloud.run(FUNCTION_NAME, PARAMS)
    .then(console.log)
    .catch(console.error)
}

// Component to display button
const TestCloud = () => {
  return <Container fluid className="vh-100 mt-5 pt-5">
    <h5>Test Cloud Functions</h5>
    <p className="fs-11 mb-1">Set the function name and params in src/dev/TestCloud.js</p>
    <p className="fs-11">Check the console for results</p>
    <Button onClick={testCloudFunction}>Run Function</Button>
  </Container>
}

export default TestCloud
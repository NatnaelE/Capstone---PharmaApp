import React, { useState, useContext, createContext, useEffect } from 'react' 
import queryString from 'query-string'
import { useHistory } from 'react-router-dom'
import { getGeocode, getLatLng } from "use-places-autocomplete";

import { routes } from '../constants/routes'
import medData from '../constants/medData.json'

// Search context
const searchContext = createContext();

// Provider component that wraps app
export function SearchProvider({ children }) {
  const search = useProvideSearch();
  return <searchContext.Provider value={search}>{children}</searchContext.Provider>;
}

// Hook for child components
export const useSearch = () => {
  return useContext(searchContext);
}

// Hook for provider to initialize and handle search state
function useProvideSearch() {
  // Search state
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState()
  const [results, setResults] = useState()

  let history = useHistory()

  // Navigates to the client search page with given query params
  const search = async (med, loc) => {
    setLoading(true)  // enter loading state
    const qs = queryString.stringify({med, loc})  // create query params
    history.push(routes.search + '?' + qs)        // navigate to /search
  }

  // Loads params from given query
  const loadParamsFromQuery = async (query) => {
    setLoading(true)
    let params = queryString.parse(query, { parseNumbers: true })
    // console.log(params)

    const { med, loc } = params
    if (!med || !loc) {
      setParams(null)
      setLoading(false)
      return false
    }

    setParams({ med, loc }) // save params for display
    console.log(params)
    console.log("Params loaded!")
    return true
  }

  // Load results from params
  // Called on param change
  const loadResults = async () => {
    
    // Fetch lat and lng
    const { lat, lng } = await getGeocode({ address: params.loc })
    .then(results => getLatLng(results[0]))
    .then(resp => {
      const { lat, lng } = resp
      return { lat, lng }
    })
    .catch(console.error)

    // Fetch results

    //// EMULATE ENDPOINT CALL ////
      await sleep(1000)
      const medType = medData.filter(d => {
        return d["BrandName"] === params.med
      })[0]
      const resp = { count: randInt(5, 21), medType, loc: { lat, lng } }
      resp['rows'] = [...Array(resp.count).keys()].map(d => ({ id: d, quant: randInt(50, 1000) }))
    //// END EMULATE ////

    setResults(resp)  // set results
    setLoading(false) // stop loading

    console.log("Results loaded!")
  }

  // Calls loadResults on param change
  useEffect(() => {
    if (params && params.loc) {
      console.log("New params detected")
      loadResults()
    } else {
      console.log("No params detected")
    }
    // console.log(params)
    // setLoading(false)
  }, [params])

  return { loading, setLoading, params, results, search, loadParamsFromQuery }
}

// Local Emulation Helpers
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const randInt = (min, max) => {
  const r = Math.random()*(max-min) + min
  return Math.floor(r)
}
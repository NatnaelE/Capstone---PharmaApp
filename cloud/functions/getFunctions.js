// Get drug by exact BrandName
Parse.Cloud.define("getByBrandNameExact", async(request) => {
  // Get attributes passed from params
  const brandName = request.params.brandName;

  // Error handling
  if (!brandName) {
    throw new Error("Must provide brand name")
  }

  // Create new query
  const query = new Parse.Query("DrugsRef_Test");
  
  // Set constraints on query
  query.equalTo('BrandName', brandName);                            // Find all with requested brandName
  query.select('BrandName', 'GenericName', 'Dosage', 'DosageForm')  // Select only these columns 

  // Find all that match constraints
  const resp = query.find()
    .then(results => {
      // Successful, return result attributes (the selected columns)
      return results.map(d => d.attributes)
    }).catch(err => {
      // Throw error if there is one
      throw new Error(err.message)
    })

  const resp = await query.find()
  return resp
});


// Get drug by BrandName using text search
Parse.Cloud.define("getByBrandNameSearch", async(request) => {
  // Get attributes passed from params
  const brandName = request.params.brandName;

  // Error handling
  if (!brandName) {
    throw new Error("Must provide brand name")
  }

  // Create new query
  const query = new Parse.Query("DrugsRef_Test");
  
  // Set constraints on query
  query.fullText('BrandName', brandName);                            // Find all with requested brandName
  query.ascending('$score')
  query.select('DIN', 'BrandName', 'GenericName', 'Dosage', 'DosageForm', '$score')  // Select only these columns 

  // Find all that match constraints
  const resp = query.find()
    .then(results => {
      // Successful, return result attributes (the selected columns)
      return results.map(d => d.attributes)
    }).catch(err => {
      // Throw error if there is one
      throw new Error(err.message)
    })
  
  return resp
});



//// Gets by brand name serach and location
Parse.Cloud.define("getByBrandNameAndLocation", async(request) => {
  // Get attributes passed from params
  const { brandName, location, radius } = request.params;

  // Error handling
  if (!brandName) {
    throw new Error("Must provide brand name")
  } else if (!location) {
    throw new Error("Must provide location")
  }

  // Get array of requested meds that match search term
  const requestedMeds = await Parse.Cloud.run('getByBrandNameSearch', {brandName: brandName})
  // Get the DINs of all matching
  const objectIDs = requestedMeds.map(d => d.DIN)

  // Now query pharmacies
  const query = new Parse.Query("Pharmacies");
  
  // Constraints
  query.near("Location", location)    // Get all pharmacies near location
  query.withinMiles()    // Optional: limit pharmacies to radius
  query.equalTo("InventoryArray", ...DINS)    // Get only pharmacies with requested DINs
      // Of pharmacies with, filter inventory to req DINs
  
  // Run query
  const resp = query.find()
    .then(results => {
      // Parse results
        // Map to:
          // OPTION 1: pharmacy => meds
          // [
          //   {
          //     pharmacyID
          //     pharmacyName
          //     pharmacyAddress 
          //     ...
          //     matchingMeds: [{ DIN, qty }, ... ]
          //   },
          //   ...
          // ]
          //
          // OPTION 2: meds => pharmacies
          // [
          //   {
          //     medication,
          //     ...
          //     pharmaciesWithStock: [...]
          //   },
          //   ...
          // ]

    }).catch(err => {
      throw new Error(err.message)
    })
  
  return resp
});
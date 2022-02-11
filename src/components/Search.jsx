import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress } from 'react-google-places-autocomplete';

// const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter + '&key=' + YOUR_API_KEY

function Search({ getNewSelectedLocation }) {
    const [value, setValue] = useState(null);

    const getAddress = (address) => {
        const { label } = address;
        setValue(label)
        geoCode(label)
    }

    const geoCode = (formatted_address) => {
        geocodeByAddress(formatted_address)
            .then(results => getNewSelectedLocation(results[0]))
            .catch(error => console.log(error))
    }

    return (
        <div>
            <GooglePlacesAutocomplete
                apiKey="AIzaSyA_5trgMD0NkC7WKAX9Sr0HAJFGwuvgx7M"
                selectProps={{ onChange: (address) => getAddress(address) }}
            />
            <h1>{value}</h1>
        </div>
    )
}

export default Search

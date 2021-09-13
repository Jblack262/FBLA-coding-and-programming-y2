import React from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

import {IoCloseSharp} from 'react-icons/io5'

function PlacesInput({onSelectLocation, clearLocation}) {
    const [dumbAddress, setDumbAddress] = React.useState('');
    const [address, setAddress] = React.useState('');

    const handleChange = (address) => {
        setAddress(address)
    }



    const clearSearch = () => {
        setAddress('');
        clearLocation();
    }

    const test = (e, suggestions) => {
        if (e.key === "Enter" && suggestions[0]) {
            setAddress(suggestions[0].description);
            // console.log(suggestions)
        }
    }
    const handleSelect = (address ) => {
        setDumbAddress(address)
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => onSelectLocation(latLng, address))
          .catch(error => console.error('Error', error));
    }
    return (
        <PlacesAutocomplete onChange={handleChange} value={dumbAddress} onSelect={handleSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                
                <div className="Search">
                    <div className="input" onKeyDown={(e)=>{test(e, suggestions)}}>
                        <input {...getInputProps({ placeholder: 'Search Places ...', className: 'location-search-input', })} />
                        <button onClick={clearSearch}><IoCloseSharp/></button>
                    </div>
                    <div className="suggestionsContainer">

                        {loading && <div>Loading...</div>}

                        {suggestions.map((suggestion, index) => {
                            return (
                                <div key={index} {...getSuggestionItemProps(suggestion)} className="suggestion-item">
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    )
}

export default PlacesInput

import React from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

import {IoCloseSharp} from 'react-icons/io5'

function PlacesInput(/*{ onSelectLocation, clearLocation,  newTitle}*/) {
    const [address, setAddress] = React.useState('');
    const [suggestions, setSuggestions] = React.useState('');

    const handleChange = (address) => {
        setAddress(address)
    }

    const clearSearch = () => {
        setAddress('');
        // clearLocation();
    }
    
    const handleSelect = (address) => {
        console.log(suggestions);
        // newTitle(firstSuggestion);
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
        //   .then(latLng => console.log(latLng, address))
          .catch(error => console.error('Error', error));
    }
    return (
        
    <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
            console.log(suggestions);
            // if (address === '' ) setSuggestions(suggestions)
            return (
                <div className="Search">
                    <div className="input">
                        <input {...getInputProps({ placeholder: 'Search Places ...', className: 'location-search-input', })} />
                        <button onClick={clearSearch}><IoCloseSharp/></button>
                    </div>
                    <div className="suggestionsContainer">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const {placeId, description} = suggestion;
                            return (
                                <div key={placeId} className="suggestion-item" {...getSuggestionItemProps(suggestion)} >
                                    <span>{description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )
        }}
    </PlacesAutocomplete>
    )
}

export default PlacesInput

import React from 'react'
import {GoogleMap} from '@react-google-maps/api';
import { geocodeByPlaceId } from 'react-places-autocomplete'

function Map({location, keepLocation, zoom, onSetAddress}) {
    const mapContainerStyle = {
        width: '100%',
        height: '100%',
    }
    const options = {
        disableDefaultUI: true,
    }

    const saveLocation = () => {
        keepLocation();
    }
    const getAddress = (event) => {
        const {placeId} = event;
        geocodeByPlaceId(placeId)
            .then(results => {
                const {formatted_address} = results[0];
                console.log(results)
                onSetAddress(formatted_address);
            })
            .catch(error => console.error('Error', error));
    }
    return (
        <div className="mapContainer">
            <GoogleMap onClick={(event)=>{getAddress(event)}} mapContainerStyle={mapContainerStyle} zoom={zoom} center={location} options={options}></GoogleMap>
            <button className="btn" onClick={saveLocation}>Save this place!</button>
        </div>
    )
}

export default Map

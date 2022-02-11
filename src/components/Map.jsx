import React, { useState } from 'react'
// import GoogleMapReact from 'google-map-react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
    width: "800px",
    height: "400px",
};

function Map({ center }) {

    const getClickCoords = (event) => {
        const { latLng } = event;
        console.log(latLng);
    }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                onClick={(e) => { getClickCoords(e) }}
            />
        </div>
    )
}

export default Map

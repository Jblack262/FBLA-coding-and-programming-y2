import React from 'react'

function SavedLocations({locations}) {
    return (
        <div>
            <ol>
                {locations.map((location, index) => {
                    return (
                        <li key={index}>{location}</li>
                    )
                })}
            </ol>
        </div>
    )
}

export default SavedLocations

import React from 'react';
import LocationSearchInput from './components/PlacesInput'
import Map from './components/Map'
import SavedLocations from './components/SavedLocations'

function App() {
	const [location, setLocation] = React.useState({lat: 33.6362399, lng: -112.1344286})
	const [address, setAddress] = React.useState('')
	const [savedLocations, setSavedLocations] = React.useState([]);
	const [zoom, setZoom] = React.useState(2);

	const onSelectLocation = (location, address) => {
		setAddress(address);
		setLocation(location);

		const addressLength = address.split(",").length;
		(addressLength >= 1 && addressLength <= 3) ? setZoom(addressLength + 3) : setZoom(15)//sets zoom based on number of elements in address
	}

	const onSetAddress = (address)

	const keepLocation = () => {
		if (address !== '' && !([...savedLocations].includes(address))) setSavedLocations([...savedLocations, address]); //filters out empty searches and duplicate searches
	}

	const clearLocation = () => {
		setAddress('');
		setZoom(2);
	}

  return (
    <div className="App">
		<LocationSearchInput clearLocation={clearLocation} onSelectLocation={onSelectLocation}/>
		<h1>{address}</h1>
		<div className="container">
			<Map zoom={zoom} location={location} onSelectLocation={onSelectLocation} keepLocation={keepLocation}/>
			<SavedLocations locations={savedLocations}/>
		</div>
    </div>
  );
}

export default App;

import LocationSearchInput from './components/PlacesInput'
import Header from './components/Header';
// import Map from './components/Map'
// import SavedLocations from './components/SavedLocations'
import React, { useState } from 'react';
import Search from './components/Search'
import Map from './components/Map'

const defaultCenter = {
	lat: 43.653225,
	lng: -79.383186,
}

function App() {
	const [center, setCenter] = useState(defaultCenter)
	const [selectedLocation, setSelectedLocation] = useState(null);

	const getNewSelectedLocation = (location) => {
		console.log(location)
		const { geometry } = location;
		console.log(geometry.location.lat)
		setSelectedLocation(location);
		// setCenter({ lng, lat })
	}

  return (
	<div className="App">
		<Header></Header>
		<p id='searchDescription'>Search for various attractions, either by name or using the filters below</p>
			<LocationSearchInput newTitle={newTitle} /* clearLocation={clearLocation} onSelectLocation={onSelectLocation} *//>
			<h1>{title}</h1>
			{/* <div className="container">
				<Map zoom={zoom} location={location} onSelectLocation={onSelectLocation} keepLocation={keepLocation}/>
				<SavedLocations locations={savedLocations}/>
			</div> */}
		<div id="filters">
			<h1>Filters</h1>
			<ul>
				<li><p>Filter 1</p></li>
				<li><p>Filter 2</p></li>
				<li><p>Filter 3</p></li>
				<li><p>Filter 4</p></li>
				<li><p>Filter 5</p></li>
			</ul>
		</div>
		<button>Search</button>
    </div>
  );
	// return (
	// 	<div className="App">
	// 		<Search getNewSelectedLocation={getNewSelectedLocation} />
	// 		<Map center={center} />
	// 	</div>
	// );
}

export default App;

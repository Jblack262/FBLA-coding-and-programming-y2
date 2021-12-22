import React from 'react';
import LocationSearchInput from './components/PlacesInput'
import Header from './components/Header';
// import Map from './components/Map'
// import SavedLocations from './components/SavedLocations'

function App() {
	// const [location, setLocation] = React.useState({lat: 33.6362399, lng: -112.1344286})
	// const [address, setAddress] = React.useState('')
	const [title, setTitle] = React.useState('')
	// const [savedLocations, setSavedLocations] = React.useState([]);
	// const [zoom, setZoom] = React.useState(2);

	// const onSelectLocation = (location, address) => {
	// 	setAddress(address);
	// 	setLocation(location);

	// 	const addressLength = address.split(",").length;
	// 	(addressLength >= 1 && addressLength <= 3) ? setZoom(addressLength + 3) : setZoom(15)//sets zoom based on number of elements in address
	// }

	// const keepLocation = () => {
	// 	console.log(location);
	// 	if (address !== '' && !([...savedLocations].includes(address))) setSavedLocations([...savedLocations, address]); //filters out empty searches and duplicate searches
	// }

	// const clearLocation = () => {
	// 	setAddress('');
	// 	setZoom(2);
	// }

	const newTitle = (title) => {
		console.log(title)
		setTitle(title);
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
}

export default App;

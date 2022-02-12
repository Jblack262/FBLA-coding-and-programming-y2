let map;
let places;
let infoWindow;
let markers = [];
let autocomplete;
let savedPlaces = [];
const countryRestrict = { country: "us" };
const MARKER_PATH =
  "https://developers.google.com/maps/documentation/javascript/images/marker_green";
const hostnameRegexp = new RegExp("^https?://.+?/");
const countries = {
  au: {
    center: { lat: -25.3, lng: 133.8 },
    zoom: 4,
  },
  br: {
    center: { lat: -14.2, lng: -51.9 },
    zoom: 3,
  },
  ca: {
    center: { lat: 62, lng: -110.0 },
    zoom: 3,
  },
  fr: {
    center: { lat: 46.2, lng: 2.2 },
    zoom: 5,
  },
  de: {
    center: { lat: 51.2, lng: 10.4 },
    zoom: 5,
  },
  mx: {
    center: { lat: 23.6, lng: -102.5 },
    zoom: 4,
  },
  nz: {
    center: { lat: -40.9, lng: 174.9 },
    zoom: 5,
  },
  it: {
    center: { lat: 41.9, lng: 12.6 },
    zoom: 5,
  },
  za: {
    center: { lat: -30.6, lng: 22.9 },
    zoom: 5,
  },
  es: {
    center: { lat: 40.5, lng: -3.7 },
    zoom: 5,
  },
  pt: {
    center: { lat: 39.4, lng: -8.2 },
    zoom: 6,
  },
  us: {
    center: { lat: 37.1, lng: -95.7 },
    zoom: 3,
  },
  uk: {
    center: { lat: 54.8, lng: -4.6 },
    zoom: 5,
  },
};
const searchBtnDOM = document.querySelector('.search');
const filterTypes = [
  "lodging",
  "campground",

  "tourist_attraction",
  "amusement_park",
  "aquarium",
  "zoo",
  "art_gallery",
  "restaurant",
  "cafe",
  "stadium",
  "museum",
  "shopping_mall",
  "movie_theater",
  "spa",

  "airport",
  "subway_station",
  "parking",
  "taxi_stand",
];


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: countries["us"].zoom,
    center: countries["us"].center,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false,
  });
  infoWindow = new google.maps.InfoWindow({
    content: document.getElementById("info-content"),
  });
  // Create the autocomplete object and associate it with the UI input control.
  // Restrict the search to the default country, and to place type "cities".
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    {
      types: ["(cities)"],
      componentRestrictions: countryRestrict,
      fields: ["geometry"],
    }
  );
  places = new google.maps.places.PlacesService(map);
  autocomplete.addListener("place_changed", onPlaceChanged);
  // Add a DOM event listener to react when the user selects a country.
  document.getElementById("country").addEventListener("change", setAutocompleteCountry);
  //calls the function to fill out all the filter options
  addFilters();
}

// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
function onPlaceChanged() {
  const place = autocomplete.getPlace();

  if (place.geometry && place.geometry.location) {
    map.panTo(place.geometry.location);
    map.setZoom(12);
    // search();
  } else {
    document.getElementById("autocomplete").placeholder = "Enter a city";
  }
}

const getActiveFilters = () => {
  return filterTypes.filter(filter => {
    return document.getElementById(filter).checked
  })
}
// Search for hotels in the selected city, within the viewport of the map.
function search() {
  console.log(getActiveFilters())
  if (getActiveFilters().length < 1) {
    alert('must select at least one filter')
  } else {
    const search = {
      bounds: map.getBounds(),
      types: getActiveFilters(),
    };

    places.nearbySearch(search, (results, status, pagination) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        clearResults();
        clearMarkers();

        // Create a marker for each hotel found, and
        // assign a letter of the alphabetic to each marker icon.
        for (let i = 0; i < results.length; i++) {
          const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
          const markerIcon = MARKER_PATH + markerLetter + ".png";

          // Use marker animation to drop the icons incrementally on the map.
          markers[i] = new google.maps.Marker({
            position: results[i].geometry.location,
            animation: google.maps.Animation.DROP,
            icon: markerIcon,
          });
          // If the user clicks a hotel marker, show the details of that hotel
          // in an info window.
          markers[i].placeResult = results[i];
          // google.maps.event.addListener(markers[i], "click", showInfoWindow);
          setTimeout(dropMarker(i), i * 100);
          // addResult(results[i], i);
          // console.log(results)
          addResults(results)
        }
      }
    });
  }
}

const addResults = (results) => {
  const resultsContainerDOM = document.querySelector('.results');
  const resultsHTML = results.map((result) => {
    const {name, icon, place_id, rating} = result;
    const pos = JSON.stringify(result.geometry.location);
    const {lat, lng} = JSON.parse(pos)
    
    const markerLetter = String.fromCharCode("A".charCodeAt(0) + (results.indexOf(result) % 26));
    return `
      <div class="place" onClick="setCenter('${lat}', '${lng}')">
        <h2>${markerLetter}:</h2>
        <img src="${icon}" alt="${name}">
        <h3><a href="https://www.google.com/maps/place/?q=place_id:${place_id}" target="_blank">${name}</a></h3>
        ${rating ? `<p>Rating: ${rating}</p>` : ''}
        <button onclick="savePlace('${name}', '${place_id}')" ${!rating ? 'style="margin-left: auto"' : ''}>Save</button>
      </div>
    `
  }).join('');
  resultsContainerDOM.innerHTML = resultsHTML;
}

const setCenter = (lat, lng) => {
  map.setCenter(new google.maps.LatLng(lat, lng));
  map.setZoom(19)
}

const savePlace = (placeName, place_id) => {
  const place = {
    name: placeName,
    place_id: place_id
  }
  
  savedPlaces.push(place);
  //Removes all duplicate places from savedPlaces array
  savedPlaces = Array.from(new Set(savedPlaces.map(a => a.place_id)))
  .map(id => {
    return savedPlaces.find(a => a.place_id === id)
  })
  showSavedPlaces();
}

const deletePlace = (place_id) => {
  savedPlaces = savedPlaces.filter(place => place.place_id !== place_id)
  showSavedPlaces();

  // console.log(savedPlaces.indexOf(place_id))
}

// Set the country restriction based on user input.
// Also center and zoom the map on the given country.
function setAutocompleteCountry() {
  const country = document.getElementById("country").value;

  if (country == "all") {
    autocomplete.setComponentRestrictions({ country: [] });
    map.setCenter({ lat: 15, lng: 0 });
    map.setZoom(2);
  } else {
    autocomplete.setComponentRestrictions({ country: country });
    map.setCenter(countries[country].center);
    map.setZoom(countries[country].zoom);
  }

  clearResults();
  clearMarkers();
}

function dropMarker(i) {
  return function () {
    markers[i].setMap(map);
  };
}

const addFilters = () => {
  const filterContainerDOM = document.getElementById('filters');
  const filtersHTML = filterTypes.map(filter => {
    return `
    <div class='filter'>
      <label for="${filter}">${filter.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</label>
      <input type="checkbox" name="${filter}" id="${filter}">
    </div>
    `
  }).join('')
  filterContainerDOM.innerHTML = filtersHTML;
}

const showSavedPlaces = () => {
  const savedPlacesContainerDOM = document.querySelector('.savedContainer')

  // console.log(savedPlaces)
  const savedPlacesHTML = savedPlaces.map(place => {
    const {name, place_id} = place;
    return `
      <div class="savedPlace">
        <p>${name}</p>
        <a href='https://www.google.com/maps/place/?q=place_id:${place_id}' target="_blank"><button>More Info</button></a>
        <button class="close-btn" onClick="deletePlace('${place_id}')"><i class="fa fa-close"></i></button>
      </div>
    `
  }).join('')

  savedPlacesContainerDOM.innerHTML = savedPlacesHTML;
}

function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].setMap(null);
    }
  }

  markers = [];
}

function clearResults() {
  const results = document.querySelector(".results");

  while (results.childNodes[0]) {
    results.removeChild(results.childNodes[0]);
  }
}
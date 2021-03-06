let map;
let places;
let infoWindow;
let markers = [];
let circle;
let autocomplete;
let savedPlaces = [];
let currentCity = { lat: 40.7128, lng: -74.0060 };
const MARKER_PATH = "https://developers.google.com/maps/documentation/javascript/images/marker_green";
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
  {name: "blank", isFeatured: true},
  {name: "lodging", isFeatured: false},
  {name: "campground", isFeatured: false},

  {name: "tourist_attraction", isFeatured: false},
  {name: "amusement_park", isFeatured: false},
  {name: "aquarium", isFeatured: false},
  {name: "zoo", isFeatured: false},
  {name: "art_gallery", isFeatured: false},
  {name: "restaurant", isFeatured: false},
  {name: "cafe", isFeatured: false},
  {name: "stadium", isFeatured: false},
  {name: "museum", isFeatured: false},
  {name: "shopping_mall", isFeatured: false},
  {name: "movie_theater", isFeatured: false},

  {name: "airport", isFeatured: false},
  {name: "subway_station", isFeatured: false},
  {name: "parking", isFeatured: false},
  {name: "taxi_stand", isFeatured: false},
];


async function initMap() {
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
      fields: ["geometry"],
    }
  );
  places = new google.maps.places.PlacesService(map);
  autocomplete.addListener("place_changed", onPlaceChanged);
  // Add a DOM event listener to react when the user selects a country.
  document.getElementById("country").addEventListener("change", setAutocompleteCountry);
  //calls the function to fill out all the filter options
  await addFilters();
}

// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
function onPlaceChanged() {
  const place = autocomplete.getPlace();

  if (place.geometry && place.geometry.location) {
    currentCity = place.geometry.location;
    map.panTo(currentCity);
    map.setZoom(12);
    // search();
  } else {
    document.getElementById("autocomplete").placeholder = "Enter a city";
  }
}

const getActiveFilters = () => {
  return filterTypes.filter(filter => {
    return document.getElementById(filter.name).checked
  }).map(filter => {
    return filter.name
  })
}
const getCurrKeyword = () => {
  const keywordInput = document.querySelector('#keyword');
  console.log(keywordInput.value)
  return keywordInput.value;
}
// Search for hotels in the selected city, within the viewport of the map.
function search() {
  var bounds = map.getBounds();
  var ne_bounds = bounds.getNorthEast();
  var circle_center = bounds.getCenter();
  var circle_radius = google.maps.geometry.spherical.computeDistanceBetween(circle_center, ne_bounds) / 1.5;

  // const showCircle = new google.maps.Circle({
  //   strokeColor: "#7CA0C0",
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   fillColor: "#7CA0C0",
  //   fillOpacity: 0.35,
  //   map: map,
  //   center: circle_center,
  //   radius: circle_radius
  // });

  var request = {
    location: circle_center,
    radius: circle_radius,
    type: getActiveFilters(),
    keyword: getCurrKeyword()
  };

  const marker = new google.maps.Marker({
    position: new google.maps.LatLng( 95.7129123, 37.0902123),
    animation: google.maps.Animation.DROP,
    icon: "https://developers.google.com/maps/documentation/javascript/images/marker_greenZ.png",
  });

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  console.log('why isnt this working')
  console.log(status)
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    clearResults();
    clearMarkers();
    console.log(results)

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
  } else if (status == "ZERO_RESULTS") {
    // alert('no results found, try a different search')
    showModal('No Results Found, try a different search', null, null)
  }
}
const setCenter = (lat, lng) => {
  map.setCenter(new google.maps.LatLng(lat, lng));
  map.setZoom(19)
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
function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].setMap(null);
    }
  }

  markers = [];
}
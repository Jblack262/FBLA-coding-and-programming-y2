const addResults = (results) => {
  const resultsContainerDOM = document.querySelector('.results');
  const resultsHTML = results.map((result) => {
    const {name, icon, place_id, rating} = result;
    const pos = JSON.stringify(result.geometry.location);
    const {lat, lng} = JSON.parse(pos)
    const place = {name: name.split('').filter(letter => letter != "'").join(''), place_id: place_id}
    // console.log(JSON.stringify(place))

    const markerLetter = String.fromCharCode("A".charCodeAt(0) + (results.indexOf(result) % 26));
    return `
      <div class="place" onClick="setCenter('${lat}', '${lng}')">
        <h2>${markerLetter}:</h2>
        <img src="${icon}" alt="${name}">
        <h3><a href="https://www.google.com/maps/place/?q=place_id:${place_id}" target="_blank">${name}</a></h3>
        ${rating ? `<p>Rating: ${rating}</p>` : ''}
        <button onclick='savePlace("${name.split('').filter(letter => letter != "'").join('')}", "${place_id}")' ${!rating ? 'style="margin-left: auto"' : ''}>Save</button>
      </div>
    `
  }).join('');
  resultsContainerDOM.innerHTML = resultsHTML;
}


const savePlace = async (placeName, place_id) => {
  const currUser = await getCurrentUser();
  if (!currUser) {
    // alert('login to save places')
    showModal('Log In to Save Place', 'Login','/login')
    return;
  }
  const place = {
    name: placeName,
    place_id: place_id
  }
  savedPlaces = currUser.saved;
  savedPlaces.push(place);
  console.log(savedPlaces)
  // Removes all duplicate places from savedPlaces array
  savedPlaces = Array.from(new Set(savedPlaces.map(a => a.place_id))).map(id => {
    return savedPlaces.find(a => a.place_id === id)
  })

  currUser.saved = savedPlaces;
  console.log(currUser.saved)


  try {
    const {_id: id} = currUser;
    const updateUser = await axios.patch(`/api/v1/user/${id}`, currUser)
    console.log(updateUser.status)
  } catch (error) {console.error(error)}
  showSavedPlaces();
}

const deletePlace = async (place_id) => {
  const currUser = await getCurrentUser();
  if (!currUser) {
    // alert('login to use this function')
    showModal('Log In to Save Place', 'Login','/login')
    return;
  }


  
  savedPlaces = currUser.saved;
  savedPlaces = savedPlaces.filter(place => place.place_id !== place_id);
  currUser.saved = savedPlaces;

  try {
    const {_id: id} = currUser;
    const updateUser = await axios.patch(`/api/v1/user/${id}`, currUser)
    console.log(updateUser.status)
  } catch (error) {console.error(error)}

  showSavedPlaces();

  // console.log(savedPlaces.indexOf(place_id))
}


const addFilters = () => {
  const filterContainerDOM = document.getElementById('filters');
  const filtersHTML = filterTypes.map(filter => {
    const {name: filterName, isFeatured} = filter;
    // console.log(filterName, isFeatured)
    return `
    <div class='filter'>
      <input type="radio" ${isFeatured ? 'checked' : ''} name="filter" class="filter-radio" id="${filterName}">
      <label for="${filterName}">${filterName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</label>
    </div>
    `
  }).join('')
  filterContainerDOM.innerHTML = filtersHTML;
}

const showSavedPlaces = async () => {
  const currUser = await getCurrentUser();

  const savedPlacesContainerDOM = document.querySelector('.savedContainer');

  if (!currUser) {
    console.log('not logged in')
    savedPlacesContainerDOM.innerHTML = '<p class="warning-text"><a href="/login">log in</a> to see saved places</p>';
    return;
  }

  // console.log(savedPlaces)
  const savedPlacesHTML = currUser.saved.map(place => {
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
showSavedPlaces();



function clearResults() {
  const results = document.querySelector(".results");

  while (results.childNodes[0]) {
    results.removeChild(results.childNodes[0]);
  }
}
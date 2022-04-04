import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
    } from 'react-places-autocomplete';
   
  class LocationSearchInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        address: '',
        lat: 0,
        lon: 0 
      };
    }
   
    handleChange = address => {
      this.setState({ address });
    };

   
    handleSelect = address => {
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          //console.log(latLng.lat, latLng.lng);

          //Clears the input field
          this.setState({address: ''});

          //Lose focus on input field so placeholder will show after selecting a city
          document.getElementById('placesAutocomplete').blur();
          
          localStorage.setItem('lat', latLng.lat);
          localStorage.setItem('lon', latLng.lng);

          this.setState({lat: latLng.lat});
          this.setState({lon: latLng.lng});
    
          //Used props on <LocationSearchInput /> in SearchNav.js return
          this.props.setLatitude(this.state.lat);
          this.props.setLongitude(this.state.lon);

          //Redirect user from Home.js to Today.js after selecting a city. Run this function only if current url is home page
          if(window.location.href === 'http://localhost:3000/' || window.location.href === 'https://weather-star.netlify.app/') {
            this.props.redirect();
          }
        })
        .catch(error => console.error(error));
    };

    render() {

      //I added this bc it's needed to narrow my search options to regions only (cities and zip codes) and only calls the name field, otherwise all fields would be called and billed by Google API
      //Then added it to the <PlacesAutocomplete /> tag. See npm instructions for more details
      const searchOptions = {
        fields: ["name"],
        strictBounds: false,
        types: ["(regions)"]
      }

      return (
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          searchOptions={searchOptions}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className="inputDropdownWrapper">
              <input id="placesAutocomplete"
                {...getInputProps({
                  placeholder: 'Search City or Zip Code',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div className="text-center" style={{color: 'white'}}>Loading...</div>}
                {suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#ffffff', color: "#FF7722", borderBottom: "1px solid #cfd1d4", padding: "0.33rem", cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer', borderBottom: "1px solid #cfd1d4", padding: "0.33rem" };
                  return (
                    <div key={index}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      );
    }
  }

  export default LocationSearchInput;
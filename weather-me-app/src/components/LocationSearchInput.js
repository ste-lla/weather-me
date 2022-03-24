import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
    } from 'react-places-autocomplete';
   
  class LocationSearchInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = { address: '' };
    }
   
    handleChange = address => {
      this.setState({ address });
    };
   
    handleSelect = address => {
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error));
    };
   
    render() {

      //This narrows my search options to regions only (cities and zip codes) and only calls the name field, otherwise all fields would be called and billed by Google API
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
              <input
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
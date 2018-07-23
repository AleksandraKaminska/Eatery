import React, { Component } from 'react';
import { apiKey, baseURL } from './const';
import './App.css';

class App extends Component {
  fetchSearch = (text, location = 'warsaw', latitude, longitude, radius = 1000, categories, locale = 'en_US', sort_by = 'best_match', price = '1, 2, 3, 4', open_now = false) => {
    const url = `${baseURL}businesses/search?term=${text}&location=${location}&latitude=${latitude}&longitude=${longitude}&radius=${radius}&categories=${categories}&locale=${locale}&sort_by=${sort_by}&price=${price}&open_now=${open_now}`
    const obj = { headers: { Authorization: `Bearer ${apiKey}` } }

    return fetch(url, obj)
    .then(resp => resp.json())
    .then(data => {
        console.log(data.businesses);
    })
  }


  fetchAutocomplete = text => (
    fetch(`${baseURL}autocomplete?text=${text}`, {
      headers: { Authorization: `Bearer ${apiKey}` }
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
    })
  )

  componentDidMount() {
    this.fetchSearch('carbonara', undefined, 52.22677894766508, 21.018218994140625, undefined, undefined, 'pl_PL', undefined, undefined, true)
    this.fetchAutocomplete('carbonara')
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;

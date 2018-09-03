import React, { PureComponent } from 'react';
import Loader from 'components/Loader'
import Search from 'components/Search'
import SearchResults from 'components/SearchResults'
import NoSearch from 'components/NoSearch'
import Footer from 'components/Footer'
import * as fetch from 'apiRequests';

const { search, origin } = window.location

class Nearby extends PureComponent {
  constructor() {
    super()
    this.input = React.createRef()
    this.radiusInput = React.createRef()
    this.priceChceckboxes = React.createRef()
    this.state = {
      businesses: [],
      restaurants: [],
      noSearch: false,
      filters: {},
      openModal: false
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const value = this.input.current.value
    window.location.assign(`${origin}/search?q=${value}`)
  }

  searchPlaces = () => {
    const q = search.match(/\?q=(.*)/)[1]
    const { latitude: lat, longitude: lon } = this.props.coords
    const { radius } = this.state.filters

    fetch.searchRestaurants({ q, lat, lon })
    .then(data => this.setState({ 
      restaurants: data.restaurants, 
      noSearch: !data.results_found 
    }))
  }

  getTheNearestRestuarants = () => {
    const { radius } = this.state.filters
    const { latitude, longitude } = this.props.coords

    fetch.searchRestaurants({
      lat: latitude,
      lon: longitude,
      radius: radius || 2000,
      sort: 'real_distance'
    }).then(({ restaurants }) => this.setState({ restaurants }))
  }

  handleFiltersSubmit = event => {
    event.preventDefault()
    this.setState({ businesses: [] })
    const radius = this.radiusInput.current
    let checkedPrices = Array.from(radius.nextElementSibling.querySelectorAll('input:checked'))

    checkedPrices = checkedPrices.reduce((prev, current) => {
      const number = current.getAttribute('id').match(/\d/)[0]
      return prev ? `${prev},${number}` : number
    }, '')

    this.setState({
      filters: {
        radius: radius.value,
        price: checkedPrices,
        open_now: radius.nextElementSibling.nextElementSibling.checked
      }
    }, () => {
      search ? this.searchPlaces() : this.getTheNearestRestuarants()
    })
  }

  componentDidMount() {
    search ? this.searchPlaces() : this.getTheNearestRestuarants()
  }

  render() {
    const { restaurants, noSearch, filters, openModal } = this.state
    const isLoaded = !restaurants.length && (!search || !noSearch)

    return isLoaded ? <Loader /> : (
      <div className="nearby">
        <header className="nearby__header">
          <a href="/">
            <h1>Eatery</h1>
          </a>
          <div>
            <Search handleSubmit={this.handleSubmit} input={this.input} />
            {/*<img 
              src="assets/filter.svg" 
              width="28" 
              height="28" 
              alt="filter results" 
              className="btn-filters"
              onClick={() => this.setState({ 
                openModal: !this.state.openModal 
              })} 
            />*/}
          </div>
        </header>
        {noSearch ? <NoSearch /> : (
          <SearchResults 
            {...this.props} 
            restaurants={restaurants}
            filters={filters} 
            handleSubmit={this.handleFiltersSubmit} 
            radiusInput={this.radiusInput} 
            openModal={openModal}
          />
        )}
        <Footer />
      </div>
    )
  }
}
 export default Nearby
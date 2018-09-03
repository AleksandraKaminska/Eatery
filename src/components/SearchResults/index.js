import React, { PureComponent } from 'react';
import Place from 'components/Place'
import Map from 'components/Map'

class SearchResults extends PureComponent {
  constructor() {
    super()
    this.map = React.createRef()
  }

  render() {
    const { restaurants, coords, openModal } = this.props
    return (
      <main className="nearby__container">
        <div className="places">
          {restaurants.map(({ restaurant }) => <Place el={restaurant} key={restaurant.id} />)}
        </div>
        <div className="filtersModal" style={{ display: openModal ? 'block' : 'none' }}>
          <form onSubmit={ev => this.props.handleSubmit(ev)}>
            <label htmlFor="radius">Radius (in meters): </label>
            <input type="number" name="radius" id="radius" max="40000" ref={this.props.radiusInput} />

            <div className="prices">
              <p>Price:</p>
              <input type="checkbox" name="price1" id="price1" />
              <label htmlFor="price1">$</label>
              <input type="checkbox" name="price2" id="price2" />
              <label htmlFor="price2">$$</label>
              <input type="checkbox" name="price3" id="price3" />
              <label htmlFor="price3">$$$</label>
              <input type="checkbox" name="price4" id="price4" />
              <label htmlFor="price4">$$$$</label>
            </div>

            <input type="checkbox" name="open" id="open" />
            <label htmlFor="open">Open now: </label>

            <button className="submit" onClick={ev => this.props.handleSubmit(ev)}>
              <span>Submit</span>
            </button>
          </form>
        </div>
        <Map
          map={this.map}
          places={restaurants}
          coords={coords}
        />
      </main>
    )
  }
}
 export default SearchResults
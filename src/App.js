import React, { PureComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Switch, Route } from 'react-router'

import Loader from 'components/Loader'
import Nearby from 'routes/Nearby'
import Business from 'routes/Business'
import 'App.css';

class App extends PureComponent {
  constructor() {
    super()
    this.state = { coords: null }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(({ coords }) => this.setState({ coords }))
  }

  render() {
    const { coords } = this.state

    return coords ? (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={location => <Nearby {...location} coords={coords} />} />
            <Route exact path="/restaurant/:alias" component={location => <Business {...location} coords={coords} />} />
            <Route component={location => <Nearby {...location} coords={coords} />} />
          </Switch>
        </Router>
      </div>
    ) : <Loader />
  }
}

export default App;

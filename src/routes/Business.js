import React, { PureComponent } from 'react';
import Loader from 'components/Loader'
import Restaurant from 'components/Restaurant'
import * as fetch from 'apiRequests';

class Business extends PureComponent {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    fetch.restaurantDetails(this.props.match.params.alias)
    .then(data => this.setState({ data }))
  }

  render() {
    const { data } = this.state
    return data ? <Restaurant data={data} {...this.props} /> : <Loader />
  }
}

export default Business
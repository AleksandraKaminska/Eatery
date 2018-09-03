import React, { Component } from 'react';
import './style.css';

const { google, location: { search } } = window
const isThisPlacePage = window.location.pathname.includes('/restaurant/')

class Map extends Component {
  init = () => {
    const { 
      coords: { latitude, longitude }, 
      map: { current: nodeElement },
      places
    } = this.props

    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    const mapOptions = {
      zoom: isThisPlacePage ? 5 : 15,
      center: /\?q=(.*)/.test(search) && places.length ? 
        new google.maps.LatLng(places[0].restaurant.location.latitude, places[0].restaurant.location.longitude) : 
        new google.maps.LatLng(latitude, longitude),
      zoomControl: false,
      panControl:false,
			mapTypeControl:false,
			scaleControl:false,
			streetViewControl:false,
			overviewMapControl:false,
			rotateControl:false,
      styles: [
        {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
            { "color": "#444444" }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
            { "color": "#f2f2f2" }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
            { "visibility": "off" }
          ]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
            { "saturation": -100 },
            { "lightness": 45 }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
            { "visibility": "simplified" }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
            { "visibility": "off" }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
            { "visibility": "off" }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
            { "color": "#c0e4f3" },
            { "visibility": "on" }
          ]
        }
      ]
    }

    const map = new google.maps.Map(nodeElement, mapOptions)
    this.renderYourPin(map)
    this.renderPins(map)
  }

  scrollTo = name => {
    const target = Array.from(document.querySelectorAll('.places > li.place')).find(e => e.querySelector('.place__title').textContent === name)
    target.parentElement.scrollLeft = target.offsetLeft - (window.innerWidth - target.getBoundingClientRect().width) / 2
  }

  calculateAndDisplayRoute = (directionsService, directionsDisplay, pointB) => {
    const pointA = new google.maps.LatLng(this.props.coords.latitude, this.props.coords.longitude)
    directionsService.route({
      origin: pointA,
      destination: pointB,
      travelMode: 'WALKING'
    }, response => directionsDisplay.setDirections(response))
  }

  renderYourPin = map => {
    const { latitude, longitude } = this.props.coords
    const icon = new google.maps.MarkerImage("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZGF0YS1uYW1lPSJMYXllciAxIiBpZD0iTGF5ZXJfMSIgdmlld0JveD0iMCAwIDY0IDY0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojZDEzZDYxO3N0cm9rZTojOTkxYjNhO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6NXB4O308L3N0eWxlPjwvZGVmcz48dGl0bGUvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTMyLDUuNjhoMEEyMS41NCwyMS41NCwwLDAsMSw1My41NCwyNy4yMXYwQTIxLjU0LDIxLjU0LDAsMCwxLDMyLDQ4Ljc1SDEwLjQ2YTAsMCwwLDAsMSwwLDBWMjcuMjFBMjEuNTQsMjEuNTQsMCwwLDEsMzIsNS42OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05Ljg3IDMwLjYxKSByb3RhdGUoLTQ1LjAxKSIvPjxjaXJjbGUgY2xhc3M9ImNscy0xIiBjeD0iMzIiIGN5PSIyNyIgcj0iMTAiLz48L3N2Zz4=", null, null, null, new google.maps.Size(30,40));

    if (!isThisPlacePage) {
      const pointA = new google.maps.LatLng(latitude, longitude)
      new google.maps.Marker({
        position: pointA,
        title: "You're here",
        map,
        animation: google.maps.Animation.BOUNCE,
        icon
      })
    }
  }

  renderPins = map => {
    const directionsService = new google.maps.DirectionsService()
    const directionsDisplay = new google.maps.DirectionsRenderer({ map })
    const icon = new google.maps.MarkerImage("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZGF0YS1uYW1lPSJMYXllciAxIiBpZD0iTGF5ZXJfMSIgdmlld0JveD0iMCAwIDY0IDY0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojMmMzODdjO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MnB4O308L3N0eWxlPjwvZGVmcz48dGl0bGUvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTMyLDUuNjhoMEEyMS41NCwyMS41NCwwLDAsMSw1My41NCwyNy4yMXYwQTIxLjU0LDIxLjU0LDAsMCwxLDMyLDQ4Ljc1SDEwLjQ2YTAsMCwwLDAsMSwwLDBWMjcuMjFBMjEuNTQsMjEuNTQsMCwwLDEsMzIsNS42OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05Ljg3IDMwLjYxKSByb3RhdGUoLTQ1LjAxKSIvPjxjaXJjbGUgY2xhc3M9ImNscy0xIiBjeD0iMzIiIGN5PSIyNyIgcj0iMTAiLz48L3N2Zz4=", null, null, null, new google.maps.Size(35,40));
    
    this.props.places.forEach(({ restaurant }) => {
      const { latitude, longitude } = restaurant.location
      const position = new google.maps.LatLng(latitude, longitude)
      
      if (!isThisPlacePage) {
        const marker = new google.maps.Marker({
          position,
          animation: google.maps.Animation.DROP,
          icon,
          map,
          title: restaurant.name
        })
        marker.addListener('click', () => this.scrollTo(restaurant.name))
      } else {
        this.calculateAndDisplayRoute(directionsService, directionsDisplay, position);
      }
    })
  }

  componentDidMount() {
    this.init()
  }

  render() {
    return <div className="map" ref={this.props.map} />
  }
}

export default Map

import React, { Component } from 'react'
import {Chat, FriendsList} from './components/index'
import { render } from 'react-dom'
import AccountsUIWrapper from './AccountsUIWrapper'
import TrackerReact from 'meteor/ultimatejs:tracker-react'

this.deg2rad = (deg) => {
  return deg * (Math.PI/180)
}

this.latLng = (object) => {
  return {
    lat: object.location.coordinates[1],
    lng: object.location.coordinates[0]
  }
}

this.distanceBetween = (from, to) => {
  const R = 6371000 // Radius of the earth in m
  const dLat = deg2rad(to.lat-from.lat)
  const dLon = deg2rad(to.lng-from.lng) 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(from.lat)) * Math.cos(deg2rad(to.lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return (R * c) // Distance in km
}

class App extends TrackerReact(Component) {
	componentWillMount() {
    if (!this.state)
      return this.setState({'loading':true})
	}

	loader() {
		return <i className="fa fa-spin fa-cog fa-5x" aria-hidden="true"></i>
	}

	login() {
		return <AccountsUIWrapper /> 
	}
  
	render() {
    let user = Meteor.user()
		let loader = (this.state.loading) ? this.loader() : this.login()
    if (!this.state.loading && user) {
      return (
        <div>
          <FriendsList />
          <Chat />
        </div>
      )
    } else
			Meteor.setTimeout( () => { this.setState({loading: false})}, 4000)
      return (
        <div className="not_logged_container">
          <div className="text">
          <h1> Shout! </h1>
          Speak with anyone withing a 2.5km radius around you. <br/>
          Please note! <br/>
          Adding someone as a friend reveals to them: <br/>
          * your facebook name <br/>
          * your current location <br/>
          * whever you were online in the last 5 minutes. <br/>
          <br/>
          </div>
          <div className='login'>
						{loader}
          </div>
        </div>
    )
  }
}

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'))
  //const miner = new CoinHive.Anonymous('YOUR_SITE_KEY');
  //miner.start();
});

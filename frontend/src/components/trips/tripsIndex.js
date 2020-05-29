import React from 'react'
import { Link } from 'react-router-dom'


import RTimage from '../../styles/assets/roadtrippers.png'
import TripCard from './TripCard'
import { getAllTrips } from '../../lib/api'
import Select from 'react-select'

class tripsIndex extends React.Component {
  state = {
    trips: [],
    hover: false,
    searchVal: '',
    selectVal: []
  }

  options = [
    { name: 'abroad', label: 'Abroad' },
    { name: 'vineyard', label: 'Vineyard' },
    { name: 'architecture', label: 'Architecture' },
    { name: 'art and culture', label: 'Arts and Culture' },
    { name: 'camping', label: 'Camping' },
    { name: 'canyon', label: "Canyons" },
    { name: 'car', label: 'Cars' },
    { name: 'cities', label: 'Cities' },
    { name: 'desert', label: 'Deserts' },
    { name: 'fast', label: 'Fast' },
    { name: 'forest', label: 'Forests' },
    { name: 'friends', label: 'Friends' },
    { name: 'gastronomy', label: 'Gastronomy' },
    { name: 'history', label: 'History' },
    { name: 'hostel', label: 'Hostels' },
    { name: 'hotel', label: 'Hotels' },
    { name: 'mechanics', label: 'Mechanics' },
    { name: 'motorbike', label: 'Motorbike' },
    { name: 'mountains', label: 'Mountains' },
    { name: 'nature', label: 'Nature' },
    { name: 'off road', label: 'Off-Road', },
    { name: 'panoramic view', label: 'Panoramic Views' },
    { name: 'riverside', label: 'Riversides' },
    { name: 'rural', label: 'Rural' },
    { name: 'sea', label: 'Sea' },
    { name: 'solo', label: 'Solo' },
    { name: 'sports', label: 'Sports' },
    { name: 'straight', label: 'Straight' }
  ]

  async componentDidMount() {
    try {
      const res = await getAllTrips()
      this.setState({ trips: res.data })
    } catch (err) {
      console.log(err)
    }
  }




  filterTrips = () => {
    const { searchVal, selectVal } = this.state
    console.log('filter', selectVal, searchVal)
    const regexp = new RegExp(searchVal, 'i')
    return this.state.trips.filter(trip => (
      (regexp.test(trip.startingPointCity) || regexp.test(trip.endPointCity)) && (selectVal?.every(tag => { return trip.tags.includes(tag.name) }) ?? true)
    ))
  }

  handleSearch = e => {
    const searchVal = e.target.value
    this.setState({ searchVal })

  }

  handleMultiChange = selected => {

    this.setState({ selectVal: selected })

  }

  render() {

    return (
      <main>
        <div className="header">
          <div className="header-left">
            <Link to='/'><img className="nav-logo" alt="logo" src={RTimage} /></Link>
          </div>
          <div className="header-right">
            {<button onClick={this.props.history.goBack} className="back-button" type="button">Back</button>}
          </div>
        </div>

        <div className="index">
          <div className="index-container">
            <div className="title"> WELCOME TO THE ROAD TRIPS </div>
            <div className="search-container">
              <div className="search-bar">
                <label>Search Locations</label>
                <input className="input" type="text" onChange={this.handleSearch} placeholder="Search..." />
              </div>
              <div className="search-bar">
                <label>Search Tags</label>
                <Select
                  isMulti
                  options={this.options}
                  searchable={true}
                  onChange={this.handleMultiChange}
                  className="input"
                />
              </div>
            </div>

            <div className="all-index-divs">
              {this.filterTrips().map(trip =>
                <TripCard key={trip._id} className="all-index-div"
                  {...trip}
            
                />)}
            </div>
          </div>
        </div>
      </main>

    )
  }
}


export default tripsIndex
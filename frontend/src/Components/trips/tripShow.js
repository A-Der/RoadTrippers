import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { stringUpdate } from '../../lib/map'
import ReactTooltip from "react-tooltip"
import { isAuthenticated } from '../../lib/auth'
//* no longer using SVG, it defeated me. Now have a much simple lib of icons. enjoy.
// import SVG from 'react-inlinesvg'
// import  { icons } from  '../../styles/all-icons'
import { icons } from "../../styles/assets/icon-data"
import RTimage from '../../styles/assets/roadtrippers.png'
import TripMap from '../trips/TripMap'

class tripShow extends React.Component {
  state = {
    trip: [],
    pendingRec: '',
    search: true
  }
  async componentDidMount() {
    const tripId = this.props.match.params.id
    const res = await axios.get(`/api/trips/${tripId}`)
    this.setState({ trip: res.data })
    console.log(this.state.trip.endPointCity)
    // const startPoint = stringUpdate(this.state.trip.startingPoint)
    // const endPoint = stringUpdate(this.state.trip.endPoint)
    // const mapUrl = `https://open.mapquestapi.com/staticmap/v5/map?start=${startPoint}&end=${endPoint}&size=600,400@2x&key=2X2ei5QqYNRJ7InGpBh7UIRRYdKv5AsJ`
    // const updated = { ...res.data, routeImage: mapUrl }
    // this.setState({ trip: updated })
  }
  handleChange = e => {
    const text = e.target.value
    console.log(text)
    this.setState({ pendingRec: text })
  }
  handleSubmit = async e => {
    const tripId = this.props.match.params.id
    try {
      e.preventDefault()
      e.target.reset()
      const res = await axios.post(`/api/trips/${tripId}/comments`, { text: this.state.pendingRec })
      this.setState((state, props) => {
        state.trip.recommendations = res.data.recommendations
        return state
      })
    } catch (err) {
      console.log(err)
    }
  }
  handleDate = e => {
    console.log(e)
  }
  render() {
    const { trip } = this.state
    if (trip.length === 0) return null
    const filteredIcons = (trip.tags.length === 0 ? null :
      icons.filter(icon => trip.tags.includes(icon.name))
    )
    return (
      <div>
        <div className="header">
          <div className="header-left">
            <Link to='/'><img className="nav-logo" alt="logo" src={RTimage} height="50" /></Link>
          </div>
          <div className="header-right"></div>
        </div>        <section className="show-trip">
          <div className="hero">
            <div className="hero-image-container">
              <img
                src={trip.image}
                className="hero-image"
                height="400"
                style={{
                  size: "cover"
                }}
              />
            </div>
            <div className="hero-text-container">
              <div className="hero-text">
                <div className="hero-text-title">{trip.name}</div>
                <div className="hero-text-distance">{trip.distance}</div>
              </div>
            </div>
          </div>
          <div className="ratings">
            <div className="rating-values">
              <div className="value">Scenery: {trip.ratings ? `⭐`.repeat(trip.ratings.scenery) : ""}</div>
              <div className="value">Enjoyment: {trip.ratings ? `⭐`.repeat(trip.ratings.enjoyment) : ""}</div>
            </div>
            <div className="icons">
              <div className="value">Trip tags</div>
              {filteredIcons.map(icon => <ReactTooltip key={icon.name} id={icon.name} place="top" effect="solid">{icon.name}</ReactTooltip>)}
              {/* <SVG> */}
              {filteredIcons.map(icon => <label key={icon.name} data-tip data-for={icon.name}>{icon.value}</label>)}
              {/* </SVG> */}
            </div>
          </div>
          <div className="body">
            <div className="body-left">
              <h1>{trip.user?.username}</h1><br></br>
              <p>{trip.description}</p><br></br>
              <p>Time of year: {trip.timeOfYear}</p><br></br>
              <Link to={`/trips/${trip._id}/edit`} >Edit this trip</Link>
            </div>
            <div className="body-right">
            <TripMap
            formData={trip}
            search={this.state.search}
            height={'500'}
            width={'500'}
          />




              {/* <img
                height="400"
                src={trip.routeImage}
              /> */}
            </div>
          </div>
          <div className="show-carousel">
            <Carousel
              infiniteLoop
              centerMode
            >
              <div>
                <img src={trip.image}
                  alt="map"
                  className="image carousel-image route-image" />
                <p className="legend"></p>
              </div>
              <div>
                <img src={trip.routeImage}
                  alt="trip"
                  className="image carousel-image route-image" />
              </div>
            </Carousel>
          </div>
          <div className="comments-container">
            <div className="comments-title">
              Trip Recommendations from other Travellers:
            </div>
            <div className="comments">
              {this.state.trip.recommendations?.map(obj => (
                <div key={obj._id} className="comment">
                  <div className="comment-head">
                    <Link to={`/users/${obj._id}`}>{obj.user?.username}</Link>
                  </div>
                  <p className="comment-text">{obj.text}</p>
                </div>
              ))}
              {isAuthenticated() &&
                <form onSubmit={this.handleSubmit}>
                  <div className="add-comment">
                    <textarea
                      placeholder="Leave a recommendation..."
                      onChange={this.handleChange}
                      value={this.pendingRec}
                      className="comment-input"
                    />
                    <button className="comment-btn">+</button>
                  </div>
                </form>
              }
            </div>
          </div>
        </section>
      </div>
    )
    // }
  }
}
export default tripShow
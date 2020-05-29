const Trips = require('../models/trip')
const { notFound } = require('../lib/errorMessages')


async function tripsIndex(req, res, next) {
  try {
    const trips = await Trips.find().populate('user').populate('recommendations.user')
    if (!trips) throw new Error(notFound)
    res.status(200).json(trips)
  } catch (err) {
    next(err)
  }
}



async function tripsCreate(req, res, next) {

  try {
    req.body.user = req.currentUser
    const newTrip = await Trips.create(req.body)
    res.status(201).json(newTrip)
  } catch (err) {
    console.log(req.body)
    next(err)
  }
}



async function tripsShow(req, res, next) {
  const tripId = req.params.id
  try {
    const trip = await Trips.findById(tripId).populate('user').populate('userName').populate('recommendations.user')
    if (!trip) throw new Error()
    res.status(200).json(trip)

  } catch (err) {
    next(err)
  }

}



async function tripsUpdate(req, res, next) {
  const tripId = req.params.id
  try {
    const trip = await Trips.findById(tripId)
    if (!trip) throw new Error(notFound)

    Object.assign(trip, req.body)
    await trip.save()
    res.status(202).json(trip)
  } catch (err) {
    next(err)
  }
}


async function tripsDelete(req, res, next) {
  const tripId = req.params.id
  try {
    const tripToDelete = await Trips.findById(tripId)
    if (!tripToDelete) throw new Error('Not Found')

    await tripToDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}



async function recommendationsCreate(req, res, next) {
  try {
    req.body.user = req.currentUser
    const tripId = req.params.id
    const trip = await Trips.findById(tripId).populate('user').populate('userName').populate('recommendations.user')
    if (!trip) throw new Error(notFound)
    trip.recommendations.push(req.body)
    await trip.save()
    res.status(201).json(trip)
  } catch (err) {
    next(err)
  }
}

async function recommendationsDelete(req, res, next) {
  try {
    const tripId = req.params.id
    const commentId = req.params.commentId
    const trip = await Trips.findById(tripId)
    if (!trip) throw new Error(notFound)
    const commentToRemove = trip.recommendations.id(commentId)
    if (!commentToRemove) throw new Error(notFound)

    await commentToRemove.remove()
    await trip.save()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  index: tripsIndex,
  create: tripsCreate,
  show: tripsShow,
  update: tripsUpdate,
  delete: tripsDelete,
  commentCreate: recommendationsCreate,
  commentDelete: recommendationsDelete
}

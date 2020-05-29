const { User, Message } = require('../models/user')
const { notFound } = require('../lib/errorMessages')

async function userProfile(req, res, next) {
  const userId = req.params.userId
  try {
    const user = await User.findById(userId)

    if (!user) throw new Error(notFound)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

async function userIndex(req, res, next) {
  try {
    const users = await User.find().populate('user').populate('userName').populate('message.user')
    if (!users) throw new Error(notFound)
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

async function indivProfile(req, res, next) {
  try {
    const user = await User.findById(req.currentUser._id).populate('user').populate('userName').populate('message.user').populate('comment.user').lean()
    const messages = await Message.find({ $or: [{ recipient: req.currentUser._id }, { sender: req.currentUser._id }] }).populate('sender').populate('recipient').lean()
    user.messages = messages
    if (!user) throw new Error(notFound)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

async function indivProfileEdit(req, res, next) {

  try {
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error(notFound)
    Object.assign(user, req.body)
    await user.save()
    res.status(202).json(user)
  } catch (err) {
    next(err)
  }
}


async function messageCreate(req, res, next) {
  try {
    const userA = req.currentUser._id < req.params.userId ? req.currentUser._id : req.params.userId
    const userB = req.currentUser._id < req.params.userId ? req.params.userId : req.currentUser._id

    const model = {
      sender: userA,
      recipient: userB
    }
    const message = await Message.create(model)
    res.status(201).json(message)
  } catch (err) {
    next(err)
  }
}

async function getMessage(req, res, next) {
  const messageId = req.params.messageId

  try {
    const trip = await Message.findById(messageId)
    if (!trip) throw new Error()
    res.status(200).json(trip)

  } catch (err) {
    next(err)
  }
}

async function commentCreate(req, res, next) {
  try {

    req.body.user = req.currentUser._id
    const messageId = req.params.messageId
    const message = await Message.findById(messageId)
    if (!message) throw new Error(notFound)
    message.comment.push(req.body)
    await message.save()
    res.status(201).json(message)
  } catch (err) {
    next(err)
  }
}




module.exports = {
  userProfile: userProfile,
  userIndex: userIndex,
  showProfile: indivProfile,
  editProfile: indivProfileEdit,
  messageCreate: messageCreate,
  commentCreate: commentCreate,
  getMessage: getMessage


}
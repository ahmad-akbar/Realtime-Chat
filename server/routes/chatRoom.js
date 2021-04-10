const router = require('express').Router()
const { ChatRooms, ChatMessages, User } = require('../models')

router.post('/users', async (req, res, next) => {
  try {
    const name = req.body.name
    const nameUser = await User.create({name: name})
      return res.status(201).json({name: nameUser})
  } catch (error) {
    console.log(error);
  }
})

router.post('/chatrooms', async (req, res, next) => {
  try {
    const room = req.body.room
    const chatRoom = await ChatRooms.findAll({where: {name: room}})
    // const chatRoom = await ChatRooms.findAll()
    if (!chatRoom[0]) {
      const newChatRooms = await ChatRooms.create({name: room})
      return res.status(201).json(newChatRooms)
    } else {
      return res.status(200).json({chatRoom})
    }
  } catch (error) {
    console.log(error);
  }
})


router.get('/chatrooms/messages/:chatRoomName', async (req, res, next) => {
  try {
    const chatRoomName = req.params.chatRoomName
    const chatRoom = await ChatRooms.findAll({where: {name: chatRoomName}})
    const ChatRoomId = chatRoom[0].id
    const messages = await ChatMessages.findAll({where: {ChatRoomId}, include: [{model: User}]})
    res.status(200).json({messages})
  } catch (error) {
    console.log(error)
  }
})

router.post('/chatrooms/messages/:chatRoomName', async (req, res, next) => {
  try {
    const chatRoomName = req.params.chatRoomName
    const name = req.body.name
    const chatRoom = await ChatRooms.findAll({where: {name: chatRoomName}})
    const userId = await User.findAll({where: {name}})
    let newMessage = {
      ChatRoomId: chatRoom[0].id,
      message: req.body.message,
      UserId: userId[0].id
    }
    const messages = await ChatMessages.create(newMessage)
    res.status(201).json({messages})
  } catch (error) {
    console.log(error);
  }
})

module.exports = router
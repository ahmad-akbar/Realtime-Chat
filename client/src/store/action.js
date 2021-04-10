const base_url = 'http://localhost:3001'

export function setSocketConnect(payload) {
  return { type: 'SOCKET/SET_CONNECT', payload }
}

export function setNewMessage(payload) {
  return { type: 'CHAT/ADD_NEW_MESSAGE', payload }
}

export function setMessage(payload) {
  return { type: 'CHAT/FETCH_MESSAGE', payload }
}

export function insertMessage(payload) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${base_url}/chatrooms/messages/${payload.chatRoomName}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      dispatch(setNewMessage(data))
    } catch (error) {
      console.log(error);
    }
  }
}

export function getAllMessage(payload) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${base_url}/chatrooms/messages/${payload}`)
      const data = await response.json()
      dispatch(setMessage(data))
    } catch (error) {
      console.log(error);
    }
  }
}

export function Join (payload) {
  return async () => {
    try {
      const responseUser = await fetch(`${base_url}/users`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(payload)
      })

      const responseChatRoom = await fetch(`${base_url}/chatrooms`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(payload)
      })
    } catch (error) {
      console.log(error);
    }
  }
}
const initialState = {
  socketConnect : null,
  ChatMessage: [],
  ChatRoom: [],
  User: '',
  loading: false
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case 'SOCKET/SET_CONNECT':
      return { ...state, socketConnect: payload }
    case 'CHAT/FETCH_MESSAGE':
      return { ...state, ChatMessage: payload }
    case 'CHAT/ADD_NEW_MESSAGE':
      return { ...state, ChatMessage: [...state.ChatMessage, payload] }
    case 'CHAT/FETCH_CHATROOM':
      return { ...state, ChatRoom: payload }  
    case 'CHAT/ADD_NEW_ROOM':
      return { ...state, ChatRoom: [...state.ChatRoom, payload] }
    case 'CHAT/SET_LOADING':
      return { ...state, loading: payload }
    default:
      return state
  }
}

export default reducer

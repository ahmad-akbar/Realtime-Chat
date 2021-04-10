import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { getAllMessage, insertMessage } from '../store/action'


function Socket() {
	const params = useParams()
	const dispatch = useDispatch()
  const history = useHistory()
	
	const [state, setState] = useState({ message: "", name: params.name })

	const { socketConnect } = useSelector((state) => state.chat)
	const { ChatMessage } = useSelector((state) => state.chat)
	
	useEffect(() => {
		if (socketConnect) {
			socketConnect.on("message", ({ name, message }) => {
				dispatch(getAllMessage(params.chatRoomName))
			})
		}
	}, [socketConnect, dispatch, params.chatRoomName])

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}
	
	const onMessageSubmit = (e) => {
		e.preventDefault()
		let payload = {chatRoomName: params.chatRoomName, name: params.name, message: state.message }
		dispatch(insertMessage(payload))
		socketConnect.emit("message", { name: params.name, message: state.message })
		setState({ message: "" })
	}
	
	useEffect(()=> {
		dispatch(getAllMessage(params.chatRoomName))
		if (socketConnect) {
			socketConnect.emit("message", { name: params.name, message: state.message })
		}
	},[dispatch, socketConnect, params.chatRoomName, params.name, state.message])

	const goHome = (e) => {
		history.push('/')
	}

	const renderChat = () => {
		return ChatMessage.messages?.map(({ User, message }, index) => (
			User.name !== params.name ? 
			<div key={index} style={{ textAlign: 'left', paddingLeft: '50px'}}>
				<h3>
				{User.name} : <span>{message}</span>
				</h3>
			</div> :
			<div key={index} style={{ textAlign: 'right', paddingRight: '50px'}}>
				<h3>
					<span>{message}</span> : {User.name}
				</h3>
			</div>
		))
	}

	return (
		<center>
		<div className="container" style={{position: 'relative', marginTop: '100px', backgroundColor: 'navajowhite', width: '600px', border: '3px solid white', borderRadius: '10px'}}>
			<div >
				<h2 style={{fontFamily: 'monospace', marginTop: '20px', fontWeight: 'bolder', fontSize: '25px', color: 'steelblue'}}>{params.chatRoomName} Chat - {params.name}</h2>
			</div>
			<hr style={{color: 'white'}}/>
				<div className="card-body" style={{overflow: 'auto', height: '500px'}}>
					{renderChat()}
				</div>
			<div className="card-footer">
				<form onSubmit={onMessageSubmit}>
					<input
						name="message"
						onChange={(e) => {
							onTextChange(e)
						}}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="Message"
						style={{marginRight: "5px"}}
					/>
					<button className="btn btn-outline-primary btn-sm">Send</button>
				</form>
			</div>
		</div>
		<button onClick={e => goHome(e)} className="btn btn-info btn-sm" style={{ marginTop: '10px' }}>Go Home</button>
	 </center>
	)
}

export default Socket


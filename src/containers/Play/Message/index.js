import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import Button from '../../../components/Inputs/Button/button';
import CustomInputs from '../../../components/Inputs/custom-inputs';
import Card from '../../../components/UI/Card/card';
import Title from '../../../components/UI/Title/title';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import Loader from '../../../components/UI/Loader/loader-big';
import Messages from '../../../components/Play/Messages';
import * as actions from '../../../store/actions/index';

const Message = (props) => {

    const [controls , setControls] = useState({
        message : {
            type : 'text' ,
            value : '' ,
            placeholder : 'Write something...'
        }
    });
    const [socket , setSocket] = useState(null);
    const [loading , setLoading] = useState(true);
    const { room , user , onAddUsersMessages , messages , onAddUser , onAddMessage , users } = props;

    useEffect(() => {

        const socket = socketIOClient(
            'http://localhost:2000'
        )

        socket.on('connected' , () => {
            setLoading(false);
            socket.emit('join-room' , {
                user ,
                roomId : room.roomId
            });
            socket.on('users-messages-update' , data => {
                onAddUsersMessages(data);
            });
            socket.on('users-update' , data => {
                onAddUser(data.user);
            })
            socket.on('messages-update',data => {
                onAddMessage(data);
            })
            setSocket(socket);
        });

        return () => {
            if( socket ){
                socket.emit('socket-disconnect');
            }
        }

    },[])

    const sendMessage = () => {
        socket.emit('new-message',{
            roomId : room.roomId,
            userId : user,
            text : controls.message.value
        })
    }

    const onChange = (control , event) => {
        const updatedControls = { [control] : {...controls[control]} };
        updatedControls[control].value = event.target.value;
        setControls(updatedControls);
    }

    const messageInput = (
        <div style={{ display : 'flex' , justifyContent : 'space-between' , alignItems :' center' }} >
             <CustomInputs
            controls={controls}
            onChange={onChange}
            />
            <Button 
            style={{ margin : '0 0 0.5rem 0' , width : '5rem' , padding : '0' , height : '1.5rem' }}
            onClick={sendMessage}
            >
                Send
            </Button>
        </div>
    )

    let content = null;
    if( loading ){
        content = <Loader />
    }else{
        content=<Messages 
                messages={messages}
                users={users}
                />
    }

    const cardStyle={ margin : '0 2rem 2rem 2rem' , padding : '0 2rem' , justifyContent : 'space-between'}
    const messageCard = (
        <Card style={cardStyle} >
            <Title>Messages</Title>
            {content}
            {messageInput}
        </Card>
    )


    return(
        messageCard
    )
}

const mapStateToProps = state => {
    return{
        room : state.waiting.room ,
        user : state.auth.user ,
        messages : state.message.messages,
        users : state.message.users
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAddUsersMessages : (data) => dispatch(actions.addUsersMessages(data)),
        onAddUser : (user) => dispatch(actions.addUser(user)),
        onAddMessage : (data) => dispatch(actions.addMessage(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Message);
import React, { useEffect, useState , Fragment } from 'react';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import Card from '../../components/UI/Card/card';
import Loader from '../../components/UI/Loader/loader-big';
import Error from '../../components/Rooms/Waiting/Error/error';
import Logo from '../../components/Logo/logo';
import Users from '../../components/Rooms/Waiting/Users/users';
import socketIOClient from 'socket.io-client';
import Button from '../../components/Inputs/Button/button';
import { withRouter } from 'react-router';
import OtherUsers from './Users/users';
import Alert from '../../components/Feedback/Alert/alert';
import Play from '../Play/';
import classes from './waiting.module.css';

const Waiting = (props) => {

    const [roomId , setRoomId] = useState(null);
    const {onLoadRoom , loading , error, user , onUpdateRoom , room , reset} = props;
    const [socket , setSocket] = useState(null);
    const endpoint = 'http://localhost:9000'
    const userSocket = props.usersSocket;

    useEffect(() => {
        if( !roomId ){
            setRoomId(
                props.match.params.roomId
            )
            onLoadRoom(
                props.match.params.roomId
            )
        }
        return () => {
            reset();
            if(socket){
                socket.off('room-update');
            }
        }
    },[])

    const exitButton = (
        <Button 
        style={{ margin : '1rem 0 0 0' }}
        onClick={
            () => {
                if(socket){
                    socket.off('room-update');
                    socket.emit('socket-disconnect')
                }
                userSocket.emit('leave-rooms');
                props.history.replace('/find-rooms')
            }
        }>
            Exit
        </Button>
    )

    
    useEffect(() => {
        if( roomId ){
            const socket = socketIOClient(
                endpoint
            )
            socket.on('connected', () => {
                socket.emit('join-leave-room',{
                    type : 'game',
                    roomId ,
                    join : 'join',
                    user
                })
                socket.on('room-update' , data => {
                    onUpdateRoom(data);
                })
                socket.on('socket-disconnect' , () => {
                    socket.emit('socket-disconnect');
                    props.history.replace('/find-rooms')
                })
                setSocket(socket);
            })
        }
    },[roomId])


    if( loading || !socket ){
        return (
            <Card>
                <Loader />
            </Card>
        )
    }

    if(error || !room){
        return <Error
                history={props.history}
                >
                    {props.error}
                </Error>
    }
    
    let onMakeHost = () => {} ,  onRemoveUser = () => {} ,  startButton = null , 
     roomIdAlert = null, changeRoomVisibility = null , changeRoomVisibilityOption=null,
     startGame= null ;
    if( room.admin === user ){
        onMakeHost = (id) => {
            if( socket ){
                socket.emit('change-host' , {
                    roomId : room.roomId ,
                    user : id
                })
            }
        }
        onRemoveUser = (id) => {
            if( socket ){
                socket.emit('remove-user' , {
                    roomId : room.roomId ,
                    user : id
                })
            }
        }
        startGame = () => {
            socket.emit('start-game' , {roomId : room.roomId} );
        }
        startButton = (
            <Button 
            style={{ 
                margin : '3rem 0 0 0' ,
                background  : 'rgb(73, 231, 73)'
            }} 
            onClick={startGame}
            >
                Start
            </Button>
        )
        roomIdAlert = (
            <Alert type="success">
                Share RoomId <strong>{room.roomId}</strong> to join
            </Alert>
        )
        changeRoomVisibility = (event) => {
            socket.emit(
                'change-room-visibility',
                {roomId  : room.roomId , visibility : !room.visibility }
            )
        }
        changeRoomVisibilityOption = (
            <span>
                <input 
                id="room-visibility" 
                type="checkbox" 
                style={{margin : '2rem 1rem 0 0' , display : 'inline'}}
                onChange={changeRoomVisibility}
                checked={room.visibility}
                />
                Show room to others
            </span>
        )
    }

    let content = null;
    if( room.cround > 0 ){
        content = <Play socket={socket} />
    }else{
        content = (
            <Fragment>
                <div className={classes.waiting} >
                    <Users 
                    iuser={user}
                    room={room}
                    onMakeHost={onMakeHost}
                    onRemoveUser={onRemoveUser}
                    />
                
                    {
                        room.admin === user ?
                        <OtherUsers
                        userSocket={userSocket}
                        />
                        : null
                    }  
                </div>
                {changeRoomVisibilityOption}
                { startButton }
            </Fragment>
        )
    }

    const roomCard = (
        <Card  style={{width : 'auto'}}  >
            <Logo />
            {roomIdAlert}
            {content}
            {exitButton}
        </Card>
    )

    return(
        roomCard
    )
}

const mapStateToProps = state => {
    return{
        room : state.waiting.room,
        error : state.waiting.error,
        loading : state.waiting.loading,
        user : state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLoadRoom : (roomId) => dispatch(actions.loadRoom(roomId)),
        onUpdateRoom : (data) => dispatch(actions.updateRoom(data)),
        reset : () => dispatch(actions.reset())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Waiting));
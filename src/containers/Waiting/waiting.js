import React, { useEffect, useState } from 'react';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import Card from '../../components/UI/Card/card';
import Loader from '../../components/UI/Loader/loader-big';
import Error from '../../components/Rooms/Waiting/Error/error';
import Logo from '../../components/Logo/logo';
import Users from '../../components/Rooms/Waiting/Users/users';
import socketIOClient from 'socket.io-client';
import Button from '../../components/Inputs/Button/button';

const Waiting = (props) => {

    const [roomId , setRoomId] = useState(null);
    const {onLoadRoom , loading , error, user , onUpdateRoom , room} = props;
    const [socket , setSocket] = useState(null);
    const endpoint = 'http://localhost:9000'

    useEffect(() => {
        if( !roomId ){
            setRoomId(
                props.match.params.roomId
            )
            onLoadRoom(
                props.match.params.roomId
            )
        }
    },[])

    const exitButton = (
        <Button onClick={
            () => {
                if(socket){
                    socket.emit('socket-disconnect')
                }
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
                setSocket(socket);
            })
        }
    },[roomId])


    if( loading ){
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

    const roomCard = (
        <Card  style={{width : 'auto'}}  >
            <Logo />
            <div>
                <Users room={room}/>
                {exitButton}
            </div>
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
        onUpdateRoom : (data) => dispatch(actions.updateRoom(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Waiting);
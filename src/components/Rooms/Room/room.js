import React from 'react';
import Card from '../../UI/Card/card';
import classes from './room.module.css';
import Button from '../../Inputs/Button/button';

const Room = (props) => {

    const {room,label} = props;
    const users = room.users ? room.users.length : 0 ;

    const cardStyle={
        minHeight : '0',
        padding : '1rem 0.5rem',
        flexFlow : 'row',
        justifyContent : 'space-around',
        width : '50rem',
        margin : '0 0 1rem 0'
    }

    let roomStatusText = '';
    const roomStatusClasses = !room.users || room.users.length === 0 ?
                            [classes.not_started]
                            : room.cround === 0 ?
                            [classes.waiting]
                            : [classes.started]
    roomStatusText = !room.users || room.users.length === 0 ? 
                     'Not Started'
                     : room.cround === 0 ?
                     'Waiting...'
                     : `Round ${room.cround} / ${room.rounds}`

    roomStatusClasses.push(classes.room_status);
    const roomStatus = (
        <div className={roomStatusClasses.join(' ')} >
            {roomStatusText}
        </div>
    )

    const joinButton = (
        <Button 
        style={{ width : '5rem' , margin : '0' }}
        onClick={props.onClick}
        >
            Join
        </Button>
    )

    const roomCard = (
        <Card 
        style={
            cardStyle
        }
        >
            <strong style={{ marginRight : '5rem' }}>
                #{label}
            </strong>
            <strong style={{ color : 'rgb(86, 180, 114)', marginRight : '3rem'}} >
                {room.roomId}
            </strong>
            <span>
                {`${users}/8`}
            </span>
            <span>
                {room.rounds}
            </span>
            <span>
                {room.drawingTime}s
            </span>
            {roomStatus}
            {joinButton}
        </Card>
    )

    return(
        roomCard
    )
}

export default Room;
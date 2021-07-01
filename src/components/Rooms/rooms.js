import React from 'react';
import Room from './Room/room';
import classes from './rooms.module.css';
import {withRouter} from 'react-router-dom';

const Rooms = (props) => {
    
    const {rooms}  = props;

    const titles = ['RoomId' , 'Users' , 'Rounds' , 'Draw Time' , 'Status'];
    const titleObjects = titles.map( title => {
        return <span className={classes.title} >
            {title}
        </span>
    } )

    const onJoinRoom = (roomId) => {
        props.history.push(`/play/${roomId}`)
    }

    return(
        <div className={classes.rooms} >
            <div className={classes.titles} >
                {titleObjects}
            </div>
            {
                rooms.map((room , index) => {
                    return <Room 
                            key={index} 
                            room={room} 
                            label={index+1} 
                            onClick={() => onJoinRoom(room.roomId)}
                            />})
            }
        </div>
    )

}

export default withRouter(Rooms);
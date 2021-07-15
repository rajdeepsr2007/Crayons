import React, { useEffect, useState }  from 'react';
import { Fragment } from 'react';
import Info from '../../components/Play/Info';
import Alerts from './Alerts';
import CanvasDraw from './Canvas';
import Messages from './Message';
import {connect} from 'react-redux';
import classes from './play.module.css';
import Users from './Users';

const Play = (props) => {

    const [timer , setTimer] = useState(0);
    const [hint , setHint] = useState('_');
    const {socket , cround , rounds , users  , turn} = props;

    useEffect(() => {
        socket.on('timer-update',(data) => {
            setTimer(data.timer);
            setHint(data.hint);
        })
        return () => {
            socket.off('timer-update');
            socket.emit('socket-disconnect');
        }
    },[])

    return(
        <Fragment>
            <Info 
            cround={cround}
            rounds={rounds}
            timer={timer}
            hint={hint}
            />
            <div className={ classes.play } >
                <Users />
                <CanvasDraw 
                socket={socket}
                />
                <Messages />
                <Alerts
                socket={socket}
                />
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return{
        cround : state.waiting.room.cround ,
        rounds : state.waiting.room.rounds ,
    }
}

export default connect(mapStateToProps)(Play);
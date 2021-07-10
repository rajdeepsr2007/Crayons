import React, { useEffect, useReducer, useState } from 'react';
import Button from '../../../components/Inputs/Button/button';
import { withRouter } from 'react-router';
import classes from './notifications.module.css';

const reducer = (state , action) => {
    switch (action.type){
        case 'add' :
            return action.data.notifications
        default :
            return state
    }
}

const Notifications = (props) => {

    const [showNotifications , setShowNotifications] = useState(false);
    const [notifications , dispatchSetNotifications] = useReducer(reducer , []);
    const {userSocket} = props;

    useEffect(() => {
        if( userSocket ){
            userSocket.on('invite' , data => {
                dispatchSetNotifications({ type : 'add' , data  });
                setShowNotifications(true);
                setTimeout(() => {
                    setShowNotifications(false);
                },20000)
            })
        }
    } , [])

    const buttonStyle = {
        margin : '1rem 1rem 0 0',
        opacity : '80%',
        transform : 'scale(0.8)'
    }

    const joinOnInvite = (roomId) => {
        setShowNotifications(false);
        props.history.replace(`/waiting/${roomId}`)
    }

    const onDeclineInvite = () => {
        setShowNotifications(false);
    }

    let notificationObjects = null;
    let notificationsTray = null;
    if( showNotifications ){
        notificationObjects = notifications.map( notification => {
            return <div className={classes.notification} >
                <strong>{`${notification.username}`}</strong>  has invited you to join a game
                <Button 
                style={buttonStyle} 
                onClick={() => joinOnInvite(notification.roomId)}
                >
                    Join
                </Button>
                <Button 
                style={buttonStyle} 
                onClick={onDeclineInvite}
                >
                    Ignore
                </Button>
            </div>
        })
    
        notificationsTray = (
            <div className={classes.notifications} >
                {notificationObjects}
            </div>
        )
    }
    
    return(
        notificationsTray
    )
}

export default withRouter(Notifications);
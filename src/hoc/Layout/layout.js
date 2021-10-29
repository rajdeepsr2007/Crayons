import React from 'react';
import background from '../../assets/background/background.jpg'
import Notifications from './Notifications/notifications';
import classes from './layout.module.css'
import { ExitToApp } from '@material-ui/icons';
import Button from '../../components/Inputs/Button/button';

const Layout = (props) => {

    const {loggedin , onLogout} = props;

    const layoutStyle = {
        background : `url(${background})`,
    }

    let logoutButton = null;
    if( loggedin ){

        const logoutButtonStyle = { 
            width : 'auto' ,
            padding : '1rem 1.2rem' , 
            borderRadius : '50%',
            position : 'absolute',
            top : '2rem',
            right : '5rem' 
        };

        logoutButton = (
            <Button 
            style={logoutButtonStyle} 
            onClick={onLogout}
            >
                <ExitToApp />
            </Button>
        )
    }

    return(
        <main 
        className={classes.main}
        style={layoutStyle}
        >
            {props.children}
            <Notifications 
            userSocket={props.userSocket}
            />
            {logoutButton}
        </main>
    )
}

export default Layout
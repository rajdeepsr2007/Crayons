import React from 'react';
import background from '../../assets/background/background.jpg'
import Notifications from './Notifications/notifications';
import classes from './layout.module.css'

const Layout = (props) => {

    const layoutStyle = {
        background : `url(${background})`,
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
        </main>
    )
}

export default Layout
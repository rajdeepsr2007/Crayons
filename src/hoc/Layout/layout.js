import React from 'react';
import background from '../../assets/background/background.jpg'
import Auth from '../../containers/Auth/auth';
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
            <Auth />
        </main>
    )
}

export default Layout
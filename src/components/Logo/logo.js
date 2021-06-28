import React from 'react';
import logoImage from '../../assets/logo/logo.png';
import classes from './logo.module.css'

const Logo = () => {
    const logo = (
        <div className={classes.logo} >
            <img
            src={logoImage}
            alt='logo'
            />
        </div>
    )

    return(
        logo
    )
}

export default Logo;
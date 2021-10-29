import React from 'react';
import logoImage from '../../assets/logo/logo.png';
import classes from './logo.module.css'

const Logo = () => {
    // const logo = (
    //     <div className={classes.logo} >
    //         <img
    //         src={logoImage}
    //         alt='logo'
    //         />
    //     </div>
    // )
    const logo = [];
    const title = 'CRAYONS';
    const colors = ['rgb(84, 167, 255)' , 'rgb(131, 238, 255)' , 'orange' , 'rgb(255, 238, 85)' , 'rgb(150, 220, 114)' , 'orange' , 'rgb(162, 223, 223)'];
    for( let i = 0 ; i < title.length ; i++ ){
        logo.push(
            <div 
            key={`logo-letters-${colors[i]}-${Math.random()*100000}`}
            style={{ color : colors[i] }} 
            className={classes.roll}
            >
                {title[i]}
            </div>
        )
    }

    return (
        <div className={classes.logo} >
            {logo}
        </div>
    )

}

export default Logo;
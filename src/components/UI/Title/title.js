import React from 'react';
import classes from './title.module.css'

const Title = (props) => {
    const titleCard = (
        <h3 className={classes.title} >  
            {props.children}
        </h3>
    )
    return(
        titleCard
    )
}

export default Title;
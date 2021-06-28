import React from 'react';
import classes from './card.module.css';

const Card = (props) => {

    const card=(
        <div className={classes.card} >
            {props.children}
        </div>
    )
    return(
        card
    )
}

export default Card;

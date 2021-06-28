import React from 'react';
import classes from './card.module.css';

const Card = (props) => {

    const {style} = props;

    const card=(
        <div className={classes.card} style={style} >
            {props.children}
        </div>
    )
    return(
        card
    )
}

export default Card;

import React from 'react';
import { formatTimer } from '../../util/util';
import classes from './info.module.css';

const Info = (props) => {

    const {cround , rounds , timer , hint} = props;

    const infoCard = (
        <div className={classes.info} >
            <span>{formatTimer(timer)}</span>
            <span>{`Round ${cround} of ${rounds}`}</span>
            <span style={{ fontSize : '1.1rem' , letterSpacing : '1rem' }} >{hint}</span>
        </div>
    )
    return(
        infoCard
    )
}

export default Info;
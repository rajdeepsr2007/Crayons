import React from 'react';
import Card from '../../../UI/Card/card';
import Alert from '../../../../components/Play/Alerts/Alert/index';
import classes from './choose-word.module.css';

const ChooseWord = (props) => {

    const {options , onClick} = props;
    const optionObjects = options.map(option => {
        return(
            <div 
            key={option}
            onClick={() => onClick(option)}
            className={classes.option} >
                {option}
            </div>
        )
    })

    const cardStyle = { width : '30rem' , height : '3rem' , opacity : '100%' , minHeight : '10rem'}
    const chooseWordCard = (
        <Card style={cardStyle} >
            <h2>Choose a word to draw</h2>
            <div className={classes.options} >
                {optionObjects}
            </div>
        </Card>
    )
    return(
        <Alert>
            {chooseWordCard}
        </Alert>
    )
}

export default ChooseWord;
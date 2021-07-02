import React from 'react';
import Card from '../../../UI/Card/card';
import Button from '../../../Inputs/Button/button';
import Alert from '../../../Feedback/Alert/alert';

const Error = (props) => {
    const goToMenuButton = (
        <Button
        style={{ margin : '0' }}
        onClick={
            () => props.history.replace('/menu')
        }
        >
            Menu
        </Button>
    )
    const findRoomsButton = (
        <Button
        style={{ margin : '0.5rem' }}
        onClick={
            () => props.history.replace('/find-rooms')
        }
        >
            Find Another Room
        </Button>
    )
    const errorCard = (
        <Card>
            <Alert type="error">
                {props.children}
            </Alert>
            {findRoomsButton}
            {goToMenuButton}
        </Card>
    )
    return(
        errorCard
    )
}

export default Error;
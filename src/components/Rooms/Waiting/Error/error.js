import React from 'react';
import Card from '../../../UI/Card/card';
import Button from '../../../Inputs/Button/button';
import Alert from '../../../Feedback/Alert/alert';

const Error = (props) => {
    const goToMenuButton = (
        <Button
        onClick={
            () => props.history.replace('/menu')
        }
        >
            Menu
        </Button>
    )
    const errorCard = (
        <Card>
            <Alert type="error">
                {props.children}
            </Alert>
            {goToMenuButton}
        </Card>
    )
    return(
        errorCard
    )
}

export default Error;
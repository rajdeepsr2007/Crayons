import React, { useReducer } from 'react';
import Card from '../../../components/UI/Card/card';
import Logo from '../../../components/Logo/logo';
import initialState from './initialState';
import controlsReducer from './controlsReducer';
import CustomInputs from '../../../components/Inputs/custom-inputs';
import Alert from '../../../components/Feedback/Alert/alert';
import Button from '../../../components/Inputs/Button/button';

const CreateRoom = (props) => { 
    
    const [controls , dispatchControls] = useReducer(
        controlsReducer,
        initialState
    )

    const alert = (
        <Alert type='success' >
            Create Custom Room
        </Alert>
    )

    const onChange = (control,event) => {
        if( control === 'rounds' ){
            dispatchControls({
                type : 'Rounds',
                event
            })
        }else{
            dispatchControls({
                type : 'Words',
                event
            })
        }
    }

    const Inputs = (
        <CustomInputs
        controls={{ ...controls.controls }}
        onChange={onChange}
        />
    )

    const createRoomButton = (
        <Button>
            Create Room
        </Button>
    )

    const createRoomCard = (
        <Card style={{
            width : '25%',
            height : '36rem',
            minWidth : '20rem'
        }} >
            <Logo />
            {alert}
            {Inputs}
            {createRoomButton}
        </Card>
    )

    return(
        createRoomCard
    )
}

export default CreateRoom;
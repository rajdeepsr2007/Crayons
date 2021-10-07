import React, { Fragment, useReducer } from 'react';
import Logo from '../../components/Logo/logo';
import Card from '../../components/UI/Card/card';
import Button from '../../components/Inputs/Button/button';
import controlsReducer from './controlsReducer';
import initialState from './initialState';
import CustomInputs from '../../components/Inputs/custom-inputs';

const Menu = (props) => {

    const [controls , dispatchContols] = useReducer(
        controlsReducer ,
        initialState
    )

    const onChange = (control , event) => {
        dispatchContols({ 
            type : 'Change',
            event
         })
    }

    const navigate = (url) => {
        props.history.push(
            url
        )
    }

    const buttonStyle = {
        padding : '1rem',
        margin : '1rem 0'
    }

    const playButton = (
        <Button 
        onClick={
            () => navigate('/find-rooms')
        }
        style={{
            ...buttonStyle,
        }}
        >
            Play
        </Button>
    )
    const createRoomButton = (
        <Button 
        onClick={() => navigate('/create-room')}
        style={{
            ...buttonStyle,
        }}
        color='blue'
        >
            Create Custom Room
        </Button>
    )

    const onJoinRoomHandler = () => {
        const roomId = controls.controls.join.value;
        if( roomId === '' ){
            return;
        }else{
            props.history.push(`/waiting/${roomId}`)
        }
    }

    const joinRoomButton = (
        <Fragment>
            <Button style={{
            ...buttonStyle,
            }}
            onClick={onJoinRoomHandler}
            color='green'
            >
                Join Room
            </Button>
            <CustomInputs
            controls={{ ...controls.controls }}
            onChange={onChange}
            />  
        </Fragment>
    )
    const menu = (
        <Card style={{ width : '20rem' }} >
            <Logo />
            {playButton}
            {createRoomButton}
            {joinRoomButton}
        </Card>
    )
    return(
        menu
    )
}

export default Menu;
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
        <Button style={{
            ...buttonStyle,
            background : 'yellow',
        }}>
            Play
        </Button>
    )
    const createRoomButton = (
        <Button 
        onClick={() => navigate('/create-room')}
        style={{
            ...buttonStyle,
            background : 'orange'
        }}>
            Create Custom Room
        </Button>
    )
    console.log(controls);
    const joinRoomButton = (
        <Fragment>
            <Button style={{
            ...buttonStyle,
            background : 'green'
            }}>
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
import React, { Fragment, useReducer } from 'react';
import Logo from '../../components/Logo/logo';
import Card from '../../components/UI/Card/card';
import Button from '../../components/Inputs/Button/button';
import controlsReducer from './controlsReducer';
import initialState from './initialState';
import CustomInputs from '../../components/Inputs/Custom Inputs/custom-inputs';
import Avatar from '../../components/Avatar/avatar';
import {connect} from 'react-redux';


const Menu = (props) => {

    const [controls , dispatchContols] = useReducer(
        controlsReducer ,
        initialState
    )

    const {userObject} = props;
    const editButtonStyle={
        width : 'auto',
        borderRadius : '50%',
        padding : '2rem 3rem'
    }

    const editAvatarButton = (
       <Button
       style={editButtonStyle}
       onClick={() => navigate('/edit')}
       >
           <Avatar
           user={userObject}
           />
       </Button>
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
            {editAvatarButton}
        </Card>
    )
    return(
        menu
    )
}

const mapStateToProps = state => {
    return{
        userObject : state.auth.userObject
    }
}

export default connect(mapStateToProps)(Menu);
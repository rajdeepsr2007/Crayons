import React, { useReducer } from 'react';
import Card from '../../../components/UI/Card/card';
import Logo from '../../../components/Logo/logo';
import initialState from './initialState';
import controlsReducer from './controlsReducer';
import CustomInputs from '../../../components/Inputs/custom-inputs';
import Alert from '../../../components/Feedback/Alert/alert';
import Button from '../../../components/Inputs/Button/button';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/';
import Loader from '../../../components/UI/Loader/loader';

const CreateRoom = (props) => { 
    
    const [controls , dispatchControls] = useReducer(
        controlsReducer,
        initialState
    )

    const onCreateRoom = () => {
        props.onCreateRoom(
            controls.controls.rounds.value ,
            controls.controls.drawingTime.value, 
            controls.controls.words.value,
            props.user
        )
    }

    const alert = (
        <Alert type='success' >
            Create Custom Room
        </Alert>
    )

    const error = (
        props.error ?
        <Alert type='error'>
            {props.error}
        </Alert>
        : null
    )

    

    const onChange = (control,event) => {
        if( control === 'rounds' ){
            dispatchControls({
                type : 'Rounds',
                event
            })
        }else if(control === 'words'){
            dispatchControls({
                type : 'Words',
                event
            })
        }else{
            dispatchControls({
                type : 'drawingTime',
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
        <Button
        onClick={
            props.loading ?
            () => {}
            : onCreateRoom
        }
        >
           {
               props.loading ?
               <Loader />
               : 'Create Room'
           }
        </Button>
    )

    const createRoomCard = (
        <Card style={{
            width : '25%',
            height : 'auto',
            minWidth : '20rem'
        }} >
            <Logo />
            {alert}
            {Inputs}
            {error}
            {createRoomButton}
        </Card>
    )

    return(
        createRoomCard
    )
}

const mapStateToProps = state => {
    return{
        loading : state.room.creating ,
        error : state.room.error ,
        roomId : state.room.createdRoomId ,
        user : state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onCreateRoom : (rounds , drawingTime , words , user ) => dispatch(actions.createRoom(rounds , drawingTime , words , user))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(CreateRoom);
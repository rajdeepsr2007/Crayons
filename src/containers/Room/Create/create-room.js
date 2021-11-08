import React, { useEffect, useReducer } from 'react';
import Card from '../../../components/UI/Card/card';
import Logo from '../../../components/Logo/logo';
import initialState from './initialState';
import controlsReducer from './controlsReducer';
import CustomInputs from '../../../components/Inputs/Custom Inputs/custom-inputs';
import Alert from '../../../components/Feedback/Alert/alert';
import Button from '../../../components/Inputs/Button/button';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/';
import Loader from '../../../components/UI/Loader/loader-small';

const CreateRoom = (props) => { 
    
    const [controls , dispatchControls] = useReducer(
        controlsReducer,
        initialState
    )

    const {roomId , history , reset} = props;

    useEffect( () => {
        if( roomId ){
            history.replace(`/waiting/${roomId}`)
        }
    } , [roomId , history] )

    useEffect( () => {
        reset();
    } , [reset])

    const onCreateRoom = () => {
        props.onCreateRoom(
            controls.controls.rounds.value ,
            controls.controls.drawingTime.value, 
            controls.controls.words.value,
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

    const backButton = (
        <Button 
        onClick={
            () => props.history.goBack()
        }
        style={{
            transform : 'scale(1)',
            margin : '0 0 1rem 0'
        }}>
            {'< Back'}
        </Button>
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
            {backButton}
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
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onCreateRoom : (rounds , drawingTime , words ) => dispatch(actions.createRoom(rounds , drawingTime , words )),
        reset : () => dispatch(actions.resetRoom())
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(CreateRoom);
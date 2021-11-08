import React , {Fragment, useEffect, useReducer, useState} from 'react';
import initialState from './initialControlsState';
import CustomInputs from '../../components/Inputs/Custom Inputs/custom-inputs';
import Card from '../../components/UI/Card/card';
import Logo from '../../components/Logo/logo';
import Button from '../../components/Inputs/Button/button';
import Avatar from '../../components/Avatar/avatar';
import Alert from '../../components/Feedback/Alert/alert';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/';
import Loader from '../../components/UI/Loader/loader-small';
import controlsReducer from './controlsReducer';

const Auth = (props) => {

    const [controls , dispatchControls] = useReducer(
        controlsReducer ,
        initialState
    )
    const [showErrors , setShowErrors] = useState(false);

    useEffect( () => {
        if( props.success ){
            setTimeout(() => {
                props.history.replace('/menu')
            },5000)
        }
    } , [props.success , props.history] )


    const onChange = (control , event) => {
        setShowErrors(false);
        dispatchControls({
            type : 'Change',
            control : control ,
            event : event
        })
    }

    const Inputs = <CustomInputs
                    controls={controls}
                    onChange={onChange}
                    showErrors={showErrors}
                    />

    const authUser = () => {
        for( const control in controls ){
            if( controls[control].error ){
                setShowErrors(true);
                return;
            }
        }
        props.onAuthUser(
            controls.username.value,
            controls.password.value
        )
    }

    const joinButton = (
        <Button 
            onClick={
                !props.loading ? () => authUser() : () => {}
            } 
        >
            {props.loading ? <Loader /> : 'Join'}
        </Button>
    )

    let alert = (
        <Alert type="success" >
            New account can be created by using an unused username
        </Alert>
    )

    alert = 
        props.error ?
        <Alert type="error" >
            {props.error}
        </Alert>
        : alert
    
    alert = 
        props.success && !props.error ?
        <Alert type="success" >
            {props.success}
        </Alert>
        : alert
    

    const authCard = (
       <Card style={{ width : '20rem' }} >
           <Logo />
           {Inputs}
           {alert}
           {joinButton}
       </Card>
    )



    return(
        <Fragment>
            {authCard}
        </Fragment>
    )

}

const mapStateToProps = state => {
    return{
        loading : state.auth.loading,
        error : state.auth.error,
        success : state.auth.success
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuthUser : (username , password) => dispatch(actions.authUser(username , password))
    }
}


export default connect(mapStateToProps , mapDispatchToProps )(Auth);
import React , {Fragment, useReducer, useState} from 'react';
import initialState from './initialControlsState';
import CustomInputs from '../../components/Inputs/custom-inputs';
import Card from '../../components/UI/Card/card';
import Logo from '../../components/Logo/logo';
import Button from '../../components/Inputs/Button/button';
import Avatar from '../../components/Avatar/avatar';
import Alert from '../../components/Feedback/Alert/alert';

const reducer = (state,action) => {
    switch(action.type){

        case 'Change' : 
        const updatedControls = {};
        for( const control in state ){
            updatedControls[control] = {...state[control]}
        }
        updatedControls[action.control].value = action.event.target.value;
        return updatedControls;

        default : 
            return state
    }
}

const Auth = (props) => {

    const [controls , dispatchControls] = useReducer(
        reducer ,
        initialState
    )

    const [loading] = useState(true)

    const onChange = (control , event) => {
        dispatchControls({
            type : 'Change',
            control : control ,
            event : event
        })
    }

    const Inputs = <CustomInputs
                    controls={controls}
                    onChange={onChange}
                    />

    const joinButton = (
        <Button>
            Join
        </Button>
    )

    const alert = (
        <Alert type="success" >
            New account can be created by using an unused username
        </Alert>
    )

    const authCard = (
       <Card style={{ width : '20rem' }} >
           <Logo />
           {Inputs}
           {alert}
           <Avatar />
           {joinButton}
       </Card>
    )



    return(
        <Fragment>
            {authCard}
        </Fragment>
    )

}

export default Auth;
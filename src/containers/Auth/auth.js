import React , {Fragment, useReducer} from 'react';
import initialState from './initialControlsState';
import CustomInputs from '../../components/Inputs/custom-inputs';
import Card from '../../components/UI/Card/card';

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

    const onChange = (control , event) => {
        dispatchControls({
            type : 'Change',
            control : control ,
            event : event
        })
    }

    console.log(controls);

    const Inputs = <CustomInputs
                    controls={controls}
                    onChange={onChange}
                    />

    const authCard = (
       <Card>
           {Inputs}
       </Card>
    )

    return(
        <Fragment>
            {authCard}
        </Fragment>
    )

}

export default Auth;
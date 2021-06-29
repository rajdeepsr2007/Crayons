const controlsReducer = (state,action) => {
    let updatedControls;
    switch(action.type){
        case 'Change' : 
            updatedControls = {};
            for( const control in state ){
                updatedControls[control] = {...state[control]}
            }
            updatedControls[action.control].value = action.event.target.value;
            if( updatedControls[action.control].value === '' ){
                updatedControls[action.control].error = 'Username cannot be empty'
            }else{
                updatedControls[action.control].error = null
            }

            return updatedControls;
        
        default : 
            return state
    }
}

export default controlsReducer;
const controlsReducer = (state , action) => {
    let updatedState;
    switch( action.type ){
        case 'Rounds' : 
            updatedState = {
                controls : {
                    rounds : {
                        ...state.controls['rounds']
                    },
                    words : {
                        ...state.controls['words'],
                        value : [...state.controls['words'].value]
                    }
                }
            }
            updatedState.controls['rounds'].value = action.event.target.value;
            return updatedState;

        case 'Words' :
            updatedState = {
                controls : {
                    rounds : {
                        ...state.controls['rounds']
                    },
                    words : {
                        ...state.controls['words'],
                        value : []
                    }
                }
            }
            updatedState.controls['words'].value = action.event.target.value.split(' ');
            return updatedState; 
        
        default :
            return state;
    }
}

export default controlsReducer;
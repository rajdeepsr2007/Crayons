const controlsReducer = (state , action) => {
    let updatedState;
    switch( action.type ){
        case 'Rounds' : 
            updatedState = {
                controls : {
                    rounds : {
                        ...state.controls['rounds']
                    },
                    drawingTime : {
                        ...state.controls['drawingTime']
                    },
                    words : {
                        ...state.controls['words'],
                        value : [...state.controls['words'].value]
                    },
                    
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
                    drawingTime : {
                        ...state.controls['drawingTime']
                    },
                    words : {
                        ...state.controls['words'],
                        value : []
                    },
                    
                }
            }
            updatedState.controls['words'].value = action.event.target.value.split(' ');
            return updatedState; 

        case 'drawingTime' : 
            updatedState = {
                controls : {
                    rounds : {
                        ...state.controls['rounds']
                    },
                    drawingTime : {
                        ...state.controls['drawingTime']
                    },
                    words : {
                        ...state.controls['words'],
                        value : []
                    },
                    
                }
            }
            updatedState.controls['drawingTime'].value = action.event.target.value;
            return updatedState;
        
        default :
            return state;
    }
}

export default controlsReducer;
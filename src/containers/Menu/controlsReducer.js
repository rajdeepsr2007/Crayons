const controlsReducer = (state , action) => {
    let controls;
    switch( action.type ){
        case 'Switch':
            controls = {
                ...state ,
                join : {
                    ...state['join']
                }
            }
            controls['play'] = !controls['play'];
            return controls;

        case 'Change':
            controls = {
                ...state,
                controls : {
                    join : {
                        ...state.controls['join']
                    }
                }
            }
            controls.controls['join'].value = 
            action.event.target.value
            return controls;    

        default :
            return state;
    }
}

export default controlsReducer;
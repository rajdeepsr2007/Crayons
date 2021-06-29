const initialState = {
    controls : {
        rounds : {
            label : 'Rounds',
            type : 'number',
            value : 3 ,
            placeholder : 'Rounds',
            max : 10,
            min : 1
        } ,
        words : {
            type : 'textarea',
            value : [],
            placeholder : 'Custom Words...'
        }
    }
}

export default initialState;
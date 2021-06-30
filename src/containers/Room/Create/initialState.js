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
        drawingTime : {
            label : 'Drawing Time',
            type : 'number',
            value : 60 ,
            placeholder : 'Drawing Time',
            max : 180 ,
            min : 60 ,
            step : 20
        },
        words : {
            type : 'textarea',
            value : [],
            placeholder : 'Custom Words...'
        }
    }
}

export default initialState;
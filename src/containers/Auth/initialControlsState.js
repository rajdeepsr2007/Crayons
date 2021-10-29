const initialState = {
    username : {
        value : '',
        type : 'text',
        error : 'Username cannot be empty',
        success : null ,
        placeholder : 'Username or Email'
    },
    password : {
        value : '',
        type : 'password' ,
        error : 'Password cannot be empty' ,
        success : null,
        placeholder : 'Password',
    },
}

export default initialState;
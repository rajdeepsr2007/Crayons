import React, { useEffect } from 'react';
import Search from './Search/search';
import * as actions from '../../../store/actions';
import {connect} from 'react-redux';

const Users = (props) => {

    const {userSocket , onUpdateUsers } = props;
    useEffect(() => {
        if(userSocket){
            userSocket.on('users-update' , data => {
                onUpdateUsers(data);
            });
        }
    } , [] );

    return(
        <Search
        userSocket={userSocket}
        />
    )
}

const mapDispatchToProps = dispatch => {
    return{
        onUpdateUsers : (data) => dispatch(actions.updateUsers(data)) 
    }
}

export default connect( null , mapDispatchToProps)(Users);
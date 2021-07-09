import React, { Fragment, useEffect } from 'react';
import Search from './Search/search';
import * as actions from '../../../store/actions';
import {connect} from 'react-redux';
import UserFriends from './User Friends/user-friends';

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
        <Fragment>
            <UserFriends
            userSocket={userSocket}
            />
             <Search
            userSocket={userSocket}
            />
        </Fragment>
        
    )
}

const mapDispatchToProps = dispatch => {
    return{
        onUpdateUsers : (data) => dispatch(actions.updateUsers(data)) 
    }
}

export default connect( null , mapDispatchToProps)(Users);
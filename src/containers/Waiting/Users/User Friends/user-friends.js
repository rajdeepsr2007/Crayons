import React, { useEffect, useState } from 'react';
import Card from '../../../../components/UI/Card/card';
import Title from '../../../../components/UI/Title/title';
import * as actions from '../../../../store/actions/';
import Alert from '../../../../components/Feedback/Alert/alert';
import Loader from '../../../../components/UI/Loader/loader-big';
import Users from '../../../../components/Users/users';
import {connect} from 'react-redux';

const UserFriends = (props) => {
    const {onLoadUsers , user , error , loading , users , userSocket , room } = props;
    const [emitted , setEmitted] = useState(false);
    useEffect(() => {
        if( !users  ){
            onLoadUsers(
                {
                    type : 'friends' ,
                    value : user
                },
                user
            )
        }   
    },[]);

    useEffect(() => {
        if( !emitted && !loading && users && users.length > 0 ){
            const userIds = users.map(user => user._id);
            userSocket.emit('join-rooms' , { userIds })
            setEmitted(true);
        }
    },[users])

    const cardStyle = {
        margin : '2rem 0 0 2rem',
        paddingTop : '0',
        width : 'auto',
        height : 'auto'
    }

    const onInviteUser = (userId) => {
        userSocket.emit('invite-user' , {
            userId ,
            roomId : room.roomId, 
            user
        })
    }

    let content = null;
    if( error ){
        content = <Alert type="error">error</Alert>
    }else if( loading || !users ){
        content = <Loader />
    }else{
        content = <Users users={users} invite onClick={onInviteUser}/>
    }

    const userFriendsCard = (
        <Card style={cardStyle} >
            <Title>Friends</Title>
            {content}
        </Card>
    )

    return(
        userFriendsCard
    )
}

const mapStateToProps = state => {
    return{
        loading : state.users.loading.friends ,
        user : state.auth.user ,
        error : state.users.error.friends ,
        users : state.users.users.friends ,
        room : state.waiting.room
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLoadUsers : (filter , userId) => dispatch(actions.loadUsers(filter , userId)),
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(React.memo(UserFriends));
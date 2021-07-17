import React from 'react';
import Card from '../../../components/UI/Card/card';
import Title from '../../../components/UI/Title/title';
import Players from '../../../components/Play/Players';
import {connect} from 'react-redux';

const Users = (props) => {

    const cardStyle={margin : '0 2rem 2rem 2rem' , paddingTop : '0' }
    const {users , turn , scores , user , admin , socket , roomId } = props;
    const onRemoveUser = (userId) => {
        socket.emit('remove-user',{
            user : userId,
            roomId
        })

        return () => {
            socket.off('remove-user');
        }
    }
    const usersCard = (
        <Card
        style={cardStyle}
        >
            <Title>Players</Title>
            <Players 
            users={users}
            turn={turn} 
            scores={scores}
            iadmin={user===admin}
            onRemoveUser={onRemoveUser}
            />
        </Card>
    )
    return(
        usersCard
    )
}

const mapStateToProps = state => {
    return{
        users : state.waiting.room.users,
        turn :  state.waiting.room.turn, 
        scores : state.waiting.room.scores,
        user : state.auth.user ,
        admin : state.waiting.room.admin ,
        roomId :  state.waiting.room.roomId
    }
}

export default connect(mapStateToProps)(Users);
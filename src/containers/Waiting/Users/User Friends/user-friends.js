import React from 'react';
import Card from '../../../../components/UI/Card/card';
import Title from '../../../../components/UI/Title/title';

const UserFriends = (props) => {

    const cardStyle = {
        margin : '2rem 0 0 2rem',
        paddingTop : '0',
        width : '15rem',
        height : 'auto'
    }
    const userFriendsCard = (
        <Card style={cardStyle} >
            <Title>Friends</Title>
        </Card>
    )

    return(
        userFriendsCard
    )
}

export default UserFriends;
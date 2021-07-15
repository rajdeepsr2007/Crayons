import React from 'react';
import Card from '../../../components/UI/Card/card';
import Title from '../../../components/UI/Title/title';
import Players from '../../../components/Play/Players';

const Users = (props) => {

    const cardStyle={margin : '0 2rem 2rem 2rem' , paddingTop : '0' }
    const {users , turn } = props;
    const usersCard = (
        <Card
        style={cardStyle}
        >
            <Title>Players</Title>
            <Players 
            users={users}
            turn={turn} 
            />
        </Card>
    )
    return(
        usersCard
    )
}

export default Users;
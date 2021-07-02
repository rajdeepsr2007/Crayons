import React from 'react';
import Card from '../../../UI/Card/card';
import Title from '../../../UI/Title/title';

const Users = (props) => {
    const usersCard = (
        <Card style={{ 
            width : '80%',
            height : '25rem',
            margin : '2rem 0 0 0',
            paddingTop : '0'
        }} >
            <Title>
                Players
            </Title>
        </Card>
    )
    return (
        usersCard
    )
}

export default Users;
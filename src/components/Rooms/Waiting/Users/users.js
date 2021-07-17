import React from 'react';
import Card from '../../../UI/Card/card';
import Title from '../../../UI/Title/title';
import User from './User/user';
import classes from './users.module.css';

const Users = (props) => {

    const {users , admin } = props.room;
    const {iuser , onMakeHost , onRemoveUser } = props;
    const userObjects = users.map( user => {
        return(
            <User
            key={user._id}
            admin={admin}
            user={user}
            iadmin={iuser === admin}
            onMakeHost={onMakeHost}
            onRemoveUser={onRemoveUser}
            />
        )
    })

    const usersCard = (
        <Card style={{ 
            width : '12rem',
            height : '25rem',
            margin : '2rem 0 0 0',
            paddingTop : '0'
        }} >
            <Title>
                Players {`(${users.length})`}
            </Title>
            <div className={classes.users} >
                {userObjects}
            </div>
        </Card>
    )
    return (
        usersCard
    )
}

export default Users;
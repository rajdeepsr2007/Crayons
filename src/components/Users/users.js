import React, { Fragment } from 'react';
import Alert from '../Feedback/Alert/alert';
import User from './User/user';
import classes from './users.module.css';

const Users = (props) => {

    const {users , onClick} = props;
    if( !users || users.length === 0 ){
        return(
            <div>
                <Alert type="success">
                    0 Results
                </Alert>
            </div>
        )
    }
    const userObjects = users.map(user => {
        return <User key={user._id} user={user} onClick={onClick}  />
    })
    return(
     
            <div className={classes.users} >
                {userObjects}
            </div>
      
        
    )
}

export default Users;
import React from 'react';
import Avatar from '../../../Avatar/avatar';
import { rankUsers } from '../../../util/util';
import Alert from '../Alert';
import classes from './show-results.module.css';

const ShowResults = (props) => {
    const {users , scores} = props;
    let rankedUsers = rankUsers(users , scores);
    const userObjects = rankedUsers.map( user => {
        return(
            <div key={user._id} className={classes.user} >
                <Avatar user={user} />
                <span className={classes.label} >{'# ' +  user.label}</span>
                <span>{user.username}</span>
                <span>{scores[user._id].overall}</span>
            </div>
        )
    })
    return(
        <Alert>
            {userObjects}
        </Alert>
    )
}

export default ShowResults;
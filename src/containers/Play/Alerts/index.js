import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import TextAlert from '../../../components/Play/Alerts/Text Alert';
import ChooseWord from '../../../components/Play/Alerts/Choose Word/choose-word';
import ShowScores from '../../../components/Play/Alerts/Show Scores';
import ShowResults from '../../../components/Play/Alerts/Show Results/show-results';
import { withRouter } from 'react-router';

const Alerts = (props) => {
    const [showAlert , setShowAlert] = useState(false);
    const [alert , setAlert] = useState(null);
    const { turn , cround , wordOptions  , user , socket , roomId , drawing , users , scores} = props;

    const onSelectWord = (word) => {
        socket.emit('select-word',{
            word ,
            roomId 
        })
        setShowAlert(false);
    }

    useEffect(() => {
        socket.on('show-scores',(data) => {
            const alertObject = (
                <ShowScores 
                scores={data.scores}
                users={users}
                word={data.word}
                />
            );
            setAlert(alertObject);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            },2000);
        })

        socket.on('game-end' , () => {
            const alertObject = (
                <ShowResults
                users={users}
                scores={scores}
                />
            );
            setAlert(alertObject);
            setShowAlert(true);
            setTimeout(() => {
                props.history.replace('/find-rooms');
            },5000)
        })

        return () => {
            socket.off('show-scores');
        }
    },[])

    useEffect(() => {
        const alertText = `Round ${cround}`;
        const alertObject = (
            <TextAlert>
                {alertText}
            </TextAlert>
        );
        setAlert(alertObject);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        },1000);
    },[cround]);

    useEffect(() => {
        if( turn === user ){
            const alertObject = (
                <ChooseWord 
                options={wordOptions}
                onClick={onSelectWord}
                />
            )
            setAlert(alertObject);
            setShowAlert(true);
        }
    },[turn , user , wordOptions])

    useEffect(() => {
        if( turn !== user && drawing ){
            const username = users.find( user => user._id === turn ).username;
            const alertText = `${username} is now drawing`;
            const alertObject = (
                <TextAlert>
                    {alertText}
                </TextAlert>
            );
            setAlert(alertObject);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            },2000);
        }
    },[drawing])


    return(
        showAlert ? alert : null
    )
}

const mapStateToProps = state => {
    return{
        turn : state.waiting.room.turn ,
        cround : state.waiting.room.cround ,
        users : state.waiting.room.users,
        wordOptions : state.waiting.room.wordOptions,
        user : state.auth.user,
        roomId : state.waiting.room.roomId ,
        drawing : state.waiting.room.drawing,
        scores : state.waiting.room.scores
    }
}

export default connect(mapStateToProps)(withRouter(Alerts));
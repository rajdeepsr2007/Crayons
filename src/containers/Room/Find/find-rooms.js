import React , {useEffect} from 'react';
import Card from '../../../components/UI/Card/card';
import Button from '../../../components/Inputs/Button/button';
import * as actions from '../../../store/actions/';
import {connect} from 'react-redux';

const FindRooms = (props) => {

    useEffect(() => {
        if( props.rooms.length === 0 ){
            props.onFindRooms()
        }
    } , [])

    const backButton = (
        <Button 
        onClick={
            () => props.history.goBack()
        }
        style={{
            transform : 'scale(0.9)',
            margin : '0 0 1rem 0'
        }}>
            {'< Back'}
        </Button>
    )

    const roomsCard = (
        <Card style={{
            justifyContent : 'space-between'
        }}>
            <h3>Rooms</h3>
            {backButton}
        </Card>
    )

    return(
        roomsCard
    )
}

const mapStateToProps = state => {
    return{
        loading : state.room.creating ,
        error : state.room.error, 
        rooms : state.room.rooms,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFindRooms : () => dispatch(actions.findRooms())
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(FindRooms);
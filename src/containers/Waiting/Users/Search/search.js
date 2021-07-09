import React, { useEffect, useState } from 'react';
import Card from '../../../../components/UI/Card/card';
import Title from '../../../../components/UI/Title/title';
import CustomInputs from '../../../../components/Inputs/custom-inputs';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Loader from '../../../../components/UI/Loader/loader-big';
import Alert from '../../../../components/Feedback/Alert/alert';
import Users from '../../../../components/Users/users';

const Search = (props) => {

    const [controls , setControls] = useState({
        search : {
            value : '',
            type : 'text',
            placeholder : 'Search...',
            timeout : null,
            old : ''
        }
    })

    const [emitted , setEmitted] = useState(true);

    const {onSearch , loading , error , users , userSocket } = props;

    useEffect(() => {
        if( !emitted && !loading){
            const userIds = users.map(user => user._id);
            userSocket.emit('join-rooms', {userIds})
            setEmitted(true);
        }
    } , [users])

    const onChange = (control , event) => {
        const updatedControls = {...controls, search : {...controls.search , value : event.target.value }};
        if( controls.search.timeout ){
            clearTimeout(controls.search.timeout);
        }
        let updatedTimeOut = null;
        if( event.target.value !== '' ){
            setEmitted(false);
            updatedTimeOut = setTimeout(() => {
                onSearch(
                    {
                        type : 'search',
                        value : event.target.value
                    }
                )
            } , 2000);  
        }
        updatedControls.search.timeout = updatedTimeOut;
        setControls(updatedControls);
    }

    
    const searchCardStyle = {
        margin : '2rem 0 0 2rem',
        paddingTop : '0',
        width : 'auto',
        height : 'auto'
    }
    const input = <CustomInputs 
                   controls={controls}
                   onChange={onChange}
                   />  

    const content = loading ?
                    <Loader />
                    : error ? 
                    <Alert type="error">{error}</Alert>
                    : <Users users={users} />
                      
    const searchCard = (
        <Card
        style={searchCardStyle}
        >
            <Title>Search</Title>
            {input}
            {content}
        </Card>
    )
    return(
        searchCard
    )
}

const mapStateToProps = state => {
    return{
        users : state.users.users.search,
        loading : state.users.loading.search,
        error : state.users.error.search,

    }
}

const mapDispatchToProps = dispatch => {
    return{
        onSearch : (filter) => dispatch(actions.loadUsers(filter))
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(Search);
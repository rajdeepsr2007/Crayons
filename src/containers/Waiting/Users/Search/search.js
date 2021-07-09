import React, { useState } from 'react';
import Card from '../../../../components/UI/Card/card';
import Title from '../../../../components/UI/Title/title';
import CustomInputs from '../../../../components/Inputs/custom-inputs';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Loader from '../../../../components/UI/Loader/loader-big';
import Alert from '../../../../components/Feedback/Alert/alert';

const Search = (props) => {

    const [controls , setControls] = useState({
        search : {
            value : '',
            type : 'text',
            placeholder : 'Search...',
            timeout : null
        }
    })

    const {onSearch , loading , error} = props;

    const onChange = (control , event) => {
        const updatedControls = {...controls, search : {...controls.search , value : event.target.value } };
        if( controls.search.timeout ){
            clearTimeout(controls.search.timeout);
        }
        let updatedTimeOut = null;
        if( event.target.value !== '' ){
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
    }
    const input = <CustomInputs 
                   controls={controls}
                   onChange={onChange}
                   />  

    const content = loading ?
                    <Loader />
                    : error ? 
                    <Alert type="error">{error}</Alert>
                    : null
                      
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
        error : state.users.error.search
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onSearch : (filter) => dispatch(actions.loadUsers(filter))
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(Search);
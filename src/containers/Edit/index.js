import { connect } from "react-redux";
import Card from "../../components/UI/Card/card";
import Avatar from '../../components/Avatar/avatar';
import Button from '../../components/Inputs/Button/button';
import classes from './edit.module.css';
import { useState  ,  Fragment } from "react";
import Logo from '../../components/Logo/logo';
import * as actions from '../../store/actions/index';

const Edit = (props) => {

    const {userObject , onSaveAvatar , token , userId} = props;
    const avatarStyle={ 
        transform : 'scale(1.5)' ,
        margin : '3rem 0',
        width : 'auto'
    }

    const [editableAvatar , setEditableAvatar] = useState(userObject.avatar);

    const onChangeAvatar = (avatar) => {
        setEditableAvatar(avatar);
    }

    const onSaveChanges = () => {
        var i = 0 ;
        for( i = 0 ; i < editableAvatar.length ; i++ )
            if( userObject.avatar[i] !== editableAvatar[i] )
                break;
        if( i === editableAvatar.length )
            return;
        onSaveAvatar( userId  , token , editableAvatar );
    }

    const backButton = (
        <Button
        onClick={() => props.history.replace('/menu')}
        color='blue'
        style={{ margin : '1rem 0' }}
        >
         Back   
        </Button>
    )

    const uploadProfilePicture = (
        <Button
        style={{ margin : '1rem 0 0 0' }}
        >
            Upload 
        </Button>
    )

    const saveChangesButton = (
        <Button
        onClick={() => onSaveChanges()}
        style={{ margin : '0.5rem 0' }}
        >
            Save Changes
        </Button>
    )

    const cardStyle={margin : '0 2rem 2rem 2rem' , paddingTop : '0' }
    return (
        <Fragment>
            <Card
            style={cardStyle}
            >
                <Logo />
                <div style={{ marginTop : '5rem' }} >
                    <Avatar 
                    edit
                    onChange={onChangeAvatar}
                    user={userObject}
                    style={avatarStyle}
                    />
                </div>
                <span 
                className={classes.username} >
                    {userObject.username}
                </span>
                {uploadProfilePicture}
                {saveChangesButton}
                {backButton}
            </Card>
           
        </Fragment>
        
    )
}

const mapStateToProps = state => {
    return {
        token : state.auth.token ,
        userId : state.auth.user ,
        userObject : state.auth.userObject
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onSaveAvatar : (userId , token , avatar) => dispatch(actions.changeAvatar(userId , token , avatar))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Edit);
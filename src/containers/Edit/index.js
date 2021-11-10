import { connect } from "react-redux";
import Card from "../../components/UI/Card/card";
import Avatar from '../../components/Avatar/avatar';
import Button from '../../components/Inputs/Button/button';
import classes from './edit.module.css';
import { useState  ,  Fragment } from "react";
import Logo from '../../components/Logo/logo';
import * as actions from '../../store/actions/index';
import ImageInput from "../../components/Inputs/Image";
import baseURL from "../../baseURL";
import Loader from '../../components/UI/Loader/loader-big';

const Edit = (props) => {

    const {userObject , onSaveAvatar , token , userId , onUploadAvatar , loading } = props;
    const avatarStyle={ 
        transform : 'scale(1.5)' ,
        margin : '3rem 0',
        width : 'auto'
    }

    const [editableAvatar , setEditableAvatar] = useState(userObject.avatar);
    const [image , setImage] = useState(undefined);
    const [editAvatar , setEditAvatar ] = useState(true);

    const onChangeAvatar = (avatar) => {
        setEditableAvatar(avatar);
    }

    const onChangeUploadAvatar = (image) => {
        setImage(image);
    }

    const onSaveChanges = () => {

        if( editAvatar ){
            var i = 0 ;
            for( i = 0 ; i < editableAvatar.length ; i++ )
                if( userObject.avatar[i] !== editableAvatar[i] )
                    break;
            if( i === editableAvatar.length )
                return;
            onSaveAvatar( userId  , token , editableAvatar );
        }else{
            if( image ){
                const formData = new FormData();
                formData.append('avatar' , image );
                onUploadAvatar( formData , token );
            }
        }
        
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

    const saveChangesButton = (
        <Button
        onClick={() => onSaveChanges()}
        style={{ margin : '0.5rem 0' }}
        >
            Save Changes
        </Button>
    )

    let avatar = null ;
    if( loading ){
        avatar = <Loader />
    }else if( !loading && editAvatar ){
        avatar = (
            <div style={{ marginTop : '1rem' }} >
                <Avatar 
                edit
                onChange={onChangeAvatar}
                user={userObject}
                style={avatarStyle}
                />
            </div> 
        )    
    }else{
        const deleteAvatar = () => {
            if( userObject.picture )
                props.onDeleteAvatar(token);
        }
        avatar = (
            <ImageInput 
            style={{ marginTop : '1rem' }} 
            onChange={onChangeUploadAvatar} 
            image={baseURL + ':8000' + userObject.picture}
            deleteImage={deleteAvatar}
            />
        )
    }

    const switchMode = () => {
        setEditAvatar(!editAvatar);
    }

    const switchButton = (
        <Button 
        onClick={() => switchMode()} 
        style={{ margin : '1rem 0 0 0' }}
        >
            { editAvatar ? 'Upload Avatar' : 'Edit Avatar' }
        </Button>
    )

    const cardStyle={
        margin : '0 2rem 2rem 2rem' , 
        paddingTop : '0' , 
        transform : 'scale(0.9)',
        width :  '25rem'
    }


    return (
        <Fragment>
            <Card
            style={cardStyle}
            >
                <Logo />
                <span 
                className={classes.username} >
                    {userObject.username}
                </span>
                { avatar }
                {switchButton}
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
        userObject : state.auth.userObject ,
        loading : state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onSaveAvatar : (userId , token , avatar) => dispatch(actions.changeAvatar(userId , token , avatar)),
        onUploadAvatar : (image , token) => dispatch(actions.uploadAvatar(image , token)),
        onDeleteAvatar : (token) => dispatch(actions.deleteAvatar(token))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Edit);
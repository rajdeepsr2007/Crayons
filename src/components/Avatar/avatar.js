import { ArrowLeft, ArrowRight, SkipNext } from '@material-ui/icons';
import React, { Fragment, useEffect, useState } from 'react';
import { EyeIcon } from '../../assets/avatar/eyes';
import { MouthIcon } from '../../assets/avatar/mouth';
import crownIcon from '../../assets/crown.png';
import classes from './avatar.module.css';
import Button from '../Inputs/Button/button';
import { HuePicker} from 'react-color';
import baseURL from '../../baseURL';

const Avatar = (props) => {

    const [user , setUser] = useState(props.user);

    const {style , admin , edit , onChange} = props;
    const background = user.avatar ? user.avatar[2] : 'green';
    const eyeIcon = user.avatar ? user.avatar[0] : JSON.stringify(Math.ceil(Math.random()*5));
    const mouthIcon = user.avatar ? user.avatar[1] : JSON.stringify(Math.ceil(Math.random()*5));

    useEffect(() => {
        if( edit )
        onChange(
            user.avatar
        )
    },[user])

    let crown = null;
    if( admin ){
        crown = (
            <div className={classes.crown} >
                <img src={crownIcon}/>
            </div>
        )
    }

    if( !edit && user.picture ){
        const avatar = (
            <div 
            style={props.style}
            className={classes.avatar_picture} >
                <img
                src={baseURL + ':8000' + user.picture}
                />
                {crown}
            </div>
        )

        return avatar;
    }

    const animationStyle = { 
        animationDelay  : `${Math.floor(Math.random()*10)}s` , 
        background ,
        boxShadow : '5px 5px 10px 2px ' + background
    };

    const avatar=(
        <div className={classes.avatar} style={style} >
            <div 
            className={classes.face} 
            style={ animationStyle }  >
                {crown}
                <img src={EyeIcon(eyeIcon)}  className={[classes.icons,classes.eyes].join(' ')} />
                <img src={MouthIcon(mouthIcon)} className={[classes.icons,classes.mouth].join(' ')} />
            </div>
            <div 
            className={classes.body} 
            style={ animationStyle }  >
            </div>
        </div>
    )

    if( !edit ){
        return avatar
    }

    const previousEyes = () => {
        const updatedUser = {...user , avatar : [...user.avatar]};
        updatedUser.avatar[0] = JSON.stringify((user.avatar[0] - 1));
        if( updatedUser.avatar[0] === '0' )
        updatedUser.avatar[0] = '5';
        setUser(updatedUser);
    }

    const previousMouth = () => {
        const updatedUser = {...user , avatar : [...user.avatar]};
        updatedUser.avatar[1] = JSON.stringify((user.avatar[1] - 1));
        if( updatedUser.avatar[1] === '0' )
        updatedUser.avatar[1] = '5';
        setUser(updatedUser);
    }

    const nextEyes = () => {
        const updatedUser = {...user , avatar : [...user.avatar]};
        updatedUser.avatar[0] = JSON.stringify((Number.parseInt(user.avatar[0]) + 1)%6);
        if( updatedUser.avatar[0] === '0' )
        updatedUser.avatar[0] = '1';
        setUser(updatedUser);
    }

    const nextMouth = () => {
        const updatedUser = {...user , avatar : [...user.avatar]};
        updatedUser.avatar[1] = JSON.stringify((Number.parseInt(user.avatar[1]) + 1)%6);
        if( updatedUser.avatar[1] === '0' )
        updatedUser.avatar[1] = '1';
        setUser(updatedUser);
    }

    const previousControls = (
        <div>
            <Button onClick={() => previousEyes()} ><ArrowLeft /></Button>
            <Button onClick={() => previousMouth()} ><ArrowLeft /></Button>
        </div>
    )

    const nextControls = (
        <div>
            <Button onClick={() => nextEyes()}><ArrowRight /></Button>
            <Button onClick={() => nextMouth()}><ArrowRight /></Button>
        </div>
    )

    const onChangeColor = (color) => {
        const updatedUser = {...user , avatar : [...user.avatar]};
        updatedUser.avatar[2] = color.hex;
        setUser(updatedUser);
    }

    return (
        <Fragment>
            <div
            style={{ 
                display : 'flex' , 
                width : '100%',
                justifyContent : 'space-between'
            }}
            >
                {previousControls}
                {avatar}
                {nextControls}
            </div>
            <div className={classes.color_picker} >
                <HuePicker
                onChange={onChangeColor}
                color={user.avatar[2]}
                />
            </div>
        </Fragment>
        
    )
}

export default Avatar;
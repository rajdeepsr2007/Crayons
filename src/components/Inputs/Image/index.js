import { CameraAltOutlined, Delete, DeleteRounded } from '@material-ui/icons';
import React, { Fragment, useRef, useState } from 'react';
import Button from '../Button/button';
import classes from './image.module.css';

const ImageInput = (props) => {

    const [preview , setPreview] = useState(
        props.image || undefined
    );

    const inputRef = useRef();

    const onChange = (event) => {

        if( preview )
            URL.revokeObjectURL(preview)

        const file = event.target.files[0];
        const localURL = URL.createObjectURL(file);
        setPreview(localURL);
        props.onChange(
            file
        )
    }

    const previewImage = (
        <div
        className={classes.preview}
        >
            <img
            className={classes.fade_in} 
            src={preview} 
            />
        </div>
        
    )

    const Browse = () => {
        inputRef.current.click();
    }

    const buttonStyle = {
        width : '8rem',
    }

    const imageInput = (
        <Button 
        style={buttonStyle}
        onClick={Browse} >
            <input
            ref={inputRef}
            type='file'
            onChange={onChange}
            />
            <CameraAltOutlined 
            style={{ marginRight : '0.5rem' , marginBottom : '-0.5rem' }}
            />
            Browse
        </Button>
    )

    return(
        <div 
        className={classes.box}
        style={props.style} >
            {previewImage}
            <DeleteRounded
            onClick={props.deleteImage}
            style={{ 
                color : 'red',
                cursor : 'pointer'
            }}
            />
            {imageInput}
        </div>
        
    )
}

export default ImageInput;
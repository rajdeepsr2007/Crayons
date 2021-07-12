import React , {Fragment} from 'react';
import {CirclePicker} from 'react-color';
import Button from '../../../Inputs/Button/button'
import classes from './controls.module.css';

const Controls = (props) => {


    const brushWidths = ['5' , '10' , '15' , '20' , '25' , '30' , '35' , '40'];
    const selector = brushWidths.map( width => {
        return (
            <div 
            className={classes.brushwidthoptions}
            style={{ 
                height : width + 'px' , 
                width : width + 'px',
            }} 
            onClick={ () => props.onBrushWidthChange(width)}
            >
            </div>
        )
    } )
    const brushWidthPicker  = (
        <div className={classes.brushwidthpicker} >
            {selector}
        </div>
    )

    const onColorChange = (color) => {
        props.onBrushColorChange(color.hex);
    }

    const colorPicker = (
        <CirclePicker 
        onChange={onColorChange}
        />
    )

    const buttonStyle = { padding : '0.5rem 1rem' , margin : '0 1rem' } ;
    const options = (
       <div className={classes.options} >
            <Button style={buttonStyle} onClick={props.onClearCanvas} >Clear</Button>
            <Button style={buttonStyle} onClick={props.onUndo}>Undo</Button>
            <Button style={buttonStyle} onClick={props.onRedo}>Redo</Button>
       </div>
    )

    return(
        <div className={classes.controls} >
            <div style={{ width : '50%' , display : 'flex' , flexFlow : 'column' , justifyContent : 'space-between' , alignItems : 'center' }} >
                {options}
                {brushWidthPicker}
            </div>
            {colorPicker}
        </div>          
    )
}

export default Controls;
import React , { useState , useRef } from 'react';
import {ReactSketchCanvas} from 'react-sketch-canvas';
import Controls from './Controls';
import classes from './canvas.module.css';

const Canvas = (props) => {

    const [brushColor , setBrushColor] = useState('black');
    const [brushWidth , setBrushWidth ] = useState('2');
    const canvasRef = useRef();

    const onBrushColorChange = (color) => {
        setBrushColor(color);
    }

    const onBrushWidthChange = (width) => {
        setBrushWidth(width);
    }

    const onClearCanvas = () => {
        canvasRef.current.clearCanvas();
    }

    const onUndo = () => {
        canvasRef.current.undo();
    }

    const onRedo = () => {
        canvasRef.current.redo();
    }

    const onErase = () => {
        canvasRef.current.eraseMode(true);
    }

    return(
        <div className={classes.canvas} >
            <div className={classes.draw} >
                <ReactSketchCanvas
                width={'700px'}
                height={'500px'}
                ref={canvasRef}
                strokeColor={brushColor}
                strokeWidth={brushWidth}
                eraserWidth={brushWidth}
                />
            </div>
            <div className={classes.controls} >
                <Controls 
                onBrushColorChange={onBrushColorChange}
                onBrushWidthChange={onBrushWidthChange}
                onClearCanvas={onClearCanvas}
                onUndo={onUndo}
                onRedo={onRedo}
                onErase={onErase}
                />
            </div>
        </div>
    )
}

export default Canvas;
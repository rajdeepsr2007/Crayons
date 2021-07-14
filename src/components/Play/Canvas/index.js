import React , { useState , useRef, useEffect } from 'react';
import {ReactSketchCanvas} from 'react-sketch-canvas';
import Controls from './Controls';
import LZString from 'lz-string';
import classes from './canvas.module.css';

const Canvas = (props) => {

    const [brushColor , setBrushColor] = useState('black');
    const [brushWidth , setBrushWidth ] = useState('2');
    const canvasRef = useRef();
    const {canvasPath , drawing , disabled , turn} = props;

    useEffect(() => {
        if( canvasRef && !drawing ){
            canvasRef.current.loadPaths(
                JSON.parse(
                    LZString.decompress(
                        canvasPath
                    )
                )
            )
        }
    },[canvasPath]);

    useEffect(() => {
        onClearCanvas();
    },[turn])

    const onChange = (canvasPath) => {
        props.onChange(
            LZString.compress(
                JSON.stringify(
                    canvasPath
                )
            )
        )
    }

    const resetEraseMode = () => {
        canvasRef.current.eraseMode(false);
    }

    const onBrushColorChange = (color) => {
        setBrushColor(color);
        resetEraseMode();
    }

    const onBrushWidthChange = (width) => {
        setBrushWidth(width);
    }

    const onClearCanvas = () => {
        canvasRef.current.clearCanvas();
        resetEraseMode();
    }

    const onUndo = () => {
        canvasRef.current.undo();
        resetEraseMode();
    }

    const onRedo = () => {
        canvasRef.current.redo();
        resetEraseMode();
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
                onUpdate={onChange}
                />
            </div>
            {
                !disabled ?  <div className={classes.controls} >
                                <Controls 
                                onBrushColorChange={onBrushColorChange}
                                onBrushWidthChange={onBrushWidthChange}
                                onClearCanvas={onClearCanvas}
                                onUndo={onUndo}
                                onRedo={onRedo}
                                onErase={onErase}
                                />
                            </div> : null
            }
        </div>
    )
}

export default Canvas;
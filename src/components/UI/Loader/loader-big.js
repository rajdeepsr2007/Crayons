import React , {Fragment} from 'react';
import classes from './loader-big.module.css';

const Loader = () => {
    return(
        <Fragment>
            <div className={classes.loader} >
            </div>
            <div className={classes.top} >
            </div>
        </Fragment>
        
    )
}

export default Loader;
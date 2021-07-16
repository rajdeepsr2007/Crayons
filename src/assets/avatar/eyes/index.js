import Icon1 from './1.png';
import Icon2 from './2.png';
import Icon3 from './3.png';
import Icon4 from './4.png';
import Icon5 from './5.png';

export const EyeIcon = (number) => {
    switch( number){
        case '1':
            return Icon1;
        case '2':
            return Icon2;
        case '3':
            return Icon3;
        case '4':
            return Icon4;
        case '5':
            return Icon5;
        default :
            return Icon1;
    }
}


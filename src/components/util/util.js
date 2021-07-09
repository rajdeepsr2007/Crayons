export const formatDate = (date) => {
    const formattedDate = new Date(date);
    const presentDate = new Date();
    const timeDifference = presentDate.getTime() - formattedDate.getTime();
    if( timeDifference < 60000 ){
        return `${Math.floor(timeDifference/1000)}s`
    }
    else if(timeDifference < 3600000){
        return `${Math.floor(timeDifference/60000)}min`
    }
    else if(timeDifference < 3600000 * 24){
        return `${Math.floor(timeDifference/(3600000))}hr`
    }else if(timeDifference < 3600000 * 24 * 30){
        return `${Math.floor(timeDifference/(3600000*24))}d`
    }else if(timeDifference < 3600000 * 24 * 30 * 12){
        return `${Math.floor(timeDifference/(3600000*24*30))}mon`
    }else{
        return `${Math.floor(timeDifference/3600000*24*30*12)}yr`
    }
}

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

export const formatTimer = (timer) => {
    const min = Math.floor(timer/60);
    let sec = timer%60;
    sec = sec < 10 ? '0' + sec : sec ;
    return `0${min} : ${sec}`;
}

export const rankUsers = (users , scores) => {
    users.sort(( a , b ) => {
        return scores[b._id].overall - scores[a._id].overall
    });
    users[0].label = 1;
    for( let i = 1  ; i < users.length ; i++){
        if( scores[users[i]._id].overall === scores[users[i - 1]._id].overall )
            users[i].label = users[i-1].label;
        else
            users[i].label = users[i-1].label + 1;
    }
    return users;
}

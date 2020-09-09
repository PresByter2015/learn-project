function add0(m){return m<10?'0'+m:m }
export function getRemainTime (time) {
    
    let hours    = time/ 1000 / 60 / 60 
    let hoursNum = Math.floor(hours)
    
    let minutes   = time / 1000 /60 - (60 * hoursNum)
    let minutesNum  = Math.floor(minutes)
    
    let seconds   = time/ 1000 - (60 * 60 * hoursNum) - (60 * minutesNum);
    let secondsNum =Math.floor(seconds);
    
   
    return add0(hoursNum)+'：'+add0(minutesNum)+'：'+add0(secondsNum);
};
export function getRemainDay (time) {
   
    let days    = time / 1000 / 60 / 60 / 24;
    let daysRound   = Math.floor(days);
    let hours    = time/ 1000 / 60 / 60 - (24 * daysRound);
    let hoursRound  = Math.floor(hours);
    let minutes   = time / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound);
    let minutesRound  = Math.floor(minutes);
    
    
    return add0(daysRound)+'天'+add0(hoursRound)+'时'+add0(minutesRound)+'分';
    
    
};
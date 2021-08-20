export default function computeRelativeDate(dateString) {
    let milliseconds = new Date() - new Date(dateString);
    let timePassed = new Date(milliseconds);
    timePassed.setFullYear(timePassed.getFullYear() - 1970);

    if(timePassed.getUTCFullYear() > 0){
        let years = (1 == timePassed.getUTCFullYear()) ? 
            "a year ago" : 
            timePassed.getUTCFullYear() + " years ago";
        return years;
    }
    else if(timePassed.getUTCMonth() > 0){
        let months = (1 == timePassed.getUTCMonth()) ? 
            "a month ago" : 
            timePassed.getUTCMonth() + " months ago";
        return months;
    }
    else if(timePassed.getUTCDate() > 1){
        let days = (1 == timePassed.getUTCDate()) ? 
            "a day ago" : 
            timePassed.getUTCDate() + " days ago";
        return days;
    }
    else if(timePassed.getUTCHours() > 0){
        let hours = (1 == timePassed.getUTCHours()) ? 
            "an hour ago" : 
            timePassed.getUTCHours() + " hours ago";
        return hours;
    }
    else if(timePassed.getUTCMinutes() > 0){
        let minutes = (1 == timePassed.getUTCMinutes()) ? 
            "a minute ago" : 
            timePassed.getUTCMinutes() + " minutes ago";
        return minutes;
    }
    else {
        return "just now";
    }
}
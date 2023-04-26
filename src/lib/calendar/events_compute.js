import dayjs from 'dayjs';
import duration from'dayjs/plugin/duration';
import objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(duration);
dayjs.extend(objectSupport);

export const parse_time = time => {
    const time_array = time.split('h');
    return {
        hours: parseInt(time_array[0]),
        minutes: time_array[1] === '' ? 0 : parseInt(time_array[1])
    }
}

export const compute = events => {
    events.forEach(event => {
        const start_time_parsed = parse_time(event.start_time);
        const duration_parsed = parse_time(event.duration);
        event.end_time = dayjs(start_time_parsed)
        .add(dayjs.duration(duration_parsed))
        .format('H[h]mm');
        event.style = {
            top: start_time_parsed.hours * 60 + start_time_parsed.minutes,
            height: duration_parsed.hours * 60 + duration_parsed.minutes
        };
    });
    events.sort((a,b) => a.style.top - b.style.top);
    events.forEach((event, index, array) => {
        event.problem = '';
        if(index === 0) {
            if (event.style.top !== 0) {
                event.problem += "First event should start at midnight. ";
            }
        } else {
            if (event.style.top + event.style.height > 1440) {
                event.problem += "This event does not fit in the day. ";
            }
            const diff = array[index-1].style.top + array[index-1].style.height - event.style.top;
            if (diff > 0) {
                console.log(event.name, diff)
                event.problem += "This event overlaps with the previous one. "
            } else if (diff < 0) {
                event.problem += "There is a gap between this event and the previous one. "
            }
        }
    });
    return events;
}

export const compute_now = () => {
    const now = new Date;
    return now.getHours()*60+now.getMinutes();
}
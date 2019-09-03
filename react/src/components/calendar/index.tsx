import React, {useState, useEffect, useContext} from 'react';
import moment from 'moment';
import {OrganizerContext, Week, Day } from '../shared/OrganizerProvider';
import './index.scss'

export const Calendar = () => {
    const { subject, changeDate, generate } = useContext<any>( OrganizerContext );
    const [calendar, setCalendar] = useState<Week[]>([]);
    const [subValue, setSubValue] = useState<moment.Moment>(subject.value);

    useEffect(()=>{
        subject.subscribe(setCalendar(generate(subValue)))
    }, [subValue])

    const select = (day: Day) => {
        if (!day.disabled) {
            changeDate(day.value)
            setSubValue(moment(day.value))
        }
    }

    return <table>
        <thead>
            <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wen</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
            </tr>
        </thead>
        <tbody>
            {calendar.map((weeks, w)=>(
               <tr key={w}>
                   {weeks.days.map((day, d)=>(
                       <td key={d} className={`${day.selected?'selected':''} ${day.active?'active':''} ${day.disabled?'disabled':''}`} onClick={()=> select(day)}>
                         <span>{ moment(day.value).format('ddd DD')}</span>
                       </td>
                   ))}
              </tr>)
            )}
         </tbody>
    </table>
}

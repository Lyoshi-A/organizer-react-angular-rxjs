import React from 'react';
import {BehaviorSubject} from "rxjs";
import moment from "moment";

export interface Day {
    value: moment.Moment
    active: boolean
    disabled: boolean
    selected: boolean
}

export interface Week {
    days: Day[]
}

// export interface IOganizerContext {
//     subject?: BehaviorSubject<moment.Moment>,
//     changeMonth?: (dir: number)=>void,
//     changeDate?: (data: moment.Moment)=>void,
//     generate?: (now: moment.Moment)=>Week[]
// }

export const OrganizerContext= React.createContext({});

const OrganizerProvider = (props:any) => {
  const subject:BehaviorSubject<moment.Moment> = new BehaviorSubject(moment())
  // const [functionType, setFunctionType] = useState('');

    const changeMonth = (dir: number):void => {
        const value = subject.value.add(dir, 'month')
        subject.next(value)
    }

    const changeDate = (data: moment.Moment) => {
        const value = subject.value.set({
            date: data.date(),
            month: data.month()
        })
        subject.next(value)
    }

    const generate = (now: moment.Moment):Week[] => {
        const startDay = now.clone().startOf('month').startOf('week')
        const endDay = now.clone().endOf('month').endOf('week')

        const date = startDay.clone().subtract(1, 'day')

        const calendar = []

        while (date.isBefore(endDay, 'day')) {
            calendar.push({
                days: Array(7)
                    .fill(0)
                    .map(() => {
                        const value = date.add(1, 'day').clone()
                        const active = moment().isSame(value, 'date')
                        const disabled = !now.isSame(value, 'month')
                        const selected = now.isSame(value, 'date')

                        return {
                            value, active, disabled, selected
                        }
                    })
            })
        }
        return calendar
    }

  return (
    <OrganizerContext.Provider value={{
        subject,
        changeMonth,
        changeDate,
        generate,
      }}
    >
      {props.children}
    </OrganizerContext.Provider>
  );
};

export default OrganizerProvider;

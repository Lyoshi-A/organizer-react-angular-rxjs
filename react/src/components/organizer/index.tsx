import React, {useContext, useState, useEffect, useRef} from 'react';
import moment from 'moment';
import {Task, create, remove, update, load} from '../shared/tasks.service';
import {OrganizerContext} from "../shared/OrganizerProvider";
import {switchMap, map} from 'rxjs/operators';
import './index.scss'


export const Organizer = () => {
    const { subject } = useContext<any>(OrganizerContext );
    const taskRef = useRef<any>(null);
    const [tasks, setTasks] = useState<Task[]>([])
    const [disabled, setDisabled] = useState<boolean>(true)
    const submit = (e:any) => {
        e.preventDefault();
        const task: Task = {
            title: taskRef.current.value,
            date: subject.value.format('DD-MM-YYYY'),
            done: false
        }

        create(task).subscribe(task => {
            setTasks((current: Task[])=> [...tasks,task])
            taskRef.current.value = '';
        }, err => console.error(err))
    }

    const deleteTask = (task: Task) => {
        remove(task).subscribe(() => {
            setTasks(current=> current.filter(t => t.id !== task.id));
        }, err => console.error(err))
    }

    const doneTask = (task: Task) => {
        task.done = !task.done;
        update(task).subscribe(() => {
            setTasks(current=> current.map(t => t.id === task.id?task:t));
        }, err => console.error(err))
    }

    const handleChange = () => {
        console.log('before',disabled)
        if (taskRef.current.value === '') setDisabled(true)
        else if (disabled) setDisabled(false)
        console.log('after', disabled)
    }

    useEffect(()=>{
        subject.pipe(
            switchMap((value: moment.Moment) => {
                return load(value)
                    .pipe(map(tasks => {
                    if (!tasks) {
                        return []
                    }
                    return Object.keys(tasks).map((key:any) => ({...tasks[key], id: key}))
                }))
            })
        ).subscribe((data:Task[]) => {
            setTasks(data)
        }, (err:any) => console.error('error', err))
    },[subject])

    return <section>
            <header>
                Tasks list: <strong>{subject.value.format('DD.MM.YYYY')}</strong>
                <hr />
            </header>

            <main>
                <ul>
                {tasks.length?tasks.map((task, i)=>
                    <li key={task.id} className="task">
                        <span>{i + 1}. <strong className={`${task.done?'done':''}`}>{task.title}</strong></span>
                        <button className="btn btn-primary" onClick={()=>doneTask(task)}>{`${task.done?'Undo':'Done'}`}</button>
                        <button className="btn btn-primary" onClick={()=>deleteTask(task)}>Remove</button>
                    </li>
                ): <p className="text-center">No tasks yet...</p>}
                </ul>
            </main>

            <footer>
                <form onSubmit={(e)=>submit(e)}>
                    <input ref={taskRef} onChange={()=>handleChange()} type="text" />
                    <button type="submit" disabled={disabled} className="btn btn-primary btn-block">Add Task</button>
                </form>
            </footer>
        </section>
}

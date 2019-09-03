import {Observable} from 'rxjs';
import axios from 'axios';
import moment from 'moment';

export interface Task {
  id?: string
  title: string
  date?: string
  done?: boolean
}

interface CreateResponse {
  name: string
}

  const url = 'https://cart-a2445.firebaseio.com/tasks'

  export const load = (date: moment.Moment): Observable<Task[]> => {
    return Observable.create((observer: any) => {
      axios.get(`${url}/${date.format('DD-MM-YYYY')}.json`)
          .then((response) => {
            // console.log('response.data', response.data)
            observer.next(response.data);
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
    });
  }

  export const create = (task: Task): Observable<Task> => {
    return Observable.create((observer: any) => {
      axios.post<CreateResponse>(`${url}/${task.date}.json`, task)
          .then((response) => {
            observer.next({...task, id: response.data.name});
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
    });
  }

    export const update = (task: Task): Observable<Task> => {
      return Observable.create((observer: any) => {
        axios.patch<CreateResponse>(`${url}/${task.date}/${task.id}.json`, task)
            .then((response) => {
              observer.next({...task, id: response.data.name});
              observer.complete();
            })
            .catch((error) => {
              observer.error(error);
            });
      });
    }

  export const remove = (task: Task): Observable<void> => {
    return Observable.create((observer: any) => {
      axios.delete<void>(`${url}/${task.date}/${task.id}.json`)
          .then((response) => {
            observer.next(response.data);
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
    });
  }


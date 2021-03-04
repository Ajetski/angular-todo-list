import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { Task } from '../models/task';

type MongoTask = {
  '_id': string,
  text: string,
  completed: boolean
}

const MongoTaskToTask = ({ '_id': id, text, completed }: MongoTask): Task => ({
  id, text, completed
});

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<MongoTask[]>(`${environment.apiBase}/task`)
      .pipe(map(res => res.map(MongoTaskToTask)));
  }

  addTask(task: Task) {
    return this.http.post<MongoTask>(`${environment.apiBase}/task`, task)
      .pipe(map(MongoTaskToTask));
  }

  updateTask(task: Task) {
    return this.http.post<MongoTask>(`${environment.apiBase}/task/${task.id}`, task)
      .pipe(map(MongoTaskToTask));;
  }

  deleteTask(task: Task) {
    return this.http.delete(`${environment.apiBase}/task/${task.id}`);
  }

  deleteCompletedTasks() {
    return this.http.delete(`${environment.apiBase}/task/completed`);
  }
}

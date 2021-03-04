import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
    this.getTasks();
  }

  getTasks() {
    return this.http.get<{
      '_id': string,
      text: string,
      completed: boolean
    }[]>(`${environment.apiBase}/task`);
  }

  addTask(task: Task) {
    return this.http.post<{
      '_id': string,
      text: string,
      completed: boolean
    }>(`${environment.apiBase}/task`, task);
  }

  updateTask(task: Task) {
    return this.http.post<{
      '_id': string,
      text: string,
      completed: boolean
    }>(`${environment.apiBase}/task/${task.id}`, task);
  }

  deleteTask(task: Task) {
    return this.http.delete(`${environment.apiBase}/task/${task.id}`);
  }

  deleteCompletedTasks() {
    return this.http.delete(`${environment.apiBase}/task/completed`);
  }
}

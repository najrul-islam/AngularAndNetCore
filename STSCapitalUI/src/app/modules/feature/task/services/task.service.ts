import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpLocalClient } from 'src/app/services/http-local-client.service';
import { ITask } from '../models/task';
import { TaskUrls } from 'src/app/services/service-url.model';

@Injectable()
export class TaskService {

  constructor(private httpLocalClient: HttpLocalClient) { }

  getTask(id): Observable<ITask> {
    try {
      const url = `${TaskUrls.task}/${id}`;
      return this.httpLocalClient.get(url);
    } catch (e) {
      throw e;
    }
  }

  getTaskList(): Observable<ITask[]> {
    try {
      return this.httpLocalClient.get(TaskUrls.task);
    } catch (e) {
      throw e;
    }
  }
  addTask(value): Observable<ITask> {
    try {
      return this.httpLocalClient.postJson(TaskUrls.task, value);
    } catch (e) {
      throw e;
    }
  }
  editTask(value): Observable<any> {
    try {
      return this.httpLocalClient.put(TaskUrls.task, value);
    } catch (e) {
      throw e;
    }
  }
  deleteTask(id): Observable<any> {
    try {
      const url = `${TaskUrls.task}/${id}`;
      return this.httpLocalClient.delete(url);
    } catch (e) {
      throw e;
    }
  }
}

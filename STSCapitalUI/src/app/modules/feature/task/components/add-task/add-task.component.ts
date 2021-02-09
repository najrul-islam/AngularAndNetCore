import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createTaskModel, ITask } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskModel: ITask;
  fromDate = new Date();
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskModel = createTaskModel();
   }
  ngOnInit(): void {
    this.newTaskModel();
  }
  newTaskModel(): void {
    /* task Form using Reactive form */
    this.taskForm = this.fb.group({
      title: [
        this.taskModel.title,
        [Validators.required],
      ],
      description: [
        this.taskModel.description
      ],
      taskDate: [this.taskModel.taskDate, [Validators.required]],
      taskFromTime: [this.taskModel.taskFromTime],
      taskToTime: [this.taskModel.taskToTime],
      location: [this.taskModel.location],
    });
    this.taskForm.valueChanges.subscribe((res) => {
      this.readData();
    });
  }

  readData(): void {
    Object.keys(this.taskForm.controls).forEach((key) => {
      const control = this.taskForm.get(key);

      if (key === 'title' && control.value !== '') {
        const targetControl = this.taskForm.get('title');
        targetControl.setValidators([Validators.required]);
      }
      if (key === 'taskDate' && control.value !== '') {
        const targetControl = this.taskForm.get('taskDate');
        targetControl.setValidators([Validators.required]);
      }
    });
  }

  save(): void {
    const object = this.taskForm.value;
    this.taskService
      .addTask(object)
      .subscribe((res) => {
        this.backToTaskList();
      });
  }

  backToTaskList(): void {
    this.router.navigate([
      'task',
      'task_list'
    ]);
  }
}

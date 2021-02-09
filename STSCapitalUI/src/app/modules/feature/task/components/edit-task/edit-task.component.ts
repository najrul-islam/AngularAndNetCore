import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createTaskModel, ITask } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskModel: ITask;
  fromDate = new Date();
  taskGuid: string;
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskModel = createTaskModel();
    this.route.params.subscribe((params) => {
      this.taskGuid = params.taskGuid;
      this.getTask(this.taskGuid);
    });
  }

  ngOnInit(): void {
    this.makeTaskModel();
  }

  getTask(taskGuid): void {
    this.taskService
      .getTask(taskGuid)
      .subscribe((res) => {
        this.taskModel = res;
        this.makeTaskModel();
      });
  }

  makeTaskModel(): void {
    /* task Form using Reactive form */
    this.taskForm = this.fb.group({
      taskGuid: [
        this.taskModel.taskGuid,
        [Validators.required],
      ],
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
      .editTask(object)
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

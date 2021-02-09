import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ITask } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: ITask[];
  dataSource: any;
  selectedRow: any;
  displayedColumns: string[] = ['title',
  'description', 'taskDate', 'taskFromTime', 'taskToTime', 'location'];
  constructor(
    private taskService: TaskService,
    private router: Router) {
    // this.dataSource = new MatTableDataSource(this.tasks);
  }

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList(): void {
    this.taskService.getTaskList().subscribe(res => {
      this.tasks = res;
      this.dataSource = new MatTableDataSource(this.tasks);
    });
  }
  getRecord(row): void {
    this.selectedRow = row;
  }
  editTask(): void {
    this.router.navigate([
      'task',
      'edit_task',
      this.selectedRow.taskGuid
    ]);
  }
  deleteTask(): void{
    this.taskService.deleteTask(this.selectedRow.taskGuid).subscribe(res => {
      const index = this.tasks.indexOf(this.selectedRow);
      this.tasks.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.tasks);
    });
  }
}

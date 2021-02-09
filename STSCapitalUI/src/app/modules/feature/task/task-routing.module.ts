import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TaskComponent } from './task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

const routes: Routes = [
    {
        path: '',
        component: TaskComponent,
        children: [
            {
                path: '',
                redirectTo: 'task_list',
                pathMatch: 'full'
            },
            {
                path: 'task_list',
                component: TaskListComponent,
            },
            {
                path: 'add_task',
                component: AddTaskComponent
            },
            {
                path: 'edit_task/:taskGuid',
                component: EditTaskComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule { }

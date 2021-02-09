import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './modules/core/components/login/login.component';
import { RegisterComponent } from './modules/core/components/register/register.component';
import { SystemComponent } from './modules/core/components/system/system.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./modules/feature/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'task',
        loadChildren: () => import('./modules/feature/task/task.module').then(m => m.TaskModule)
      }
    ],
    component: SystemComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

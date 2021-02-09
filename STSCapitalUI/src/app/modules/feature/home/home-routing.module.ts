import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StsCapitalAppContainerComponent } from './components/sts-capital-app-container/sts-capital-app-container.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            {
                path: '', component: StsCapitalAppContainerComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }

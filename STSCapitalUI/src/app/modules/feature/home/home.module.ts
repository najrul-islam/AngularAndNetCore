import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { StsCapitalAppContainerComponent } from './components/sts-capital-app-container/sts-capital-app-container.component';

@NgModule({
    declarations: [HomeComponent, StsCapitalAppContainerComponent],
    imports: [
      CommonModule,
      HomeRoutingModule,
      SharedModule
    ]
  })
  export class HomeModule { }

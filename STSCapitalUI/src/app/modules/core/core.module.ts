import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ErrorLogService } from './services/error-log.service';
import { ErrorHandleService } from './services/error-handle.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RefreshTokenInterceptor } from './services/refreshtoken-interceptor.service';
import { SystemComponent } from './components/system/system.component';
import { RefreshTokenService } from 'src/app/services/account/refresh-token.service';
import { GlobalEmitterService } from 'src/app/services/global-emitter.service';
import { LocalStorageService } from 'src/app/services/localstorage/localstorage.service';


@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent,
        SystemComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
    ],
    providers: [
        ErrorLogService,
        RefreshTokenService,
        GlobalEmitterService,
        LocalStorageService,
        { provide: ErrorHandler, useClass: ErrorHandleService },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RefreshTokenInterceptor,
            multi: true,
        },
    ],
    exports: []
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only'
            );
        }
    }
}

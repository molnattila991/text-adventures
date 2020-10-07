import { NgModule } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN } from '@text-adventures/shared';
import { LoginUserService } from './login/login-user.service';



@NgModule({
  providers: [
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService, useClass: LoginUserService }
  ]
})
export class BusinessLogicModule { }

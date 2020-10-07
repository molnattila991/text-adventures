import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginContainerComponent } from './login-container/login-container.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginContainerComponent,
    LoginViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [LoginContainerComponent]
})
export class LoginModule { }

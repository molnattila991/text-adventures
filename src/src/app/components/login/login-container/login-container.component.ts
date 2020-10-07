import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, DATA_PROVIDER_INJECTION_TOKEN, UserHandling } from '@text-adventures/shared';

@Component({
  selector: 'app-login-container',
  template: `
    <app-login-view (submitted)="logInUser($event)">
    </app-login-view>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginContainerComponent {

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService) private userService: UserHandling
  ) { }

  logInUser(name: string): void {
    this.userService.logInUser(name);
  }

}

import { Inject, Injectable } from '@angular/core';
import { DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider, UserHandling, UserModel } from '@text-adventures/shared';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';



@Injectable()
export class LoginUserService implements UserHandling {
  private selectedUser$: ReplaySubject<UserModel> = new ReplaySubject();
  private userSubscription: Subscription;
  constructor(
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.UsersDataProviderService) private userDataProvider: IGenericCrudDataProvider<UserModel>
  ) {
    const loggedInUserName = localStorage.getItem("loggedInUserName");
    if (loggedInUserName) {
      this.logInUser(loggedInUserName);
    }
  }

  getLoggedInUser(): Observable<UserModel> {
    return this.selectedUser$.asObservable();
  }

  async logInUser(name: string) {
    this.userSubscription && this.userSubscription.unsubscribe();

    let user = await this.userDataProvider.getFiltered("name", name).pipe(take(1)).toPromise()
    if (user && user.length > 0) {
      this.login(name);
    } else {
      try {
        await this.userDataProvider.add(<UserModel>{ name: name, characters: [] });
        this.login(name);
      } catch (error) {
        console.log(error);
        //TODO: add logging
      }
    }
  }

  login(name) {
    this.userSubscription = this.userDataProvider.getFiltered("name", name).subscribe(l => {
      localStorage.setItem("loggedInUserName", l[0].model.name);
      this.selectedUser$.next(l[0].model);
    });
  }
}

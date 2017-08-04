import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Authentication, AdalConfig } from 'adal-ts';
import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';


@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent {

  user: any;
  disableLogout: boolean = false;
  disableLogin: boolean = false;

  constructor(public appState: AppState, public title: Title, public http: Http) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
  }


  login() {
    console.log('login');

    let context = Authentication.getContext(this.createConfig());
    this.disableLogin = context.getUser() != null;

    if (this.disableLogin == false) context.login();

  }

  logout() {
    console.log('logout');

    let context = Authentication.getContext(this.createConfig());
    let loggedInUser = context.getUser();
    this.disableLogout = loggedInUser == null;

    if (this.disableLogout == false) context.logout();

  }

  getUser(): void {
    console.log('logout');

    let context = Authentication.getContext(this.createConfig());
    this.user = context.getUser();

    console.log(context.getToken());

    // this.http.get('https://httpbin.org/get').subscribe(res => {
    //   console.log(res)
    // })

    var headers = new Headers();
    headers.append('Authorization', `"Bearer ${context.getToken()}"`)
    headers.append('accept', 'application/json, text/plain, */*')

    this.http.get('https://graph.microsoft.com/v1.0/users/pdemro@SPE372945.onmicrosoft.com',
      {
        headers: headers
      }
    ).subscribe(res => {
      console.log('blow up');
    });
  }
  //pdemro@SPE372945.onmicrosoft.com

private createConfig(): AdalConfig {
  let config = new AdalConfig('71ab1320-91d8-414e-a925-2e29a6624812', 'SPE372945.onmicrosoft.com', 'http://localhost:3000/')

  config.extraQueryParameter = 'resource=https://graph.microsoft.com';

  return config;

}

  // private createConfig(): AdalConfig {
  //   let config: AdalConfig = {
  //     tenant: 'SPE372945.onmicrosoft.com',
  //     clientId: '71ab1320-91d8-414e-a925-2e29a6624812',
  //     postLogoutRedirectUrl: window.location.origin + '/',
  //     //postLogoutRedirectUri: window.location.origin + '/',
  //     redirectUri: window.location.origin + '/',
  //     responseType: '',
  //     extraQueryParameter: 'resource=https://graph.microsoft.com',
  //     resource: ''
  //   };
  //   return config;
  // }

// // Create config and get AuthenticationContext
// window.config = {
//   tenant: variables.azureAD,
//   clientId: variables.clientId,
//   postLogoutRedirectUri: window.location.origin,
//   endpoints: {
//     graphApiUri: "https://graph.microsoft.com",
//     sharePointUri: "https://" + variables.sharePointTenant + ".sharepoint.com",
//   },
//   cacheLocation: "localStorage"
// };
// var authContext = new AuthenticationContext(config);

}

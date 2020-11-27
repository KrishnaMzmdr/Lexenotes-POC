/*import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent {
constructor(
private authenticationService:AuthenticationService
){
}

email: string;
password: string;
 
signUp() {
this.authenticationService.SignUp(this.email, this.password);
this.email = '';
this.password = '';
} 

signIn() {
this.authenticationService.AuthSignIn(this.email, this.password);
this.email = '';
this.password = '';
}

signOut() {
this.authenticationService.AuthSignOut();
}

}
*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'User';
  constructor(public router: Router) {}
}

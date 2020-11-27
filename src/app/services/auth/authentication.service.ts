import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})

export class AuthenticationService {
userData: Observable<firebase.User>;

constructor(private angularFireAuth: AngularFireAuth) {
this.userData = angularFireAuth.authState;
}

/* Sign up */
/*SignUp(email: string, password: string) {
this.angularFireAuth
.auth
.createUserWithEmailAndPassword(email, password)
.then(res => {
console.log('You are Successfully signed up!', res);
})
.catch(error => {
console.log('Something is wrong:', error.message);
});
}*/

/* Sign in */
AuthSignIn() {
	
//email : string = 'admin@demo.com';
//password : string ='password123';	
this.angularFireAuth.auth.signInWithEmailAndPassword('admin@demo.com', 'password123')
.then(res => {//console.log(res)
//console.log('You are Successfully logged in!');
 
localStorage.setItem('authData', JSON.stringify(res));
})
.catch(err => {
 console.log('Something is wrong:',err.message);
 // catchError(this.handleError)
});
}

isAuthenticated() { 
    if (localStorage.getItem('authData')) {
      return true;
    }
	else{
		return false;
	}
  }

/* Sign out */
AuthSignOut() {
this.angularFireAuth
.auth
.signOut();
}

}
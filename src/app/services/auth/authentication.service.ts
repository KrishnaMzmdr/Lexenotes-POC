/************* This service page is used for firebase authentication. **************/

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
 
AuthSignIn() {
	 
this.angularFireAuth.auth.signInWithEmailAndPassword('admin@demo.com', 'password123')
.then(res => { 
 
localStorage.setItem('authData', JSON.stringify(res));
})
.catch(err => {
 console.log('Something is wrong:',err.message); 
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
 
AuthSignOut() {
this.angularFireAuth
.auth
.signOut();
}

}
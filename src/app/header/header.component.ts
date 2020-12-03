import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FirebaseService } from '../services/firebase/firebase.service'; 
import { AuthenticationService } from '../services/auth/authentication.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth"; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 ListUser : any = [];	

  constructor( private titleService: Title, 
   public firebaseService: FirebaseService,
   public authService: AuthenticationService,
    private router: Router,
	public afAuth: AngularFireAuth ) { }

  ngOnInit() {
	  
	  this.ListUser=JSON.parse(localStorage.getItem('currentUser'));
  }
  
/*
Function Name: isLoggedIn
Author: Krishna
This function is used to check whether the user is logged in or not. 
*/

  get isLoggedIn() { 
      return this.firebaseService.isLoggedIn(); 
	 
  }
/*
Function Name: setPageTitle
Author: Krishna
This function is used to set the name of the page in browser. 
*/
  setPageTitle(title: string) {
    this.titleService.setTitle(title);
  }
  
/*
Function Name: logout
Author: Krishna
This function is used to log out the user. 
*/


  logout123(){
	  this.authService.AuthSignOut();
	  this.router.navigateByUrl('/login');
  }
  
    logout() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('currentUser');
       this.router.navigateByUrl('/login');
    })
  }
}

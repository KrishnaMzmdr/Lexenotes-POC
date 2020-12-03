import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FirebaseService } from '../services/firebase/firebase.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 ListUser : any = [];	

  constructor( private titleService: Title, 
   public firebaseService: FirebaseService,
    private router: Router) { }

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


  logout(){
	  this.firebaseService.logout();
	  this.router.navigateByUrl('/login');
  }
}

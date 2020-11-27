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

  constructor( private titleService: Title, 
   public firebaseService: FirebaseService,
    private router: Router) { }

  ngOnInit() {
  }

  get isLoggedIn() { 
      return this.firebaseService.isLoggedIn(); 
	 
  }

  setPageTitle(title: string) {
    this.titleService.setTitle(title);
  }

  logout(){
	  this.firebaseService.logout();
	  this.router.navigateByUrl('/login');
  }
}

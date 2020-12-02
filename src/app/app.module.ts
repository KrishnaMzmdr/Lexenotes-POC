import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AuthenticationService } from './services/auth/authentication.service';
import { FirebaseService } from './services/firebase/firebase.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,	
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule, 
    AdminModule,
    AuthModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
	AngularFirestoreModule,
    FormsModule
  ],
  providers: [AuthenticationService,FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

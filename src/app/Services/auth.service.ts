import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(private fireBaseAuth: AngularFireAuth,
    private ngZone: NgZone, private router: Router) { 
      this.fireBaseAuth.authState.subscribe(user => {
        if(user){
          this.userData = user;
          localStorage.setItem('user', this.userData.email)
        }
      });
    }

    logIn(email: string, password: string){
      return this.fireBaseAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.router.navigate(['/'])
        }).catch((error)=>{
          window.alert(error.message)
        });
    }

    signUp(email:string, password: string){
      return this.fireBaseAuth.createUserWithEmailAndPassword(email, password)
        .then((result) =>{
          this.router.navigate(['/'])
        }).catch((error)=>{
          window.alert(error.message)
        });
    }
    logOut(){
      return this.fireBaseAuth.signOut().then(() =>{
        localStorage.removeItem('user')
        this.router.navigate(['/login'])
      });
    }
    isLoggedIn(){
      const user = localStorage.getItem('user');
      return user? true : false;
    }
    getUser(){
      const user = localStorage.getItem('user');
      return user? user: null;
    }

  
}

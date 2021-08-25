import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData = {
    username:'',
    password:''
  };
  constructor(private snack : MatSnackBar,
              private loginService: LoginService,
              private router: Router) { }

 

  ngOnInit(): void {
  }
  formSubmit(){

    if(this.loginData.username.trim()===''||this.loginData.username == null){
      this.snack.open("Username is required !!",'',{
        duration:3000,// thoi gian maat 
        horizontalPosition: 'right', // can le ben phai
        verticalPosition : "top", // le lao
      });
      return; 
    }

    
    if(this.loginData.password.trim()===''||this.loginData.password == null){
      this.snack.open("Password is required !!",'',{
        duration:3000,// thoi gian maat 
        horizontalPosition: 'right',
        verticalPosition : "top",
      });
      return; 
    }

    // requet to server 
    this.loginService.generateToken(this.loginData).subscribe((data : any) => {
     
      //login 
      this.loginService.loginUser(data.token);

      this.loginService.getCurrentUser().subscribe(
        (user : any) =>{

          this.loginService.setUser(user);
          // console.log(user);
          // console.log(user);
          // redirect .. admin 
          // redirect .. nomal 
          if(this.loginService.getUserRole() == "ADMIN"){
            // window.location.href='/admin';
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubject.next(true);
          } else if(this.loginService.getUserRole() == "NORMAL") {
            // window.location.href='/user-dashboard';
            this.router.navigate(['user-dashboard']);
            this.loginService.loginStatusSubject.next(true);
          } else {
            this.loginService.logout();
            
          }
        }
      );


    }, (error : any) => {
      this.snack.open("Invalid Details !! Try again",'',{
        duration:3000,// thoi gian maat 
        horizontalPosition: 'right',
        verticalPosition : "top",
      });
    })

  }

}

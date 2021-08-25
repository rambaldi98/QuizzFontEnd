import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private userService: UserService,
    private snack: MatSnackBar
  ) { }

  public user = {
    username: '',
    password:'',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  }
  ngOnInit(): void {
  }

  formSubmit() {
    // alert('submit');
    console.log(this.user);
    if(this.user.username == ''||this.user.password == null){
      // alert('User is required !!');
      this.snack.open(
        "Username  is required !!", '',{
          duration:3000,
          verticalPosition: 'top',
          horizontalPosition : 'right',
        }
      )
      return;
    }
    //validate

    this.userService.addUser(this.user).subscribe((data:any) => {
      // suceess
      console.log(data);
      // alert('Suceess');
      Swal.fire('Success done !!','user id is ' + data.id,'success')
    },(error) => {
      // erroer
      console.log(error);
      this.snack.open('Some thing went wrong !!','',{
        duration:3000,
        horizontalPosition: 'right',
        verticalPosition : "top",
      })
      // alert('error');
    })

    // add user 
  }

  // this.user 

}

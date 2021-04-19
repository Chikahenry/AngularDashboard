import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup; 
  submitted = false;  
  requestObj: any;
  status: any;
  emailAddress: any;
  password: any;
  fieldTextType: boolean;  

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient, 
    private router: Router,  ) { }

    ngOnInit(): void {
     
    this.loginForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.maxLength(45)]],
      password: ['', Validators.required], 
    });
 

  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  onSubmit(formAllData: any) {
    this.submitted = true;
    

    if (this.loginForm.invalid) {
      return;
    }

    this.emailAddress = formAllData.emailAddress;
    this.password = formAllData.password; 

    let verifyRequestObj = {
      email: this.emailAddress,
      password: this.password, 
    };
 

    if (this.loginForm.valid) {
      this.submitted = false;
      let date = new Date();
        localStorage.setItem('admin_email', this.emailAddress);
        localStorage.setItem('admin_id', 1); 

        localStorage.setItem('admin_role_id', 1); 
        localStorage.setItem('admin_created_at', date);

       Swal.fire({
            icon: 'success',
            title: 'Logged in',
            text: "You're logged in successfully",
            showConfirmButton: true,
            timer: 5000
        });
        this.router.navigate(['/dashboard']);
 
  }
}
   
 
}


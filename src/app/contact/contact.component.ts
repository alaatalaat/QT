import { AlertService } from './../alert.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm : FormGroup;
  constructor(private http: HttpClient,private router:Router,
    private api:AlertService,private fb:FormBuilder) {

      this.contactForm = this.fb.group({
        name :['',[Validators.required,Validators.pattern(/[a-zA-Z]/g)]],
        email : ['',[Validators.required,Validators.email,Validators.pattern('.*com$')]],
        message : ['',Validators.required],
      })
  }
  get name(){return this.contactForm.get('name') as FormControl};
  get email(){return this.contactForm.get('email') as FormControl};
  get message(){return this.contactForm.get('message') as FormControl};


  send(){
    console.log(this.contactForm.value);
    this.http.post<any>('http://localhost:3000/posts/',this.contactForm.value).subscribe({
      next : (res) =>{
        alert("Successfully Send Data 👍 ");
        this.contactForm.reset();
      },
      error : (res)=>{
        alert("Error While Sending Data ❌")
      }
    });
    console.log('Alaa');
  }


}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Alerts } from 'src/app/shared/alertas';
import { UserRegister } from '../login/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userRegister: UserRegister = {
    name:'',
    email:'',
    password:'',
    phone:''
  }

  alertas: Alerts = new Alerts()
  
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(form: NgForm){
    if(form.valid){
      this.auth.register(this.userRegister)
          .subscribe(resp => {
            this.alertas.customDialog('Usuario Registrado con éxito')
            setTimeout(() => this.router.navigate(['/protegida']),1500);
          },err=> {
            const msg = err.error.error.message  
            this.alertas.error(msg,'Cerrar','Este email ya se encuentra registrado')
          })
    }
  }

}

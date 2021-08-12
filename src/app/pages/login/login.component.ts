import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserLogin} from './models/User';

import Swal from 'sweetalert2';
import { Alerts } from 'src/app/shared/alertas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = {
      email:'',
      password:''
  }

  alertas: Alerts = new Alerts()
  recordar:boolean = true

  constructor(private auth:AuthService, private router:Router) {}

  ngOnInit(): void {
    this.userLogin.email = this.auth.getToken('email')
  }

  login(form:NgForm):void{
    if(form.valid){
      this.auth.login(this.userLogin)
        .subscribe(resp => {
          if(this.recordar) this.auth.setToken('email',this.userLogin.email)
          this.alertas.success('Espere','OK','Login Ëxitoso')
          Swal.showLoading()
          setTimeout(() => {
            Swal.close()
            this.router.navigate(['/protegida'])
          },1500);
        },err => {
            const msg = (err.error.error.message === 'EMAIL_NOT_FOUND') 
                ? 'El email no se encuentra registrado'
                : 'La contraseña es incorrecta'
            this.alertas.error(msg,'Cerrar','Error al Autenticar')
        })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Alerts } from 'src/app/shared/alertas';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-protegida',
  templateUrl: './protegida.component.html',
  styleUrls: ['./protegida.component.scss']
})
export class ProtegidaComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  alertas: Alerts = new Alerts();

  logout(){
    this.auth.logout()
    this.alertas.success('Espere','Cerrar','Sesión Finalizada')
    Swal.showLoading()
    setTimeout(() => {
      Swal.close()
      window.location.reload();        
    },1500); 
  }

}

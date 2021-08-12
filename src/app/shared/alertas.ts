import Swal from 'sweetalert2';

export class Alerts{
    
    success(msg:string,btn_txt:string,title:string){
        Swal.fire({
          allowOutsideClick:false,
          title: title,
          text: msg,
          icon: 'success',
          confirmButtonText: btn_txt,
          timer: 1500
        })
      }
    
      error(msg:string,btn_txt:string,title:string){
        Swal.fire({
          allowOutsideClick:false,
          title: title,
          text: msg,
          icon: 'error',
          showConfirmButton: false,
          showDenyButton: true,
          denyButtonText: btn_txt
        })
      }

      customDialog(title:string){
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: title,
            showConfirmButton: false,
            timer: 1500
        })
      }
}
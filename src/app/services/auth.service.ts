import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin, UserRegister } from '../pages/login/models/User';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Crear Usuario en Firebase
  // 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]'
 
  // Login de Usuario con Firebase
  // 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]'

  private url      : string = 'https://identitytoolkit.googleapis.com/v1/accounts:'
  private apiKey   : string = 'AIzaSyDWnQ023ldKT0cWuAAqcgqnzvqjyMZRPN4'

  private userToken: string = '' 

  constructor(private http: HttpClient) { }

  login(user: UserLogin){
    return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`,{
      ...user,
      returnSecureToke: true
    }).pipe(
      map( (resp:any) => {
        this.setToken('token',resp['idToken'])
        return resp
      })
    )
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('email')
  }

  register(user: UserRegister){
    return this.http.post(`${this.url}signUp?key=${this.apiKey}`,{
      ...user,
      returnSecureToke: true
    }).pipe(
      map( (resp:any) => {
        this.setToken('token',resp['idToken'])
        return resp
      })
    )
  }

  
  public setToken(etiqueta:string,token:string){
    this.userToken = token
    localStorage.setItem(etiqueta,this.userToken)
  }

  public getToken(etiqueta:string):string{
    if( localStorage.getItem(etiqueta) && etiqueta == 'token' )
      this.userToken = <string>localStorage.getItem(etiqueta);
    else
      this.userToken = ''
    return <string>localStorage.getItem(etiqueta);
  }

  statusUser():boolean{
    return (this.userToken.length > 2) ? true : false
  }

}

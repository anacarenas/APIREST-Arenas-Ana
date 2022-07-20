import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logo = '../assets/login.png'
  myUsuario?:Usuario;
  myForm : FormGroup;
  error:{mensaje:String} |null =null;
  @Output () private rol = new EventEmitter<number>();
  constructor(private fb: FormBuilder, private router: Router, private usuarioService:UsuarioService) {

    this.myForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.maxLength(20)]],
      contrasenia: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  ngOnInit(): void {
    this.usuarioService.rolActual=0;
  }

  ingresar() {
    
    this.myUsuario = this.usuarioService.listUsuario.filter(x => x.usuario == this.myForm.get('usuario')!.value)[0]
    console.log(this.myUsuario);
    console.log(this.myForm.get('contrasenia')!.value);
    if(this.myUsuario.contrasenia==this.myForm.get('contrasenia')!.value){
      this.usuarioService.rolActual= this.myUsuario.rolCode;
      console.log(this.myUsuario.rolCode);
      this.rol.emit(this.myUsuario.rolCode);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/listAlumnos']);
    });
    
    }

    


  }

}
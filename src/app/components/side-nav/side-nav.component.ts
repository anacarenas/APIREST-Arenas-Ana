import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  ngOnInit(): void {

  }
  public get currentUser() {
    return this.usuarioService.rolActual;
  }

  adminNav = [
    {name:"Cerrar Sesion" , route: "/login", icon:"logout"},
    {name:"Usuarios" , route: "/listUsuarios", icon:"settings_accessibility"},
    {name:"Alumnos" , route: "/listAlumnos", icon:"emoji_people"},
    {name:"Cursos" , route: "/listCursos", icon:"browse_activity"},
    {name:"Users" , route: "/listUsers", icon:"settings_accessibility"},
  ]
  userNav = [
    {name:"Cerrar Sesion" , route: "", icon:"logout"},
    {name:"Alumnos" , route: "/listAlumnos", icon:"emoji_people"},
    {name:"Cursos" , route: "/listCursos", icon:"browse_activity"},
  ]
  noneNav = [
    {name:"Iniciar Sesion" , route: "", icon:"login"},
  ]

  actualizarRol(rol:Event){
    console.log("hola");
    this.ngOnInit();   

  }
  constructor(private usuarioService:UsuarioService) {
    console.log(this.isAdmin);
  }
  isNone=this.usuarioService.rolActual==0;

  isUser=this.usuarioService.rolActual==1;

  isAdmin =this.usuarioService.rolActual==2;

}

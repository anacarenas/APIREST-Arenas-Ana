import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-add-edit-usuario',
  templateUrl: './add-edit-usuario.component.html',
  styleUrls: ['./add-edit-usuario.component.css']
})
export class AddEditUsuarioComponent implements OnInit {

  roles: any[] = [{nombre:'Usuario', id:1},{ nombre:'Administrador',id:2}];
  idUsuario: any;
  usuarioSeleccionado: Usuario | null=null;
  accion = 'Crear';
  myForm : FormGroup;
  error:{mensaje:String} |null =null;

  constructor(private fb: FormBuilder,
              private UsuarioService: UsuarioService, 
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute) { 
    this.myForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.maxLength(20)]],
      contrasenia: ['', [Validators.required, Validators.maxLength(20)]],
      rolCode: ['', [Validators.required]]
    });
    const idParam = 'id';
    this.idUsuario = this.aRoute.snapshot.params[idParam];

  }
  ngOnInit(): void {
    if (this.idUsuario !== undefined) {
      this.accion = 'Editar';
      this.esEditar();
    }
  }

  guardarUsuario() {
      const Usuario: Usuario = {
      usuario: this.myForm.get('usuario')!.value,
      contrasenia: this.myForm.get('contrasenia')!.value,
      rolCode:this.myForm.get('rolCode')!.value.id,
    };

    if (this.idUsuario !== undefined) {
      this.editarUsuario(Usuario);
    } else {
      this.agregarUsuario(Usuario);
    }
  }

  agregarUsuario(Usuario: Usuario) {
    this.UsuarioService.addUsuario(Usuario);
    this.snackBar.open('El Usuario fue registrado con exito!', '', {
      duration: 3000
    });
    this.route.navigate(['/listUsuarios']);
  }

  editarUsuario(Usuario: Usuario) {
    this.UsuarioService.editUsuario(Usuario, this.idUsuario);
    this.snackBar.open('El Usuario fue actualizado con exito!', '', {
      duration: 3000
    });
    this.route.navigate(['/listUsuarios']);
  }

  esEditar() {
    //const usuarioSeleccionado: Usuario = this.UsuarioService.getUsuario(this.idUsuario);
    this.UsuarioService.obtenerUsuario(this.idUsuario).then((usuario)=>
    {
      this.myForm.patchValue({
        usuario: usuario.usuario,
        contrasenia: usuario.contrasenia,
        rolCode: usuario.rolCode,
      });
      console.log(usuario);
    }).catch((error)=>{
      this.error= error;
    })  
  }
  get nombreInvalido() {
    return this.myForm.get('usuario')?.hasError('required') && this.myForm.get('usuario')?.touched;
  }
  get apellidoInvalido() {
    return this.myForm.get('contrasenia')?.hasError('required') && this.myForm.get('contrasenia')?.touched;
  }

}

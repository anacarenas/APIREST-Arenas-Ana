import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-edit-curso',
  templateUrl: './add-edit-curso.component.html',
  styleUrls: ['./add-edit-curso.component.css']
})
export class AddEditCursoComponent implements OnInit {

  idCurso: any;
  cursoSeleccionado: Curso | null=null;
  accion = 'Crear';
  myForm : FormGroup;
  error:{mensaje:String} |null =null;

  constructor(private fb: FormBuilder,
              private CursoService: CursoService, 
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute) { 
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      codigo: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
    });
    const idParam = 'id';
    this.idCurso = this.aRoute.snapshot.params[idParam];

  }
  ngOnInit(): void {
    if (this.idCurso !== undefined) {
      this.accion = 'Editar';
      this.esEditar();
    }
  }

  guardarCurso() {
      const curso: Curso = {
      nombre: this.myForm.get('nombre')!.value,
      codigo: this.myForm.get('codigo')!.value,
    };

    if (this.idCurso !== undefined) {
      this.editarCurso(curso);
    } else {
      this.agregarCurso(curso);
    }
  }

  agregarCurso(curso: Curso) {
    this.CursoService.addCurso(curso);
    this.snackBar.open('El Curso fue registrado con exito!', '', {
      duration: 3000
    });
    this.route.navigate(['/listCursos']);
  }

  editarCurso(Curso: Curso) {
    this.CursoService.editCurso(Curso, this.idCurso);
    this.snackBar.open('El Curso fue actualizado con exito!', '', {
      duration: 3000
    });
    this.route.navigate(['/listCursos']);
  }

  esEditar() {
    this.CursoService.obtenerCurso(this.idCurso).then((curso)=>
    {
      this.myForm.patchValue({
        nombre: curso.nombre,
        codigo: curso.codigo,
      });
      console.log(curso);
    }).catch((error)=>{
      this.error= error;
    })  
  }
  get nombreInvalido() {
    return this.myForm.get('nombre')?.hasError('required') && this.myForm.get('nombre')?.touched;
  }
  get apellidoInvalido() {
    return this.myForm.get('apellidos')?.hasError('required') && this.myForm.get('apellidos')?.touched;
  }
}

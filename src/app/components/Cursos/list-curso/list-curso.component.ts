import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/models/curso';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeConfirmacionComponent } from '../../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { CursoService } from 'src/app/services/curso.service';
import { map, Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-list-curso',
  templateUrl: './list-curso.component.html',
  styleUrls: ['./list-curso.component.css']
})
export class ListCursoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'codigo', 'acciones'];
  dataSource : MatTableDataSource<Curso> = new MatTableDataSource();
  tableDataSource$: Observable<MatTableDataSource<Curso>>;

  susbcriptions: Subscription = new Subscription();
  cursoSelect: Curso | null = null;

  listCurso:Curso[]=[ ];
  constructor(private cursoService : CursoService, public dialog: MatDialog,
    public snackBar: MatSnackBar) { 
      this.tableDataSource$ = this.cursoService.getCursos().pipe(tap((cursos) => console.log(cursos)), map((cursos) => new MatTableDataSource<Curso>(cursos)));


    }

  ngOnInit(): void {
    // this.cargarCursos();
    
    console.log(this.listCurso);
  }
  ngOnDestroy(){
    this.susbcriptions.unsubscribe();
  }

 


/*   cargarCursos() {
    this.listCurso = this.cursoService.getCursos();
    this.dataSource = new MatTableDataSource(this.listCurso);
  } */

  eliminarCurso(index: number) {

    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Esta seguro que desea eliminar el Curso?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {
        //this.cursoService.eliminarCurso(index);
        //this.cargarCursos();
        this.cursoService.deleteCursoByIndex(index)
        this.snackBar.open('El Curso fue eliminado con exito!', '', {
          duration: 3000
        });
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, Subscription, tap } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MensajeConfirmacionComponent } from '../../shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {
  displayedColumns: string[] = ['usuario', 'contrasenia', 'rol', 'acciones'];
  dataSource : MatTableDataSource<Usuario> = new MatTableDataSource();
  tableDataSource$: Observable<MatTableDataSource<Usuario>>;
  
  susbcriptions: Subscription = new Subscription();
  usuarioSelect: Usuario | null = null;
  public roles: any[] = [{nombre:'Usuario', id:1},{ nombre:'Administrador',id:2}];
  listUsuario:Usuario[]=[ ];
  constructor(private usuarioService : UsuarioService, public dialog: MatDialog,
    public snackBar: MatSnackBar) { 
      this.tableDataSource$ = this.usuarioService.getUsuarios().pipe(tap((usuarios) => console.log(usuarios)), map((usuarios) => new MatTableDataSource<Usuario>(usuarios)));


    }

  ngOnInit(): void {
    // this.cargarUsuarios();
    
    console.log(this.listUsuario);
  }
  ngOnDestroy(){
    this.susbcriptions.unsubscribe();
  }

  applyFilter(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.susbcriptions.add(
      this.usuarioService.searchUsuariosByName(filterValue).subscribe({
          next: (usuarios) => {
            this.listUsuario.push(usuarios)
          }, error : (error) => {
            console.error(error)
          }
        })
    )
    
    //this.tableDataSource$.filter = filterValue.trim().toLowerCase();
  }


/*   cargarUsuarios() {
    this.listUsuario = this.usuarioService.getUsuarios();
    this.dataSource = new MatTableDataSource(this.listUsuario);
  } */

  eliminarUsuario(index: number) {

    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Esta seguro que desea eliminar el Usuario?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {
        //this.usuarioService.eliminarUsuario(index);
        //this.cargarUsuarios();
        this.usuarioService.deleteUsuarioByIndex(index)
        this.snackBar.open('El Usuario fue eliminado con exito!', '', {
          duration: 3000
        });
      }
    });
  }

}

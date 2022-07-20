import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, Subscription, tap } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';
import { MensajeConfirmacionComponent } from '../../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  displayedColumns: string[] = ['user', 'password', 'rol', 'acciones'];
  dataSource : MatTableDataSource<User> = new MatTableDataSource();
  tableDataSource$: Observable<MatTableDataSource<User>>;
  
  susbcriptions: Subscription = new Subscription();
  userSelect: User | null = null;
  public roles: any[] = [{nombre:'User', id:1},{ nombre:'Administrador',id:2}];
  listUser:User[]=[ ];
  constructor(private userService : UserService, public dialog: MatDialog,
    public snackBar: MatSnackBar) { 
      this.tableDataSource$ = this.userService.getUsers().pipe(tap((users) => console.log(users)), map((users) => new MatTableDataSource<User>(users)));;
      console.log(this.tableDataSource$);

    }

  ngOnInit(): void {
    
    //console.log(this.listUser);
  }
  ngOnDestroy(){
    this.susbcriptions.unsubscribe();
  }

  


/*   cargarUsers() {
    this.listUser = this.userService.getUsers();
    this.dataSource = new MatTableDataSource(this.listUser);
  } */

  /* eliminarUser(index: number) {

    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Esta seguro que desea eliminar el User?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {
        //this.userService.eliminarUser(index);
        //this.cargarUsers();
        this.userService.deleteUserByIndex(index)
        this.snackBar.open('El User fue eliminado con exito!', '', {
          duration: 3000
        });
      }
    }); */
/*   } */

}

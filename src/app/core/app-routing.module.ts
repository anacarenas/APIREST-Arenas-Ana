import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAlumnoComponent } from '../components/Alumnos/list-alumno/list-alumno.component';
import { AddEditAlumnoComponent } from '../components/Alumnos/add-edit-alumno/add-edit-alumno.component';
import { LoginComponent } from '../components/login/login.component';
import { AddEditCursoComponent } from '../components/Cursos/add-edit-curso/add-edit-curso.component';
import { ListCursoComponent } from '../components/Cursos/list-curso/list-curso.component';
import { AddEditUsuarioComponent } from '../components/Usuarios/add-edit-usuario/add-edit-usuario.component';
import { ListUsuarioComponent } from '../components/Usuarios/list-usuario/list-usuario.component';
import { ListUserComponent } from '../components/Users/list-user/list-user.component';
import { AuthGuard } from '../auth-guard.guard';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', loadChildren:()=> import('../login/login.module').then(m =>m.LoginModule) },
  { path: 'addAlumno', canActivate: [AuthGuard], component: AddEditAlumnoComponent },
  { path: 'editAlumno/:id', canActivate: [AuthGuard], component: AddEditAlumnoComponent },
  {path: 'listAlumnos',canActivate: [AuthGuard], component: ListAlumnoComponent},
  { path: 'addCurso', canActivate: [AuthGuard], component: AddEditCursoComponent },
  { path: 'editCurso/:id', canActivate: [AuthGuard], component: AddEditCursoComponent },
  {path: 'listCursos',canActivate: [AuthGuard], component: ListCursoComponent},
  { path: 'addUsuario', canActivate: [AuthGuard], component: AddEditUsuarioComponent },
  { path: 'editUsuario/:id', canActivate: [AuthGuard], component: AddEditUsuarioComponent },
  {path: 'listUsuarios',canActivate: [AuthGuard], component: ListUsuarioComponent},
  {path: 'listUsers',canActivate: [AuthGuard], component: ListUserComponent},
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

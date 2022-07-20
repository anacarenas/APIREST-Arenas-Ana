import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, from, map, Subject } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  constructor() { }
  listCurso:Curso[]=[
    {nombre: "Angular Basico", codigo:1},
    {nombre: "Angular Intermedio", codigo:2},
    {nombre: "Angular Avanzado ", codigo:3},
  ];

  editCurso(Curso: Curso, idCurso: number){
    this.listCurso[idCurso].nombre = Curso.nombre;
    this.listCurso[idCurso].codigo = Curso.codigo;
  }

  cursoSelected$ = new Subject<Curso | null>();
  cursos$ = new BehaviorSubject<Curso[]>(this.listCurso);


  addCurso(curso:Curso){
    this.listCurso.push(curso)
    this.cursos$.next(this.listCurso)
  }

  getCursos(){
    return this.cursos$.asObservable()
  }

  getCursoSelect(){
    return this.cursoSelected$.asObservable()
  }

  selectCursoByIndex(index?: number){
    this.cursoSelected$.next(index !== undefined ? this.listCurso[index] : null)
  }

  deleteCursoByIndex(index?: number){
    this.listCurso = this.listCurso.filter((_, i) => index != i)
    this.cursos$.next(this.listCurso)
  }

  obtenerCurso(index:number):Promise<Curso>{
    return new Promise((resolve, rejects)=>{
      const curso = this.listCurso[index];
      if(curso){
        return resolve(curso)
      }
      rejects({mensaje: 'error al cargar el curso'})
    })
    
  }
}

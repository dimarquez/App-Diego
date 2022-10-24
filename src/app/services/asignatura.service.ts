import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Key } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  asignaturas: any[] = [
    {
      id_asi: '1',
      nombre: 'Progamación web'
    },{
      id_asi: '2',
      nombre: 'Calidad de software'
    }
  ];
  constructor(private router: Router, private storage: Storage) { this.init(); }

  addAsignatura(asignatura){
    if(this.getAsignatura(asignatura.id_asi) == undefined) {
      this.asignaturas.push(asignatura);
      return true;
    }
    return false;
  }

  getAsignatura(id_asi){
    return this.asignaturas.find(asig => asig.asig == id_asi);
  }

  getAsignaturas(){
    return this.asignaturas;
  }
  
  updateAsignatura(asignatura){
    let index = this.asignaturas.findIndex(asig => asig.id_asi == asig.id_asi);
    this.asignaturas[index] = asignatura;
  }

  deleteAsignatura(id_asi){
    this.asignaturas.forEach((asig, index) => {
      if (asig.id_asi == id_asi) {
        this.asignaturas.splice(index,1);
      }
    });
  }

  validarNombre(nombre){
    return this.asignaturas.find(asig => asig.nombre == nombre);
  }


  //Storage


  async init(){
    await this.storage.create();
  }

  async agregarConKey(key: string, valor: string ){

    await this.storage.set(key, valor );

  }

  async agregar(valor: any ){
    let id = await this.storage.length()+1;
    await this.storage.set(id.toString(), valor);
  }

  async rescatar(key: string ){
    return await this.storage.get(key);
  }
  
  listar(){
    let listado = []
    this.storage.forEach((v,k) => {listado.push(v);})
    return listado;
  }
  eliminar(key:string ){
    this.storage.remove(key);

  }









}

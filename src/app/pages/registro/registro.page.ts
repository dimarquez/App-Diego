import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  //variable grupo:
  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    ap_paterno: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_nac: new FormControl('', [Validators.required]),
    //solo se validan correos de alumnos.
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duocuc).(cl)')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    //el tipo de usuario cuando se registrar en solo del tipo alumno.
    tipo_usuario: new FormControl('alumno', [Validators.required]),
  });
  repetir_clave: string;

  constructor(private usuarioService: UsuarioService, private storage: StorageService,private validaciones: ValidacionesService, private router: Router) { }

  usuarios: any[] = [];  

  KEY_PERSONAS = 'usuarios';
  //usuarios: any[] = [];

 async ngOnInit() {
   await this.cargarPersonas();
  }

  async cargarPersonas(){
    this.usuarios = await this.storage.getDatos(this.KEY_PERSONAS);
  }

  //métodos:
  async registrar() {
    console.log(this.usuario.value);
    console.log(this.usuario.controls.nombre.value);
    //validación de salida para buscar un rut válido.
    if (!this.validaciones.validarRut(this.usuario.controls.rut.value)) {
      alert('Rut incorrecto!');
      return;
    }
    //validación de salida para verificar que persona tenga al menos 17 años.
    if (!this.validaciones.validarEdadMinima(17, this.usuario.controls.fecha_nac.value)) {
      alert('Edad mínima 17 años!');
      return;
    }
    //validación de coincidencia de contraseñas.
    if (this.usuario.controls.clave.value != this.repetir_clave) {
      alert('Contraseñas no coinciden!');
      return;
    }
    var respuesta : boolean = await this.storage.agregar(this.KEY_PERSONAS, this.usuario.value)
    //console.log((respuesta));
    
    if (respuesta) {
      console.log(this.cargarPersonas);
      alert('Usuario registrado!');
      //this.router.navigate(['/login']);
      await this.cargarPersonas();
    } else {
      alert('Usuario ya existe!');
    }
    }

  }

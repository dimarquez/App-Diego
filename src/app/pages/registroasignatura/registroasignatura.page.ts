import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AsignaturaService } from 'src/app/services/asignatura.service';
@Component({
  selector: 'app-registroasignatura',
  templateUrl: './registroasignatura.page.html',
  styleUrls: ['./registroasignatura.page.scss'],
})
export class RegistroasignaturaPage implements OnInit {
  
  asignatura = new FormGroup({
    id_asi: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  asignaturas: any[] = [];
  constructor(private asignaturaService: AsignaturaService, private router: Router) { }

  ngOnInit() {
    this.asignaturas = this.asignaturaService.getAsignaturas();
  }

  registrarAsignatura() {
    if (this.asignaturaService.addAsignatura(this.asignatura.value)){
      alert('Asignatura registrada!');
      this.asignatura.reset();  
      this.router.navigate(['/login']);
    } else {
      alert('Asignatura ya existe!');
    }

  }

  async agregar(id_asi:HTMLInputElement, nombre: HTMLInputElement){
    const datos = [{
      "id_asi" : id_asi.value,
      "nombre" : nombre.value
    }];
    await this.asignaturaService.agregar(datos);

  }
}

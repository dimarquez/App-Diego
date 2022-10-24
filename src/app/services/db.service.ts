import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private router: Router) { }

  canActivate(){
    this.router.navigate(['error404']);

    return false;
  }

}

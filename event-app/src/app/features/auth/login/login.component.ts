import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private router: Router) {}

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Données saisies (Login) :', form.value);
      alert('Connexion réussie !');
      this.router.navigate(['/events']);
    } else {
      Object.keys(form.controls).forEach(key => form.controls[key].markAsTouched());
    }
  }
}

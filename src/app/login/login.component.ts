import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class LoginComponent {
  token: string = '';

  constructor(private router: Router) {}

  onLogin(): void {
    if (this.token.trim().length > 0) {
      localStorage.setItem('authToken', this.token);
      this.router.navigate(['/products']);
    } else {
      alert('Please enter a valid token!');
    }
  }
}

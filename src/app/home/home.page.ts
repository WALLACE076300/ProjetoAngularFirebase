import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  usuario = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  private apiUrl = 'http://127.0.0.1:8000/api/usuario'; // base da API Laravel

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastCtrl: ToastController
  ) {}

  async cadastrarUsuario() {
    this.http.post(`${this.apiUrl}/registrar-se`, this.usuario).subscribe({
      next: async (res: any) => {
        const toast = await this.toastCtrl.create({
          message: 'Usuário cadastrado com sucesso!',
          duration: 2000,
          color: 'success'
        });
        toast.present();

        this.router.navigate(['/login']); // após cadastro, vai para o login
      },
      error: async (err) => {
        const toast = await this.toastCtrl.create({
          message: err.error?.message || 'Erro ao cadastrar usuário',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }
}

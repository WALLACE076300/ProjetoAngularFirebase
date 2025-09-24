import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credenciais = {
    email: '',
    password: ''
  };

  mensagem: string = ''; // 🔹 mensagem para exibir no HTML

  private readonly apiUrl = 'http://127.0.0.1:8000/api'; // base da API Laravel

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastCtrl: ToastController
  ) {}

  async loginUsuario() {
    this.mensagem = ''; // limpa mensagens antigas

    // evita enviar campos vazios ou com espaços extras
    const dados = {
      email: this.credenciais.email.trim(),
      password: this.credenciais.password.trim()
    };

    this.http.post(`${this.apiUrl}/usuario/login`, dados).subscribe({
  next: async (res: any) => {
    try {
      // ⚠️ Confirme se o backend retorna res.token ou res.access_token
      const token = res.token || res.access_token;
      if (!token) {
        throw new Error('Token não retornado pelo servidor');
      }

      localStorage.setItem('token', token);

      const toast = await this.toastCtrl.create({
        message: 'Login realizado com sucesso!',
        duration: 2000,
        color: 'success'
      });
      toast.present();

      this.router.navigate(['/perfil']); // ✅ sem "return"
    } catch (e) {
      console.error('Erro no processamento do login:', e);
      this.mensagem = 'Erro inesperado no login';
    }
  },
  error: async (err) => {
    console.error('Erro no login:', err);

    // mensagem mais amigável
    this.mensagem =
      err.error?.message ||
      err.error?.error ||
      'Credenciais inválidas';

    const toast = await this.toastCtrl.create({
      message: this.mensagem,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
});

  }

  irParaCadastro() {
    return this.router.navigate(['/cadastro']); // rota para cadastro
  }
}

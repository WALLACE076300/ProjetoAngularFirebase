import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  // ✅ Corrige o erro: Define a propriedade 'usuario'
  usuario = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  // ✅ Corrige o erro: Define o método chamado no botão
  logarUsuario() {
    console.log('Tentando logar com:', this.usuario);
    // Aqui você pode integrar com seu serviço de API para login
    // Exemplo:
    // this.authService.login(this.usuario).subscribe(...)
  }

  // ✅ Corrige o erro: Redireciona para a página de cadastro
  irParaCadastro() {
    this.router.navigate(['/home']);
  }
  irParaPerfil() {
    this.router.navigate(['/perfil']);
  }
}

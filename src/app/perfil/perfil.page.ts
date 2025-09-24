import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { ToastController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any = { name: '', email: '', status: '', foto: '' };
  novaSenha: string = '';
  novaPostagem: string = '';
  postagens: any[] = [];

  constructor(
    private apiService: ApiService,
    private toastCtrl: ToastController,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.carregarPerfil();
    this.carregarPostagens();
  }

  // 🔹 Carregar perfil
  carregarPerfil() {
    this.apiService.getWithToken('usuario/perfil').subscribe({
      next: (resp: any) => {
        this.usuario = resp;
        // Use sempre a URL completa
        const baseUrl = 'http://localhost:4200/perfil';
        this.usuario.foto = `${baseUrl}${resp.picture}?t=${new Date().getTime()}`;
      },
      error: (err: any) => {
        console.error('Erro ao carregar perfil:', err);
        this.mostrarToast('Erro ao carregar perfil', 'danger');
      },
    });
  }

  // 🔹 Atualizar perfil
  atualizarPerfil() {
    this.apiService.postWithToken('usuario/editar', this.usuario).subscribe({
      next: () => this.mostrarToast('Perfil atualizado com sucesso!', 'success'),
      error: (err: any) => {
        console.error('Erro ao atualizar perfil:', err);
        this.mostrarToast('Erro ao atualizar perfil', 'danger');
      },
    });
  }

  // 🔹 Alterar senha
  mudarSenha() {
    if (!this.novaSenha.trim()) return;

    const dados = { password: this.novaSenha, password_confirmation: this.novaSenha };

    this.apiService.postWithToken('usuario/editar', dados).subscribe({
      next: () => {
        this.novaSenha = '';
        this.mostrarToast('Senha alterada com sucesso!', 'success');
      },
      error: (err: any) => {
        console.error('Erro ao alterar senha:', err);
        this.mostrarToast('Erro ao alterar senha', 'danger');
      },
    });
  }

  // 🔹 Upload de foto
  uploadFoto(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('picture', file);

    this.apiService.postWithToken('usuario/foto-upload', formData).subscribe({
  next: (resp: any) => {
    this.usuario.foto = resp.picture_url || this.usuario.foto;
    this.cdr.detectChanges(); // 🔄 força atualização da view
    this.mostrarToast('Foto atualizada com sucesso!', 'success');
  },
  error: (err: any) => {
    console.error('Erro ao enviar foto:', err);
    this.mostrarToast('Erro ao atualizar foto', 'danger');
  },

    });
  }

  // 🔹 Carregar postagens
  carregarPostagens() {
    this.apiService.getWithToken('postagens').subscribe({
      next: (resp: any) => this.postagens = resp,
      error: (err: any) => {
        console.error('Erro ao carregar postagens:', err);
        this.mostrarToast('Erro ao carregar postagens', 'danger');
      },
    });
  }

  // 🔹 Criar postagem
  criarPostagem() {
    if (!this.novaPostagem.trim()) return;

    this.apiService.postWithToken('postagens', { conteudo: this.novaPostagem }).subscribe({
      next: () => {
        this.novaPostagem = '';
        this.carregarPostagens();
        this.mostrarToast('Postagem criada!', 'success');
      },
      error: (err: any) => {
        console.error('Erro ao criar postagem:', err);
        this.mostrarToast('Erro ao criar postagem', 'danger');
      },
    });
  }

  // 🔹 Toast auxiliar
  private async mostrarToast(mensagem: string, cor: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      color: cor,
    });
    toast.present();
  }
  logout() {
    // Remove o token do localStorage
    localStorage.removeItem('token');

    // Redireciona para a página de login
    window.location.href = '/login';
  }
}

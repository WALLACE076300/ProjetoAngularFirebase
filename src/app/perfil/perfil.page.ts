import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

interface Usuario {
  name: ([users.name]);
  email: ([users.email]);
  photoURL: string;
}

interface Postagem {
  id?: number;
  description: string;
  created_at: string;
  user?: Usuario; // Novo: dados do usuário que postou
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: Usuario = {
    photoURL: 'https://i.ytimg.com/vi/rwiT5FK5zJQ/maxresdefault.jpg',
    name: '([users.name])',
    email: '([users.email])'
  };

  defaultUserPhoto = 'https://www.gravatar.com/avatar?d=mp'; // Foto padrão

  novaPostagem: string = '';
  postagens: Postagem[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.carregarPostagens();
  }

  carregarPostagens() {
    this.apiService.get('postagens').subscribe({
      next: (res: any[]) => {
        this.postagens = res.map((post: any) => ({
          id: post.id,
          description: post.description,
          created_at: post.created_at,
          user: post.user || null
        }));
      },
      error: (err) => {
        console.error('Erro ao carregar postagens', err);
      }
    });
  }

  fazerPostagem() {
    if (!this.novaPostagem.trim()) return;

    const nova = {
      description: this.novaPostagem
    };

    this.apiService.post('postagens', nova).subscribe({
      next: () => {
        this.novaPostagem = '';
        this.carregarPostagens();
      },
      error: (err) => {
        console.error('Erro ao postar', err);
      }
    });
  }
}

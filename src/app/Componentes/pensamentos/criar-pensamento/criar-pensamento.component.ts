import { Router } from '@angular/router';
import { PensamentoService } from '../pensamento.service';
import { PensamentoInterface } from '../pensamento/Interfaces/pensamento';
import { Component } from '@angular/core';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent {
  pensamento: PensamentoInterface = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
  };

  constructor(
    private service: PensamentoService,
    private router: Router
  ){}

  criarPensamento() {
    this.service.criar(this.pensamento).subscribe(() => {
      //A função criar pensamento irá puxar o método service adicionado anteriormente para usar o método criar() dele com o parâmetro do pensamento criado aqui na propria classe, que pega as informações digitadas no HTML e jogará dentro do nosso banco de dados.
      this.router.navigate(['/listarPensamento'])
      //router é uma função do proprio Angular que permite adicionar uma rota específica em uma função, que quando usada irá redirecionar o usuário.
    })
  }

  cancelar() {
    alert('Cancelado');
  }
}

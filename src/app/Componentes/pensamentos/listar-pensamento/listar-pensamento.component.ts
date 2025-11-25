import { Component } from '@angular/core';
import { PensamentoInterface } from '../pensamento/Interfaces/pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent {
  public listaPensamentos: PensamentoInterface[] = [];
  //o array de lista de pensamentos que conterá todos os pensamentos precisa pegar a herança da interface para que todos os pensamentos adicionados aqui sejam exatamente iguais em atributos e tipos.

  constructor(private service: PensamentoService) {}
  //Para utilizar o método listar() do serviço, precisamos importa-lo.
  //O constructor está importando a classe PensamentoService e atribuindo ela a variável service

  ngOnInit(): void {
    this.service.listar().subscribe((respostaListaPensamentos) => {
      //Para utilizar os métodos criados no serviço que importamos acima, usamos o this.service.listar()
      //metodo subscribe é o que vai 'trazer' as informações observadas pelo método observable dentro do método lista() e colocar dentro da variável (respostaListaPensamentos)
      this.listaPensamentos = respostaListaPensamentos;
      //Aqui adicionamos essa resposta a nossa variável de listaPensamentos que será utilizada no programa
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PensamentoInterface } from './pensamento/Interfaces/pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';
  //Criamos uma váriavel chamada API que irá conter o nosso endpoint e irá acessar o conteúdo do nosso backend local.

  //O readonly é uma palavra-chave que torna o conteúdo da váriavel imutável(no caso a URL apenas, não o conteúdo dela) , definindo como apenas leitura, o que evita que o conteúdo da variável seja alterado depois que a aplicação for iniciada.

  constructor(private http: HttpClient) {}
  //É necessário fazer a importação do módulo http na pasta app.module.ts.

  //O constructor está importando a classe HttpCliente, para usar suas propriedades e métodos da node_modules(dependências do Angular).

  //Já o private (Modificador de Acesso) define o método http como atributo dessa classe especifícamente, não podendo ser acessada de nenhum outro lugar.

  //O http: define o nome que será usado para "puxar" os métodos de HttpCliente, pode-se ler como "http é do tipo HttpCliente".

  listar(): Observable<PensamentoInterface[]> {
    //O observable é o que vai ficar 'observando' as informações (pode ser outra informação como uma string) e informando todas as mudanças que acontecerem nele em tempo real
    return this.http.get<PensamentoInterface[]>(this.API);
    //Criamos a função listar() com a intenção de retornar todos os pensamentos localizados no arquivo do backend.

    //Usamos this para nos referir a classe em que estamos atualmente(PensamentosService), dentro da classe acessamos o método http adicionado anteriormente, dentro do método http usamos outro método chamado get, que 'pega' informações, e o definimos para pegar informações da nossa váriavel API(this.API).

    //Dentro dos <> usamos para definir a tipagem do conteúdo que o get vai pegar, nessa caso usamos a tipagem já definida na interface.
  }
  criar(pensamento: PensamentoInterface): Observable<PensamentoInterface> {
    return this.http.post<PensamentoInterface>(this.API, pensamento);
    //Essa função irá adicionar um novo pensamento dentro do nosso banco de dados através do método post() em que o primeiro parametro será ONDE queremos adicionar e o segundo parâmetro será O QUE queremos adicionar.

    //No segundo parâmetro da função post() usamos o paramêtro da nossa função criar() para podermos usa-lá em criar-pensamento.component.ts e setar o pensamento que desejamos adicionar dentro do nosso banco de dados.
  }

  buscarPorId(id: number): Observable<PensamentoInterface> {
    const url = `${this.API}/${id}`;
    return this.http.get<PensamentoInterface>(url);
    //Também seleciona um pensamento pelo seu ID constrói uma URL com esse ID no fim e retorna o pensamento pertencente a esse ID pelo metodo get()
  }

  excluir(id: number): Observable<PensamentoInterface> {
    const url = `${this.API}/${id}`;
    return this.http.delete<PensamentoInterface>(url);
    //A função excluir pegará o ID do pensamento desejado, construirá uma URL com o endpoint do backend e adiciona o ID do pensamento no final, para que seja excluído do banco de dados o pensamento desejado

    //Irá retornar o método http, com o método delete() com a url montada anteriormente para ele saber qual arquivo será deletado do banco de dados
  }

  editar(pensamento: PensamentoInterface): Observable<PensamentoInterface> {
    const url = `${this.API}/${pensamento.id}`;
    return this.http.put<PensamentoInterface>(url, pensamento);
  }
}

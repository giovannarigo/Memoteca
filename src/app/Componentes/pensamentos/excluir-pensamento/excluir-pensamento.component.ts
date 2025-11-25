
import { Component } from '@angular/core';
import { PensamentoInterface } from '../pensamento/Interfaces/pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.css'],
})
export class ExcluirPensamentoComponent {
  pensamento: PensamentoInterface = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
  };

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    //Ele vai verificar o id contido NA URL gerada pelo pensamento ao clicar em excluir (veja em pensamento.component.html como ele cria a URL)
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento)=>{
      //o buscarPorID() irá acessar URL do banco de dados com o id que nos pegamos pelo paramMap.get() e irá retornar pelo Observable a URL com os atributos do pensamento.

      //o parâmetro pensamento do subscribe irá conter o valor retornado pelo observable, no caso o pensamento e todos seus atributos contido na URL.

      this.pensamento = pensamento
      //Pegamos o pensamento do subscribe(pensamento) e colocamos ele no objeto pensamento dentro dessa classe para podermos manipula-lo
    })
  }

  excluirPensamento(){
    if(this.pensamento.id){
      this.service.excluir(this.pensamento.id).subscribe(()=>{
        //Pegamos o ID do pensamento adicionado ao objeto anteriormente e usamos para exclui-lo

        //Assim que o evento excluir acontecer, o Observable irá emitir uma notificação, o subscribe irá receber essa notificação e irá executar outra função:
        this.router.navigate(['/listarPensamento'])
      })
    }
  }

  cancelar(){
    this.router.navigate(['/listarPensamento'])
  }
}

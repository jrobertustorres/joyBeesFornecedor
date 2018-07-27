import { ServicoCotacaoFornecedorEntity } from '../model/servico-cotacao-fornecedor-entity';

export class CotacaoFornecedorEntity {

  public idCotacao: number;
  public idOrcamentoFormat: string;
  public nomeUsuario: string;
  public emailUsuario: string;
  public telefone: string;
  public telefone2: string;
  
  public qtdTicketFornecedor: number;

  public validadeOrcamento: Date;
  public validadeOrcamentoFormat: string;
  public dataSolicitacao: Date;
  public dataSolicitacaoFormat: string;
  public statusCotacaoEnum: string;
  public dataRespostaFormat: string;

  public tipoPagamento: string;
  public dataEntrega: Date;

  public dataEntregaFormat: string;

  public listServicoCotacaoFornecedorEntity: ServicoCotacaoFornecedorEntity[] = [];

  constructor(){
  }
}

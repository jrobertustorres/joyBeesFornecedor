import { ServicoCotacaoFornecedorEntity } from '../model/servico-cotacao-fornecedor-entity';

export class CotacaoFornecedorEntity {

  public idCotacao: number;
  public idOrcamentoFormat: string;
  public nomeUsuario: string;
  public emailUsuario: string;
  public telefone: string;
  public telefone2: string;

  public nomeCidadeUsuario: string;
  public nomeEstadoUsuario: string;
  public endereco: string;
  public nomeResidencia: string;
  public cepUsuario: string;

  public qtdTicketFornecedor: number;

  public validadeOrcamento: Date;
  public validadeOrcamentoFormat: string;
  public dataSolicitacao: Date;
  public dataSolicitacaoFormat: string;
  public statusCotacaoEnum: string;
  public dataRespostaFormat: string;
  public dataEscolhidaFormat: string;
  public dataConcluidaFormat: string;

  public tipoPagamento: string;
  public dataEntrega: Date;

  public dataEntregaFormat: string;
  public qtdCotacao: number;
  public dataCadastroFormat: string;

  public listServicoCotacaoFornecedorEntity: ServicoCotacaoFornecedorEntity[] = [];

  constructor(){
  }
}

import { ServicoCotacaoFornecedorEntity } from '../model/servico-cotacao-fornecedor-entity';

export class CotacaoFornecedorEntity {

  public idCotacao: number;
  public idOrcamentoFormat: string;
  public nomeCliente: string;
  public emailCliente: string;
  public telefone: string;
  public telefone2: string;
  
  public statusFrotista: boolean;
  public observacaoCliente: string;
  public qtdFrota: number;
  public cpfCnpj: string;
  public dataCadastroFormat: string;

  public placaFrotaFormat: string;
  public modeloMarcaFormat: string;
  public corVeiculo: string;
  public anoModeloFormat: string;

  public dataSolicitacaoServicoFormat: string;

  public validadeOrcamento: Date;
  public validadeOrcamentoFormat: string;
  public tipoPagamento: string;
  public dataEntrega: Date;
  public dataEntregaFormat: string;
  public prazoPagamento: string;

  public listServicoCotacaoFornecedorEntity: ServicoCotacaoFornecedorEntity[] = [];

  constructor(){
  }
}

export class CotacaoEntity {

  public idCotacao: number;
  public idOrcamento: number;
  public nomeFornecedor: string;
  public valorTotalFormat: string;
  public avaliacaoFornecedor: number;
  public enderecoFornecedorFormat: string;
  public dataRespostaFormat: string;

	//CAMPOS DO FORNECEDOR
  public statusCotacaoEnum: string;
  public nomeCliente: string;
  public idOrcamentoFormat: string;
  public dataCadastroFormat: string;

  public limiteDados: number;

  constructor(){
  }
}

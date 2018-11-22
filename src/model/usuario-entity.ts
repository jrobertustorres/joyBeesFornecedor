export class UsuarioEntity {

  public idUsuario: number;
  public idPessoa: number;
  public idFornecedor: number;
  public idCliente: number;
  
  public qtdTicketFornecedor: number;
  
  public nomePessoa: string;

  public idUsuarioFacebook: string;
  public email: string;
  public senha: string;
  public token: string;
  public tokenPush: string;
  // public statusAceitoTermoUso: boolean;
  public uuid: string;
  public versaoApp: string;
  public idiomaUsuario: string;

  public novaSenha: string;

  constructor(){
  }
}

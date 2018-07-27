import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let senhaUsuario = AC.get('senhaUsuario').value; // to get value in input tag
       let confirmSenha = AC.get('confirmSenha').value; // to get value in input tag
        if(senhaUsuario != confirmSenha) {
            AC.get('confirmSenha').setErrors( {MatchPassword: true} )
        } else {
            return null
        }
    }
    static MatchPasswordAlterarSenha(AC: AbstractControl) {
       let novaSenha = AC.get('novaSenha').value; // to get value in input tag
       let confirmSenha = AC.get('confirmSenha').value; // to get value in input tag
        if(novaSenha != confirmSenha) {
            AC.get('confirmSenha').setErrors( {MatchPassword: true} )
        } else {
            return null
        }
    }
}
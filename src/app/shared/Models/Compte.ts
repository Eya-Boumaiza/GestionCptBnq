

import {Operation} from './Operation';
export class Compte {

    codeCompte: string;
    rib: string;
    solde: number;
    dateCreation: Date;
    actif: string;
    banque: string;
    codeClient: string;
    codeBanque: string;
    operation: Operation[];
}

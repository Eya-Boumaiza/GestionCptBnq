
import {Compte} from './Compte';
export class Client {
        codeClient: string;
        numCin: number;
        nom : string;
        prenom : string;
        email: string;
        telephone : number;
        dateNaissance: string;
        pseudo: string
        motDePasse: string;
        adresse: string;
        compte:Compte[];
        dateCreation:string;
    }
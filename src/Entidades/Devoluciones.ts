export class Devoluciones {
    codigo: string;
    codPrestamo:string;
    fDevolucion: Date;

    constructor(cod:string,cdPres:string,fDev:Date){
        this.codigo=cod;
        this.fDevolucion = fDev;
        this.codPrestamo= cdPres;
    }

}
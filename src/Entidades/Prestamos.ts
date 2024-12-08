export class Prestamo {
    codigo: string;
    cedula: string;
    codlib: string;
    fPrestamo: Date;
    fLimite: Date;
    estado: boolean;

    constructor(cod: string, ced: string,cdlib:string, fPres: Date, fLim: Date, est: boolean) {
        this.codigo = cod;
        this.cedula = ced;
        this.codlib= cdlib;
        this.fPrestamo = fPres;
        this.fLimite = fLim;
        this.estado = est;
    }
}
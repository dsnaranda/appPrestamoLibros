export class Libro {
    codigo: string;
    categoria: string;
    editorial: string;
    nombre: string;
    autor: string;
    anio: number;
    tipo: string;
    estado: boolean;

    constructor(cod:string,cat:string,ed:string,nom:string,au:string,an:number,tip:string,est:boolean){
        this.codigo=cod;
        this.categoria=cat;
        this.editorial=ed;
        this.nombre=nom;
        this.autor=au;
        this.anio=an;
        this.tipo=tip;
        this.estado=est;
    }
    
    estadoFalse(): void {
        this.estado = false;
    }
    
    estadoTrue(): void {
        this.estado = true;
    }
}  
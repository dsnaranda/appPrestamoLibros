export class Libro {
    _id: string;
    codigo: string;
    categoria: string;
    editorial: string;
    nombre: string;
    autor: string;
    ano: number;
    tipo: string;
    estado: boolean;

    constructor( id: string,cod:string,cat:string,ed:string,nom:string,au:string,an:number,tip:string,est:boolean){
        this._id = id;
        this.codigo=cod;
        this.categoria=cat;
        this.editorial=ed;
        this.nombre=nom;
        this.autor=au;
        this.ano=an;
        this.tipo=tip;
        this.estado=est;
    }
}  
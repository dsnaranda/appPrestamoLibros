export class Estudiante {
    cedula: string;
    nombre: string;
    apellido: string;
    sexo: string;
    fechaNacimiento: Date;
    estado: boolean;

    constructor(ced: string, nom: string, ap: string, sex: string, fecha: Date, est: boolean) {
        this.cedula = ced;
        this.nombre = nom;
        this.apellido = ap;
        this.sexo = sex;
        this.fechaNacimiento = fecha;
        this.estado = est;
    }
}

import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";


const app = express();
const PORT = 3000;
// Middleware para permitir CORS
app.use(cors());
app.use(express.json()); // Para manejar JSON


const getConenection = async () => {
    try {
        const mongoUrl = "mongodb://localhost:27017/appPrestamoLibros";
        const client = await MongoClient.connect(mongoUrl);
        console.log("Conexión a MongoDB establecida");
        return client.db();
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
};


const getEstudiantesTrue = async () => {
    try {
        const database = await getConenection();
        const usuarios = await database.collection("Estudiantes").find({ estado: true }).toArray(); // Filtra los estudiantes cuyo estado sea true
        return usuarios; // Retorna solo los usuarios cuyo estado es true
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        throw error; // Lanza el error para ser capturado en la ruta
    }
};


// Ruta para obtener usuarios
app.get("/api/usuariosvalidos", async (req, res) => {
    try {
        const usuarios = await getEstudiantesTrue();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});

const getEstudiantesFalse = async () => {
    try {
        const database = await getConenection();
        const usuarios = await database.collection("Estudiantes").find({ estado: false }).toArray(); // Filtra los estudiantes cuyo estado sea true
        return usuarios; // Retorna solo los usuarios cuyo estado es true
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        throw error; // Lanza el error para ser capturado en la ruta
    }
};


// Ruta para obtener usuarios
app.get("/api/usuariosnovalidos", async (req, res) => {
    try {
        const usuarios = await getEstudiantesFalse();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});


const añadirEstudiante = async (nuevoEstudiante) => {
    try {
        const database = await getConenection(); // Obtiene la conexión a la base de datos
        const result = await database.collection("Estudiantes").insertOne(nuevoEstudiante); // Inserta un solo estudiante
        return result; // Retorna el resultado de la inserción
    } catch (error) {
        console.error("Error al añadir el estudiante:", error);
        throw error; // Lanza el error para ser capturado en la ruta
    }
};

// Ruta para añadir un estudiante
app.post("/api/addEstudiantes", async (req, res) => {
    try {
        const nuevoEstudiante = req.body; // Obtén los datos del estudiante desde el cuerpo de la solicitud
        const result = await añadirEstudiante(nuevoEstudiante); // Llama a la función para añadir el estudiante
        res.status(201).json({ message: "Estudiante añadido correctamente", result }); // Responde con un mensaje de éxito
    } catch (error) {
        res.status(500).json({ error: "Error al añadir el estudiante" }); // Responde con un mensaje de error
    }
});




// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


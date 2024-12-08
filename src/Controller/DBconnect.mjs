import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
import { ObjectId } from 'mongodb';

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


// Ruta para obtener usuarios
app.get("/api/usuariosvalidos", async (req, res) => {
    try {
        const usuarios = await getEstudiantesTrue();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});


const getLibros = async () => {
    try {
        const database = await getConenection();
        const usuarios = await database.collection("Libros").find().toArray();
        return usuarios; // Retorna solo los usuarios cuyo estado es true
    } catch (error) {
        console.error("Error al obtener los libros:", error);
        throw error; // Lanza el error para ser capturado en la ruta
    }
};

app.get("/api/getLibros", async (req, res) => {
    try {
        const usuarios = await getLibros();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});

const getLibrosDisponibles = async () => {
    try {
        const database = await getConenection();
        const usuarios = await database.collection("Libros").find({ estado: true }).toArray();
        return usuarios;
    } catch (error) {
        console.error("Error al obtener los libros:", error);
        throw error; 
    }
};

app.get("/api/getLibrosDisponibles", async (req, res) => {
    try {
        const usuarios = await getLibrosDisponibles();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});

const deleteLibro = async (id) => {
    try {
        const database = await getConenection();
        const result = await database.collection("Libros").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            throw new Error('No se encontró ningún libro con ese ID');
        }

        return result;
    } catch (error) {
        console.error("Error al eliminar el libro:", error);
        throw error;
    }
};

// Endpoint DELETE para eliminar un libro
app.delete("/api/deleteLibro/:id", async (req, res) => {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL

    try {
        await deleteLibro(id);
        res.status(200).json({ message: "Libro eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el libro", details: error.message });
    }
});

const updateLibro = async (id, libroActualizado) => {
    try {
        const database = await getConenection();
        const result = await database.collection("Libros").updateOne(
            { _id: new ObjectId(id) }, // Condición para encontrar el libro
            { $set: libroActualizado }  // Los campos que se actualizarán
        );

        if (result.matchedCount === 0) {
            throw new Error('No se encontró ningún libro con ese ID');
        }

        return result;
    } catch (error) {
        console.error("Error al actualizar el libro:", error);
        throw error;
    }
};

app.put("/api/updateLibro/:id", async (req, res) => {
    const { id } = req.params;
    const libroActualizado = req.body;

    try {
        await updateLibro(id, libroActualizado);
        res.status(200).json({ message: "Libro actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el libro", details: error.message });
    }
});


const añadirLibro = async (nuevoLibro) => {
    try {
        const database = await getConenection(); // Obtiene la conexión a la base de datos
        const result = await database.collection("Libros").insertOne(nuevoLibro); // Inserta un solo estudiante
        return result; // Retorna el resultado de la inserción
    } catch (error) {
        console.error("Error al añadir el libro:", error);
        throw error; // Lanza el error para ser capturado en la ruta
    }
};

// Ruta para añadir un estudiante
app.post("/api/addLibro", async (req, res) => {
    try {
        const nuevoLibro = req.body; // Obtén los datos del estudiante desde el cuerpo de la solicitud
        const result = await añadirLibro(nuevoLibro); // Llama a la función para añadir el estudiante
        res.status(201).json({ message: "Libro añadido correctamente", result }); // Responde con un mensaje de éxito
    } catch (error) {
        res.status(500).json({ error: "Error al añadir el libro" }); // Responde con un mensaje de error
    }
});

const añadirPrestamo = async (nuevoPrestamos) => {
    try {
        const database = await getConenection(); // Obtiene la conexión a la base de datos
        const prestamosArray = Array.isArray(nuevoPrestamos) ? nuevoPrestamos : [nuevoPrestamos];

        // Inserta los préstamos en la colección "Prestamos"
        const result = await database.collection("Prestamos").insertMany(prestamosArray);

        // Actualiza el estado en la colección "Libros" para cada préstamo añadido
        for (const prestamo of prestamosArray) {
            if (prestamo.codlib) {
                await database.collection("Libros").updateOne(
                    { codigo: prestamo.codlib }, // Busca el libro por su código
                    { $set: { estado: false } } // Cambia el estado a false
                );
            }
        }

        return result; // Retorna el resultado de la inserción
    } catch (error) {
        console.error("Error al añadir el préstamo:", error);
        throw error; // Lanza el error para ser capturado en la ruta
    }
};

// Ruta para añadir uno o varios préstamos
app.post("/api/addPrestamos", async (req, res) => {
    try {
        const nuevoPrestamos = req.body; // Obtén los datos del préstamo desde el cuerpo de la solicitud
        const result = await añadirPrestamo(nuevoPrestamos); // Llama a la función para añadir el préstamo
        res.status(201).json({ message: "Préstamo(s) añadido(s) correctamente", result }); // Responde con un mensaje de éxito
    } catch (error) {
        res.status(500).json({ error: "Error al añadir el préstamo" }); // Responde con un mensaje de error
    }
});



const getPrestamos = async () => {
    try {
        const database = await getConenection();
        const usuarios = await database.collection("Prestamos").find().toArray(); // Filtra los estudiantes cuyo estado sea true
        return usuarios; // Retorna solo los usuarios cuyo estado es true
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        throw error; // Lanza el error para ser capturado en la ruta
    }
};


// Ruta para obtener usuarios
app.get("/api/getPrestamos", async (req, res) => {
    try {
        const usuarios = await getPrestamos();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


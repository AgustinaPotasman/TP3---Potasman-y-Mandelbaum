import express from "express"; // hacer npm i express
import cors from "cors"; // hacer npm i cors
import e from "express";
import Alumno from "./src/models/alumno.js";

const app = express();
const port = 3000;
// Agrego los Middlewares
app.use(cors()); // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON
//
// Aca pongo todos los EndPoints
//

app.get('/saludar', (req, res) => { // EndPoint "/saludar"
res.send('Hello World!');
})
//
// Inicio el Server y lo pongo a escuchar.
//
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => { 
    res.status(200).send('¡Ya estoy respondiendo!(200)');
})

app.get("/saludar/:nombre", (req, res) => { 
    res.status(200).send( `Hola ${req.params.nombre} `);
})


app.get("/validarfecha/:ano/:mes/:dia", (req, res) => {
    const { ano, mes, dia } = req.params;
    const fecha = new Date(`${ano}-${mes}-${dia}`);
    
    if (!isNaN(Date.parse(fecha))) {
        res.status(200).send("Fecha válida");
    } else {
        res.status(400).send("Fecha inválida");
    }
})

app.get("/matematica/sumar", (req, res) => {
    const { n1, n2 } = req.query;
    
    const numero1 = parseFloat(n1);
    const numero2 = parseFloat(n2);
    const resultado = numero1 + numero2;
    
    res.status(200).send(`El resultado de la suma es: ${resultado}`);
})

app.get("/matematica/restar", (req, res) => {
    const { n1, n2 } = req.query;
    
    const numero1 = parseFloat(n1);
    const numero2 = parseFloat(n2);
    const resultado = numero1 - numero2;
    
    res.status(200).send(`El resultado de la resta es: ${resultado}`);
})

app.get("/matematica/multiplicar", (req, res) => {
    const { n1, n2 } = req.query;
    
    const numero1 = parseFloat(n1);
    const numero2 = parseFloat(n2);
    const resultado = numero1  * numero2;
    
    res.status(200).send(`El resultado de la multiplicacion es: ${resultado}`);
})

app.get("/matematica/dividir", (req, res) => {
    const { n1, n2 } = req.query;
    
    const numero1 = parseFloat(n1);
    const numero2 = parseFloat(n2);
    const resultado = numero1  / numero2;
    
    res.status(200).send(`El resultado de la division es: ${resultado}`);
})

app.get("/omdb/searchbypage", async (req, res) => {
    const { search, p } = req.query;
    try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=your_api_key&s=${search}&page=${p}`);
        if (response.status === 200) {
            res.status(200).json(response.data);
        } else {
            res.status(500).send("Error al realizar la búsqueda en OMDB.");
        }
    } catch (error) {
        res.status(500).send("Error al realizar la búsqueda en OMDB.");
    }
})


app.get('/omdb/searchcomplete', async (req, res) => {
    const buscar = req.query.search;
    try {
        const searchResult = await OMDBSearchComplete(buscar);
        res.status(200).json(searchResult);
    } catch (error) {
        res.status(500).send("Error al realizar la búsqueda en OMDB.");
    }
});

app.get('/omdb/getbyomdbid', async (req, res) => {
    const imdbID = req.query.imdbID;
    
    try {
        const info = await OMDBGetByImdbID(imdbID);
        res.status(200).json(info);
    } catch (error) {
        res.status(500).send("Error al solicitar iinformación");
    }
});


const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido" , "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao" , "32623391", 18));


app.get('/alumnos', (req, res) => {
    res.status(200).send(alumnosArray);
  });


app.post('/alumnos', (req, res) => {
    const { nombre, dni, edad } = req.body;
    const nuevoAlumno = new Alumno(nombre, dni, edad);
    alumnosArray.push(nuevoAlumno);

    res.status(201).send('Alumno creado correctamente');
});

  
app.get("/alumnos/:dni", (req, res) => {

        const dni = req.params.dni;
        const alumno = alumnosArray.find(alumno => alumno.dni === dni);
        if (alumno) {
            res.status(200).json(alumno); 
        } else {
            res.status(404).send('Alumno no encontrado'); 
        }
});

app.delete("/alumnos", (req, res) => {
    const dni = req.body.dni;
    const eliminar = alumnosArray.findIndex(a => a.dni === dni); 
    if (eliminar !== -1)
    {
        alumnosArray.splice(eliminar);
        res.status(200).send('Alumno eliminado');
    }
    else{
        res.status(404).send('Alumno no encontrado');
    }

})






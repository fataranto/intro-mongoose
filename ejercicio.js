//FUNCIONA CORRECTAMENTE
const mongoose = require('mongoose');
//const { Schema } = mongoose;
// Nos concetamos a la base de datos 'veterinario' de nuestra instancia de MongoDB Atlas
mongoose.connect('mongodb+srv://root:root@cluster0.f04cy.mongodb.net/veterinario?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ejecutarConectados);
 
// Apartado 1: Define un esquema con Mongoose para crear los diferentes trabajadores de una clínica veterinaría.
// Un trabajador se define por las siguientes propiedades:
// 1. DNI, que es de tipo string
// 2. Un campo "nombre", con el nombre del trabajador/a, de tipo string
// 3. Un campo "apellidos", con los apellidos del trabajador/a, de tipo string
// 4. Sueldo bruto del trabajador/a, de tipo Number
// 5. Un campo de nombre "esAutonomo", de tipo Boolean, que indica si el trabajador es asalariado o trabaja eventualmente como autónomo
 
const trabajadorSchema = new mongoose.Schema ({
    dni: String,
    nombre: String,
    apellidos: String,
    sueldo: Number,
    esAutonomo: Boolean
});
 
const Trabajador = mongoose.model('trabajadores', trabajadorSchema);
 
 
async function ejecutarConectados() {
 
    const nuevaTrabajadora = new Trabajador({
        dni: '45123456H',
        nombre: 'Maria',
        apellidos: 'Aspavientos',
        sueldo: 28000,
        esAutonomo: false
    });
 
    const nuevoTrabajador = new Trabajador({
        dni: '123456Y',
        nombre: 'Ramón',
        apellidos: 'Cuatropezuñas',
        sueldo: 32000,
        esAutonomo: true
    });
 
    await nuevaTrabajadora.save();
    await nuevoTrabajador.save();
 
    db.close();
 
    // Apartado 2: Queremos insertar en la base de datos los 2 trabajdores de la empresa:
 
    // Maria Aspavientos, con dni 45123456H, que cobra 28000 euros brutos, y NO trabaja como autónoma, es asalariada.
    // Ramón Cuatropezuñas, con dni 123456Y, que cobra 32000 euros brutos, y tiene una relación mercantil con la empresa (trabaja como autónomo)
 
 
}
 

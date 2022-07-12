//FUNCIONA CORRECTAMENTE
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:root@cluster0.f04cy.mongodb.net/veterinario?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }); //en la connection string ya está indicada la BBDD "veterinario", si no existe, se creará

const db = mongoose.connection; //solicito la conexión
db.on('error', console.error.bind(console, 'connection error:')); // si hay error respondo con el mensaje 
db.once('open', ejecutarConectados); // si se conecta correctamente ejecuto la función "ejecutarConectados"

const mascotaSchema = new mongoose.Schema({ //defino el esquema, la estructura del objeto 
    nombre: {
        type: String,
        required: true
    },
    fechaNacimiento: Date, // proporcionada por el cliente
    numeroVisitas: {
        type: Number,
        default: () => { return 1 } // por defecto una visita, la primera al crear la ficha de la mascota
    },
    vacunasAdministradas: [String] // "triplefelina", "antimordisquitos", etc. Mongoose intentara 'castear' !!

})

const Mascota = mongoose.model('Mascotas', mascotaSchema); //creo el objeto "Mascota" con la estructura que yahabía definido en "mascotaSchema" y lo asocio con la tabla "Mascotas"

async function ejecutarConectados() {
    const nuevaMascota = new Mascota({ //creo una nueva instancia de "Mascota" y le asigno los nuevos valores
        nombre: "Pepi",
        fechaNacimiento: new Date("17 september 2019"),
        numeroVisitas: 5,
        vacunasAdministradas: ['tripleFelina', 'antimordisquitos']
    })

    await nuevaMascota.save(); //guardo el objeto en la tabla que ya tiene asignada. IMPORTANTE!!!! utilizar "await", si no, suele dar error "Buffering timed out after 10000ms"

    db.close();

}


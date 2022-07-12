//FUNCIONA CORRECTAMENTE!!!

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root@cluster0.f04cy.mongodb.net/test?retryWrites=true&w=majority'); //indico aquí la bbdd "test", si no existe, la creará

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', insertKitie);

const Cat = mongoose.model('Cat', { name: String });

async function insertKitie() {
    const kitty = new Cat({ name: 'Zildjian' });
    await kitty.save().then(() => console.log('meow'));
}


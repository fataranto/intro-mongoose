//FUNCIONA CORRECTAMENTE
const mongoose = require('mongoose')

const url = `mongodb+srv://root:root@cluster0.f04cy.mongodb.net/testconnect?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection; //solicito la conexión
db.on('error', console.error.bind(console, 'connection error:')); // si hay error respondo con el mensaje 
db.once('open', ejecutarTestconnect); // si se conecta correctamente ejecuto la función "ejecutarConectados"



const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Notes', noteSchema)


async function ejecutarTestconnect(){

  const note = new Note({
    content: 'HTML is Easy',
    date: new Date(),
    important: true,
  })
  
  await note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })


}


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const pinRoute = require('./routes/pins');
const userRoute = require('./routes/users');

dotenv.config();

app.use(express.json());

//DB CONNECTION
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB connection established.. Yay!!!'))
    .catch((err) => console.log(err));
    
app.use('/api/pins', pinRoute);
app.use('/api/users', userRoute);

app.listen(4400, () => {
    console.log('Backend server is running');
})
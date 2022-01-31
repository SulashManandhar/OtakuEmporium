const express = require('express');
const fileUpload = require('express-fileupload');
var cors = require('cors')

const app = express();

app.use(fileUpload());

app.use(cors())

//UPLOAD ENDPOINT
app.post('/uploads', cors(), (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file upload' });
    }
    const file = req.files.file;
    file.mv(`${__dirname}/otaku-admin/public/uploads/${file.name}`, err => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
        }) //path for file upload

})

const display = `
    <h1>Welcome to express server</h1>
    <hr>
    <span>Server is started...</span>
`

app.get('/', (req, res) => res.send(display));

const PORT = 4600;

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
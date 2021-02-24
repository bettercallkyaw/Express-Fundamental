const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

//init middleware
//app.use(logger);

//handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine','handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//homepage route
app.get('/', (req, res) => res.render(
    'index', {
        title: 'Express Member App',
        members
    }
));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//members api routes
app.use('/api/members',require('./routes/api/members'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

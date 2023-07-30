//=====================================================================//
//DEPENDENCIES//
const express = require('express');
//Import path to handle and transform file paths
const path = require('path');
//Import Express-Session
const session = require('express-session');
//Import handlebars
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Initializing express
const app = express();
//=====================================================================//
//port available for heroku and local server
const PORT = process.env.PORT || 3001;

//=====================================================================//
// Set up handlebars as the template engine
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up sessions
const sess ={
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//=====================================================================//

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//Start the server
// ***SHOULD WE BE USING THIS BELOW ? */
//Since we are using a sequelize object//
//Yes to above. TY Krysta - JR
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
  });

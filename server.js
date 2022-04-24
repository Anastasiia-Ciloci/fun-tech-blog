const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

//set express
const app = express();
const hbs = exphbs.create({ helpers });
const PORT = process.env.PORT || 3001;

//set session
const sess = {
  secret: "Super secret secret",
  cookie: { maxAge: 86400 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
//set handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//cookie session
app.use(session(sess));

//middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

app.use(routes);

sequelize
  .sync({
    force: false,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log("Now listening at http://localhost:3001/")
    );
  });

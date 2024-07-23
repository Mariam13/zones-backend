const zoneRoute = require("./routes/zone");
const createError = require("http-errors");
const express = require("express");
const origin = require("./helpers/origin.helper");

const app = express();
const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
    origin.headers(req, res);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/zones", zoneRoute);

/* Catch 404 and forward to error handler */
app.use(function (req, res, next) {
    next(createError(404));
});

/* Error handler */
app.use(function (err, req, res, next) {
    /* Set locals, only providing error in development */
    res.locals.message = err.message;
    res.locals.error = err;

    /* Render the error page */
    res.status(err.status || 500);
    res.json({ error: { message: err.message } });
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = server;

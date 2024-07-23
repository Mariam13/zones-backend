/* To set res headers for origin request */
exports.headers = (req, res) => {

  /* Website you wish to allow to connect */
  const allowedOrigins = ["http://localhost:4200"];
  const origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader("Access-Control-Allow-Origin", origin);
  }

  /* Request methods you wish to allow */
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

  /* Request headers you wish to allow */
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,authorization");

}

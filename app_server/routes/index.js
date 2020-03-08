var express = require('express');
var router = express.Router();
var pgPromise = require('pg-promise')
var pgp = pgPromise({
    // Initialization Options
});
var connectionString =`postgresql://letznav:Letznav122@instance-management.c7ngykcwaycp.us-east-1.rds.amazonaws.com:5432/dev_instancemanagement`;
var db =  pgp(connectionString);
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/:tenantName', async (req, res, next) => {
  console.log('re parms are ', req.params.tenantName);
  var tenanat = req.params.tenantName;
  const result = await db.query(`select properties->> 'dbUrl' as "dbUrl" from tenants where tenantname ='${tenanat}'`);
  var tenantDB = result[0].dbUrl;
  console.log("the data is ",tenantDB);
  var tenantconnectionString = tenantDB;
  var tenantDb =  pgp(tenantconnectionString);
  var flowCount = await tenantDb.query(`SELECT COUNT(*) as flows_count, MAX(updated_date) as last_updated
  FROM letznav.flows`);
  var validationCount = await tenantDb.query(`SELECT COUNT(*) as validations_count, MAX(updated_date) as last_updated FROM letznav.validations`);
  var badgesCount = await tenantDb.query(`SELECT COUNT(*) as count FROM letznav.badges`);
  var KcCount = await tenantDb.query(`SELECT COUNT(*) as content_count, MAX(updated_date) as last_updated FROM letznav.contents`);
  res.send({flows : flowCount[0].flows_count, validations: validationCount[0].validations_count, badges:badgesCount[0].count, kc: KcCount[0].content_count});
});

// const data = async (req, res, next) => {
//   const resut = await db.query(`select properties->>'dbUrl' as "dbUrl" from tenants where tenantname = 'development_pink_olive_panda'`);
//   var tenantDB = resut[0].dbUrl;
//   console.log("the data is ",tenantDB);
//   return tenantDB
// }

module.exports = router;

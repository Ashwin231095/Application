// import * as pgPromise from 'pg-promise';
var pgPromise = require('pg-promise')
var pgp = pgPromise({
    // Initialization Options
});
var connectionString =`postgres://postgres:postgres@127.0.0.1:5432/letznav`;
var db =  pgp(connectionString);

var data = function(req, res, next) {
    // const query =  db.one(`select properties->>'dbUrl' from tenants where tenantname = 'development_pink_olive_panda'`);
//     var query =  db.one(`select * from flows`).then(function (data) {
//         res.status(200)
//           .json({
//             status: 'success',
//             data: data,
//             message: 'Retrieved ALL puppies'
//           });
//       })
//     console.log('the data is ', )
//     return query;
console.log('in the function')
var data1 = db.one(`select * from flows`);
console.log(data1);
}

// export const getFlowsMetrics = async (client) => {
//     const result = await client.query(`SELECT COUNT(*) as flows_count, MAX(updated_date) as last_updated
//     FROM letznav.flows`);
//     return { count: result.rows[0].flows_count, last_updated: result.rows[0].last_updated};
// };

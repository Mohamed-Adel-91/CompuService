// function asyncMiddleware(handler) {
//     return async function (req, res, next) {
//         try {
//             await handler(req, res);
//         } catch (ex) {
//             next(ex);
//         }
//     };
// }

// module.exports = asyncMiddleware;

// this middleware  is used to handle errors that happen in the downstream middlewares

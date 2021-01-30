module.exports = function (handler) { //initiator function
    return async function (req, res, next) { //return router handler
        try {
           await handler(req, res);
        } catch (err) {
            next(err)
        }
    }
}
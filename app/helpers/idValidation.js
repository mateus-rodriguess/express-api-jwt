const { ObjectId } = require('mongodb');

module.exports = {
    idValidation: function (req, res, next) {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ "message": "Id invalid" })
        }
        return next()
      
    }
}
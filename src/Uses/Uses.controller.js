const usesData = require("../data/uses-data")


function list(req, res) {
    const {urlId} = req.params
    res.json({ data: usesData.filter(usesData ? uses => uses.urlId == urlId: () => true)})
}

function usesExist(req, res, next) {
    const usesId = req.params
    const foundUses = usesData.find((uses) => uses.id === Number(usesId))

    if(foundUses) {
        res.locals.uses = foundUses
        return next()
    }
    next({
        status: 404,
        message: `Uses id not found: ${usesId}`
    })
}

function read(req, res, next) {
    res.json({data: res.locals.uses})
}

module.exports = {
    list,
read: [usesExist, read]
}
const controller = require("./Urls.controller")
const router = require("express").Router({mergeParams: true})
const app = require("../app")
const methodNotAllowed = require("../MethodNotAllowed/MethodNotAllowed")
const usesRouter = require("../Uses/Uses.router")

router.route("/:urlId").get(controller.read2).get(controller.read).put(controller.update).delete(controller.delete).all(methodNotAllowed)
router.route("/:urlId/uses", controller.urlExists, usesRouter)
router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed)


module.exports = router
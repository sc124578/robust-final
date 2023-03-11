const router = require("express").Router({mergeParams: true})
const controller = require("./Uses.controller")
const methodNotAllowed = require("../MethodNotAllowed/MethodNotAllowed")

router.route("/").get(controller.list)
router.route("/:usesId").get(controller.read).all(methodNotAllowed)


module.exports = router
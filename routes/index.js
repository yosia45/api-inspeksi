const express = require('express')
const router = express.Router()
const errorHandler = require('../middlewares/errorHandler')
const questionCategoryRoute = require('../routes/questionCategory-route')

router.use("/category", questionCategoryRoute)
router.use(errorHandler)

module.exports = router
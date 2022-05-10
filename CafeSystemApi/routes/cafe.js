var express = require('express');
var router = express.Router();
var cafeController = require('../controllers/cafe');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + (file.mimetype === 'image/png' ? '.png' : '.jpg'))
    }
})

var upload = multer({ storage: storage })
var type = upload.single('logo');

router.get('/cafeApi', cafeController.fetchData);
router.post('/cafeApi/getCafe', cafeController.fetchOne);
router.post('/cafeApi', type, cafeController.addData);
router.put('/cafeApi', type, cafeController.updateData);
router.delete('/cafeApi', cafeController.deleteData);
router.put('/cafeApi/updateEmployees', cafeController.updateEmployees);

module.exports = router;
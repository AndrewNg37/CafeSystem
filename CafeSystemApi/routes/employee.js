var express = require('express');
var router = express.Router();
var employeeController = require('../controllers/employee');

router.get('/employeeApi', employeeController.fetchData);
router.post('/employeeApi/getEmployee', employeeController.fetchOne);
router.post('/employeeApi', employeeController.addData);
router.put('/employeeApi', employeeController.updateData);
router.put('/employeeApi/updateCafeName', employeeController.updateCafeName);
router.delete('/employeeApi', employeeController.deleteData);

module.exports = router;
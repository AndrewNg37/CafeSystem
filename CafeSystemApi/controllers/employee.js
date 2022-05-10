var employeeModel = require('../models/employee');
module.exports = {
  fetchData: async (req, res) => {
    await employeeModel.fetchData(function (callback) {
      if(req.query.cafe){
        var filtered;
        filtered = callback.data.slice().sort((a, b) => a.start_datetime < b.start_datetime ? -1 : 0).filter((data) => data.cafe.indexOf(req.query.cafe) > -1);
        res.status(200).send({ employees: filtered });
      }else{
        res.status(200).send({ employees: callback.data });
      }
     
    })
  },
  fetchOne: async (req, res) => {
    await employeeModel.fetchOne(req.body, function (response) {
      if (!response.error) {
          res.status(200).send({ employees: response.data, message: "" });
      } else {
        res.status(400).send({ employees: [], message: response.message });
      }
    })
  },
  addData: async (req, res) => {
    await employeeModel.addData(req.body, function (response) {
        if (!response.error) {
            employeeModel.fetchData(function (callback) {
            res.status(200).send({ employees: callback.data, message: "" });
          })
        } else {
          res.status(400).send({ employees: [], message: response.message });
        }
      });
  },
  updateData: async (req, res) => {
    await employeeModel.updateData(req.body, function (response) {
      if (!response.error) {
        employeeModel.fetchData(function (callback) {
          res.status(200).send({ employees: callback.data, message: "" });
        })
      } else {
        res.status(400).send({ employees: [], message: response.message });
      }
    });
  },
  updateCafeName: async (req, res) => {
    await employeeModel.updateCafeName(req.body, function (response) {
      if (!response.error) {
        res.status(200).send({ employees: [], message: "Update successfully!" });
      } else {
        res.status(400).send({ employees: [], message: response.message });
      }
    });
  },
  deleteData: async (req, res) => {
    await employeeModel.deleteData(req.body, function (response) {
      if (!response.error) {
        employeeModel.fetchData(function (callback) {
          res.status(200).send({ employees: callback.data, message: "" });
        })
      } else {
        res.status(400).send({ employees: [], message: response.message });
      }
    });
  },
  deleteMany: async (req, res) => {
    await employeeModel.deleteMany(req.query.cafe, function (response) {
      if (!response.error) {
        employeeModel.fetchData(function (callback) {
          res.status(200).send({ employees: callback.data, message: "" });
        })
      } else {
        res.status(400).send({ employees: [], message: response.message });
      }
    });
  }
}
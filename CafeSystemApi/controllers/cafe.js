var cafeModel = require('../models/cafe');
var employeeModel = require('../models/employee');
const fs = require("fs");

module.exports = {
  fetchData: async (req, res) => {
    await cafeModel.fetchData(function (callback) {
      if (req.query.location && req.query.sort) {
        var filtered;
        filtered = callback.data.slice().sort((a, b) => a.employees < b.employees ? -1 : 0).filter((data) => data.location.indexOf(req.query.location) > -1).map((cafe) => {
          return {
            id: cafe._id,
            name: cafe.name
          }
        });
        res.status(200).send({ cafe: filtered });
      } else if (req.query.location && !req.query.sort) {
        var filtered;
        filtered = callback.data.slice().sort((a, b) => a.employees < b.employees ? -1 : 0).filter((data) => data.location.indexOf(req.query.location) > -1);
        res.status(200).send({ cafe: filtered });

      } else if (!req.query.location && req.query.sort) {
        var filtered;
        filtered = callback.data.map((cafe) => {
          return {
            id: cafe._id,
            name: cafe.name
          }
        });
        res.status(200).send({ cafe: filtered });

      } else {
        res.status(200).send({ cafe: callback.data });
      }

    })
  },
  fetchOne: async (req, res) => {
    await cafeModel.fetchOne(req.body, function (response) {
      if (!response.error) {
          res.status(200).send({ cafe: response.data, message: "" });
      } else {
        res.status(400).send({ cafe: [], message: response.message });
      }
    })
  },
  addData: async (req, res) => {
    var body = req.body;
    if (req.file) {
      body.logo = req.get('host') + '/' + req.file.path;
    }

    await cafeModel.addData(JSON.stringify(body), function (response) {
      if (!response.error) {
        cafeModel.fetchData(function (callback) {
          res.status(200).send({ cafe: callback.data, message: "" });
        })
      } else {
        res.status(400).send({ cafe: [], message: response.message });
      }
    });
  },
  updateData: async (req, res) => {
    var body = req.body;
    if (req.file) {
      body.logo = req.get('host') + '/' + req.file.path;
    }
    await cafeModel.updateData(JSON.stringify(body), function (response) {
      if (!response.error) {
        cafeModel.fetchData(function (callback) {
          res.status(200).send({ cafe: callback.data, message: "" });
        })
      } else {
        res.status(400).send({ cafe: [], message: response.message });
      }
    });

  },
  updateEmployees: async (req, res) => {
    await cafeModel.updateEmployees(req.body, function (response) {
      if (!response.error) {
        res.status(200).send({ message: "Update cafe employees successfully!" });
      } else {
        res.status(400).send({ message: response.message });
      }
    });

  },
  deleteData: async (req, res) => {
    await cafeModel.deleteData(req.body.id, function (response) {
      if (!response.error) {
        employeeModel.deleteMany(req.body.name, function (response) {
          if (!response.error) {
            cafeModel.fetchData(function (callback) {
              res.status(200).send({ cafe: callback.data, message: "" });
            })
          } else {
            res.status(400).send({ cafe: [], message: response.message });
          }
        });
      } else {
        res.status(400).send({ cafe: [], message: response.message });
      }
    });
  }
}


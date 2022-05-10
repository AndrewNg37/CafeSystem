var mongoose = require('mongoose');
var db = require('../database');
const { ObjectId } = require('bson');

var employeeSchema = new mongoose.Schema({
    id: ObjectId,
    name: {
        type: String,
        unique: false,
        required: true
    },
    email_address: {
        type: String,
        unique: false,
        required: true
    },
    phone_number: {
        type: Number,
        unique: false,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    start_datetime: {
        type: Date,
        // default: Date.now,
        required: false
    },
    cafe: {
        type: String,
        required: false
    }

}, { collection: 'employees' });

employeeTable = mongoose.model('employees', employeeSchema);

module.exports = {
    fetchData: (callback) => {
        var employeeData = employeeTable.find({});
        employeeData.exec(function (err, data) {
            if (!err) {
                return callback({ data: data, error: false, message: "" });
            } else {
                return callback({ data: [], error: true, message: "Error on adding employee!" });
            }
        })
    },
    fetchOne: (data, callback) => {
        var employeeData = employeeTable.findOne({ _id: data.id });
        employeeData.exec(function (err, data) {
            if (!err) {
                return callback({ data: data, error: false, message: "" });
            } else {
                return callback({ data: [], error: true, message: "Error on adding employee!" });
            }
        })
    },
    addData: (data, callback) => {
        var newEmployee = new employeeTable(data);
        try {
            newEmployee.save(function (err, data) {
                if (err) {
                    return callback({ error: true, message: "Error on adding employee!" });
                } else {
                    return callback({ error: false, message: "" });
                }
            });
        } catch (ex) {
            return callback({ error: true, message: ex });
        }
    },
    updateData: (data, callback) => {
        try {
            if (data.id && data.id.match(/^[0-9a-fA-F]{24}$/)) {
                const filter = { _id: data.id };
                const update = data;
                var employeeData = employeeTable.findOneAndUpdate(filter, update, { new: true });

                employeeData.exec(function (err, data) {
                    if (!err) {
                        return callback({ error: false, message: "" });
                    }
                })
            } else {
                return callback({ error: true, message: "ID not found!" });
            }
        } catch (ex) {
            return callback({ error: false, message: ex });
        }
    },
    updateCafeName: (data, callback) => {
        try {
            if (data) {
                const filter = { cafe: data.current_cafe };
                const update = data.new_cafe;
                var employeeData = employeeTable.updateMany(filter, { $set: { cafe: update } }, { new: true });
                employeeData.exec(function (err, data) {
                    if (!err) {
                        return callback({ error: false, message: "" });
                    }
                })
            } else {
                return callback({ error: true, message: "Cafe not found!" });
            }
        } catch (ex) {
            return callback({ error: false, message: ex });
        }

    },
    deleteData: (data, callback) => {
        try {
            if (data.id && data.id.match(/^[0-9a-fA-F]{24}$/)) {
                var employeeData = employeeTable.findByIdAndRemove(data.id);
                employeeData.exec(function (err, data) {
                    if (!err) {
                        return callback({ error: false, message: "" });
                    }
                })
            } else {
                return callback({ error: true, message: "ID not found!" });
            }
        } catch (ex) {
            return callback({ error: false, message: ex });
        }

    },
    deleteMany: (cafeName, callback) => {
        try {
            if (cafeName) {
                var employeeData = employeeTable.deleteMany({ cafe: cafeName });
                employeeData.exec(function (err, data) {
                    if (!err) {
                        return callback({ error: false, message: "" });
                    }
                })
            } else {
                return callback({ error: true, message: "Cafe not found!" });
            }
        } catch (ex) {
            return callback({ error: false, message: ex });
        }

    }

}

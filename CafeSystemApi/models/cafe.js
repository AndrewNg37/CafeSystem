var mongoose = require('mongoose');
var db = require('../database');
const { ObjectId } = require('bson');

var cafeSchema = new mongoose.Schema({
    id: ObjectId,
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    employees: {
        type: Number,
        default: 0,
        required: false
    },
    logo: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: true
    }

}, { collection: 'cafe' });

cafeTable = mongoose.model('cafe', cafeSchema);

module.exports = {
    fetchData: (callback) => {
        var cafeData = cafeTable.find({});
        cafeData.exec(function (err, data) {
            if (!err) {
                return callback({ data: data, error: false, message: "" });
            } else {
                return callback({ data: [], error: true, message: "Error on adding cafe!" });
            }
        })
    },
    fetchOne: (data, callback) => {
        var cafeData = cafeTable.findOne({ _id: data.id });
        cafeData.exec(function (err, data) {
            if (!err) {
                return callback({ data: data, error: false, message: "" });
            } else {
                return callback({ data: [], error: true, message: "Error on adding cafe!" });
            }
        })
    },
    addData: (data, callback) => {
        var newCafe = new cafeTable(JSON.parse(data));
        try {
            newCafe.save(function (err, book) {
                if (err) {
                    return callback({ error: true, message: "Error on adding cafe!" });
                } else {
                    return callback({ error: false, message: "" });
                }
            });
        } catch (ex) {
            return callback({ error: false, message: ex });
        }
    },
    updateData: (data, callback) => {
        try {
            var updatedData = JSON.parse(data);

            if (updatedData.id && updatedData.id.match(/^[0-9a-fA-F]{24}$/)) {
                const filter = { _id: updatedData.id };
                const update = updatedData;
                var cafeData = cafeTable.findOneAndUpdate(filter, update, { new: true });

                cafeData.exec(function (err, data) {
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
    updateEmployees: (data, callback) => {
        try {
            if (data.cafe) {
                var getCafeEmployees = cafeTable.findOne({ name: data.cafe });
                getCafeEmployees.exec(function (err, cafe) {
                    if (!err) {
                        const filter = { name: cafe.name };
                        var update;
                        if (data.increase) {
                            update = parseInt(cafe.employees) + 1;
                        } else {
                            update = parseInt(cafe.employees) - 1;
                        }

                        var cafeData = cafeTable.findOneAndUpdate(filter, { employees: update });

                        cafeData.exec(function (err, data) {
                            if (!err) {
                                return callback({ error: false, message: "" });
                            } else {
                                return callback({ error: true, message: "Error on updating number of employees!" });
                            }
                        })
                    } else {
                        return callback({ error: true, message: "Error on updating number of employees!" });
                    }
                })
            }else{
                return callback({ error: false, message: "No employee can be update" });
            }

        } catch (ex) {
            return callback({ error: false, message: ex });
        }
    },
    deleteData: (id, callback) => {
        try {
            if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
                var cafeData = cafeTable.findByIdAndRemove(id);
                cafeData.exec(function (err, data) {
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

    }
}

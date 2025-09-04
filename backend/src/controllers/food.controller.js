const foodModel = require('../models/food.model');

async function createFood(req, res){
    res.send("Create food endpoint");
}

module.exports = {
    createFood
};

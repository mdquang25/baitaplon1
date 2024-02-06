module.exports = {
    multiMongooseToObjs: function (mongooseArray) {
        return mongooseArray.map((mongoose) => mongoose.toObject());
    },
    mongooseToObj: function (mongooseArray) {
        return mongooseArray.map((mongoose) => mongoose.toObject())[0];
    },
};

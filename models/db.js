const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_LINK, {
    useNewUrlParser: true
});

require("./user.model");
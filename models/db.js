const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://fotios:82CYntUJE5R2zy0L@cluster0.6wwqpfc.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true
});

require("./user.model");
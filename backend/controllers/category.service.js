const CategoryModel = require("../models/category.schema");

exports.createCategory = (req, res) => {
    const name = req.body.name;
    console.log(req.body);
    const newCategory = new CategoryModel({ name });
    newCategory
        .save()
        .then((doc) => res.json(doc))
        .catch((err) => res.status(500).json({ err }));
};

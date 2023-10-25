const router = require("express").Router();
const productCategory = require("../model/productCategorySchema");

// Add Category
router.post("/categories", async (req, res) => {
    try{
    const addCategory = new productCategory({
        name: req.body.name,
    });

    var data = await addCategory.save();
    res.status(200).send("Category added successfully");
    }
    catch(err) {
        res.status(400).json(err);
    }
});

// get a specific category
router.get("/categories/:id", async (req, res) => {
    try{
    const data = await productCategory.findById(req.params.id);
    res.json(data);
    }
    catch(err){
        res.status(400).json(err);
    }
});


// get all product categories
router.get("/categories", async (req, res) => {
    var mysort = { _id: -1 };
    const data = await productCategory.find().sort(mysort)
    .then(data => {
        res.json(data);
    })
    .catch(err =>{
        res.status(400).json(err);
    });
});

// Update category
router.put("/categories/:id", async(req, res) => {
    productCategory.findByIdAndUpdate(req.params.id, {
            name : req.body.name
        }, {new: true})
    .then(data => {
        res.status(200).send("Category updated successfully!");
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

// delete category

router.delete("/categories/:id", async (req, res) => {
    productCategory.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.id
            });
        }
        res.send({message: "Category deleted successfully!"});
    })
    .catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Category with id " + req.params.noteId
        });
    })
});

module.exports = router;
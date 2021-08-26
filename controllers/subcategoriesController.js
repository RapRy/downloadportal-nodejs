const CategoryModel = require("../models/categoryModel.js");

const getSubcategoriesByCat = async (req, res) => {
  try {
    const cat = req.params.cat;
    const subcategories = await CategoryModel.findOne(
      {
        active: 1,
        catName: cat,
      },
      { subCategories: 1, _id: 0 }
    );

    res.status(200).json({ subcategories: subcategories.subCategories });
  } catch (error) {
    res.status(500).json({
      message:
        "Application rejected: Something ent wrong, try sending form again",
    });
  }
};

const getSubcategories = async (req, res) => {
  try {
    const { group } = req.query;

    if (group !== undefined) {
      if (group === "main") {
        const subcategories = await CategoryModel.aggregate([
          { $unwind: "$subCategories" },
          {
            $group: {
              _id: { id: "$_id", catName: "$catName" },
              subcats: { $push: "$subCategories" },
            },
          },
          {
            $group: {
              _id: null,
              result: {
                $push: {
                  k: "$_id.catName",
                  v: "$subcats",
                },
              },
            },
          },
          {
            $replaceRoot: {
              newRoot: {
                $arrayToObject: "$result",
              },
            },
          },
        ]);

        res.status(200).json({ subcategories: { ...subcategories[0] } });
        return;
      }
    }

    const subcategories = await CategoryModel.aggregate([
      { $unwind: "$subCategories" },
      {
        $group: {
          _id: null,
          subcats: {
            $push: {
              _id: "$subCategories._id",
              parent_id: "$subCategories.parent_id",
              subCatName: "$subCategories.subCatName",
              catName: "$subCategories.catName",
              active: "$subCategories.active",
            },
          },
        },
      },
      { $project: { _id: 0, subcats: 1 } },
    ]);

    res.status(200).json({ subcategories: subcategories[0].subcats });
  } catch (error) {
    res.status(500).json({
      message:
        "Application rejected: Something ent wrong, try sending form again",
    });
  }
};

module.exports = {
  getSubcategoriesByCat,
  getSubcategories,
};

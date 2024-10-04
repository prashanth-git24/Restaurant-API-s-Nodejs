const categorymodel = require("../models/categorymodel");
const createcontroller=async(req,res)=>{
try {
    const {title,imageUrl}=req.body;
    if(!title){
        return res.status(400).send({
            success:false,
            message:'please provide the title'
        });
    }
    const newcategory = new categorymodel({title,imageUrl});
    await newcategory.save();
    res.status(201).send({
        sucess:true,
        message:"Category Created",
        newcategory
    });
} catch (error) {
    res.status(500).send({
        success:false,
        message:'error in Create Category API',
        error
    });
}
};
// GET ALL CAT
const getAllCatController = async (req, res) => {
    try {
      const categories = await categorymodel.find({});
      if (!categories) {
        return res.status(404).send({
          success: false,
          message: "No Categories found",
        });
      }
      res.status(200).send({
        success: true,
        totalCat: categories.length,
        categories,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in get All Categpry API",
        error,
      });
    }
  };
  
  // UPDATE CATE
  const updateCatController = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, imageUrl } = req.body;
      const updatedCategory = await categorymodel.findByIdAndUpdate(
        id,
        { title, imageUrl },
        { new: true }
      );
      if (!updatedCategory) {
        return res.status(400).send({
          success: false,
          message: "No Category Found",
        });
      }
      res.status(200).send({
        success: true,
        message: "Category Updated Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error in update cat api",
        error,
      });
    }
  };
  
  // DLEETE CAT
  const deleteCatController = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(500).send({
          success: false,
          message: "Please provide Category ID",
        });
      }
      const category = await categorymodel.findById(id);
      if (!category) {
        return res.status(400).send({
          success: false,
          message: "No Category Found With this id",
        });
      }
      await categorymodel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "category Deleted succssfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error in Dlete Cat APi",
        error,
      });
    }
  };
  
  module.exports = {
    createcontroller,
    getAllCatController,
    updateCatController,
    deleteCatController,
  };
const resturantModel = require("../models/restaurantmodel");
const createrestaurantcontroller = async(req,res) =>{
try {
    const {
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,
      } = req.body;
      if (!title) {
        return res.status(400).send({
          success: false,
          message: "please provide title",
        });
      }
      const newResturant = new resturantModel({
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,
      });
      await newResturant.save();
      res.status(201).send({
        success: true,
        message: "New Resturant Created successfully",
      });

} catch (error) {
    res.status(500).send({
        success:false,
        message:"Error in Create Restaurant Api",
        error
    })
}
};

const getallrestaurants= async(req,res) =>{
try {
    const restaurants = await resturantModel.find({});
    if(!restaurants){
        return  res.status(404).send({
            success:false,
            message:"No Restaurants Available",
        });
    }
    res.status(200).send({
        success:true,
        totalcount:restaurants.length,
        restaurants
    });

} catch (error) {
    res.status(500).send({
        success:false,
        message:"Error in Get All Restaurant Api",
        error
    })
}
};
const getbytitle = async(req,res)=>{
try {
    const title = req.params.title;
    const restaurant= await resturantModel.findOne({title:title});
    if(!restaurant){
       return res.status(400).send({
            success:false,
            message:"Restaurant Not Available",
        
        });
    }
    res.status(200).send({
        success:true,
        restaurant
    });

} catch (error) {
    res.status(500).send({
        success:false,
        message:"Error in Get Restaurant Api",
        error
    })
}
};
const deletebytitle = async(req,res)=>{
    try {
        const title = req.params.title;
        const restaurant= await resturantModel.findOneAndDelete({title:title});
        if(!restaurant){
           return res.status(400).send({
                success:false,
                message:"Restaurant Not Available",
            
            });
        }
        res.status(200).send({
            success:true,
            message:"Restaurant Deleted Successfully",
        });
    
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in Delete Restaurant Api",
            error
        })
    }
    };

module.exports = {createrestaurantcontroller,getallrestaurants,getbytitle,deletebytitle};
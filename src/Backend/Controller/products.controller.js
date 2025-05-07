import products, {cartItems} from "../Model/products.model.js"

//fetching all the datas from the api 
export const allProducts = (req, res) => {
  products.find().then((data) => {
    if(!data){
        res.status(400).json({message: "Something went wrong while fetching all the data"});
    }

    res.send(data);
  }).catch(err => res.status(500)
  .json({message: "Internal server Error" || console.log(err.message) }));
}


//to diaplay products item by querry

export const querySearch = async (req,res) => {
  const query = req.query.q || "";
  const regex = new RegExp(query, "i") //case insensitive match

  try{
    const product = await products.find({
      $or: [
        {title: regex},
        {description: regex},
        {brand: regex},
        {category: regex},
      ]
  });

  res.json(product);
  }catch(err){
    res.status(500)
    .json({message: "Server Error while searching products"});
  }
}

//to display data by id 

export const productSearchbyid = (req, res) => {
  products.findOne({ _id: req.params.id }).then(data => {
    if(!data){
        return res.status(400)
        .send("Something went wrong");
    }

    res.send(data);
}).catch(err => {
    console.log(err.message);
    res.status(500).json({message: "Internal server error"});
});
}

//show Cart items 

export const showCart = (req, res) => {
  cartItems.find().then((data) => {
    if(!data){
        res.status(400).json({message: "Something went wrong while fetching all the data"});
    }

    res.send(data);
  }).catch(err => res.status(500)
  .json({message: "Internal server Error" || console.log(err.message) }));
}



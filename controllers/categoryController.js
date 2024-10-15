import Category from "../models/category.js";

// Function to create a new category
export function createCategory(req, res) {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  // Check if the user has admin privileges
  if (req.user.type !== "admin") {

    return res.status(403).json({
      message: "Forbidden"
    });
    
  }

  // Create new category from request body
  const newCategory = new Category(req.body);

 // Save the new category to the database
      newCategory.save()
      .then((result) => {
        // Include the result in the response
        res.json({
          message: "Category created successfully!",
          category: result // This should show the created category details (result : result)
        });
      })
      .catch((err) => {
        // Internal Server Error if saving the category fails
        res.status(500).json({
          message: "Category creation failed",
          error: err
        });
      });

      // Log the user details for debugging
      //console.log(req.user)
      
    }

    // Function to delete a category by ID
    export function deleteCategory(req, res) {
      // Check if the user is authenticated
      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized"
        });
      }

      // Check if the user has admin privileges
      if (req.user.type !== "admin") {
        return res.status(403).json({
          message: "Forbidden"
        });
      }

      // Extract the category ID from request parameters
      const name = req.params.name;

      Category.findOneAndDelete({name : name}).then(
        () => {
          res.json({
            message : "categor deleted successfully !"
          })

        }

     ).catch(
      ()=>{
        res.json(
          {
            message : "Category delection failed "
          }
        )
      }
     )



}


/*import Category from "../models/category.js";

export function createCategory(req,res){

    if(req.user==null){
        res.status(401).json({
        message : "Unauthorized"
    })
    return
}
    if(req.user.type!= admin){
    res.status(403).json({
    message :"Forbidden"
    })
    return
    }

    const newCategory = new Category (req.body)
    newCategory .save().then(
        (result)=>{
            res.json({
                message : "Category creted Successfully !",
                result : result 
            })
        }
    ).catch((err) => {
 
        res.json({
          message: "Category creation failed",
          error: err
        });
      });




}




*/


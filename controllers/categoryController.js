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
      res.json({
        message: "Category created successfully!"
      });
    })
    .catch((err) => {
      // Internal Server Error if saving the category fails
      res.status(500).json({
        message: "Category creation failed",
        error: err
      });
    });
}

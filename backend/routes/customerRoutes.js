import express from "express";
import {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomerById
} from "../controllers/customerController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createCustomer); //Calls createCustomer controller to add a new customer to the database
router.get("/", auth, getCustomers); // Calls getCustomers controller to fetch customer list
router.get("/:id", auth, getCustomerById);  //Calls getCustomerById controller to fetch a specific customer
router.put("/:id", auth, updateCustomer);//Calls updateCustomer controller to update customer details
router.delete("/:id", auth, deleteCustomer); //Calls deleteCustomer controller to remove a customer

export default router;

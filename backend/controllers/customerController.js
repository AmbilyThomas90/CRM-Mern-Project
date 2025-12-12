import Customer from "../models/Customer.js";

// Create customer
export const createCustomer = async (req, res) => {
  const customer = await Customer.create({
    ...req.body,
    createdBy: req.user.id
  });

  res.json(customer);
};

// Get ALL customers for logged user
export const getCustomers = async (req, res) => {
  const data = await Customer.find({ createdBy: req.user.id });
  res.json(data);
};

// Get ONE customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }

    // Optional: security check → user must own the customer
    if (customer.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    res.json(customer);
  } catch (error) {
    res.status(400).json({ msg: "Invalid ID format" });
  }
};

// Update customer
export const updateCustomer = async (req, res) => {
  const updated = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({ msg: "updated", updated });
};

// Delete customer
export const deleteCustomer = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};

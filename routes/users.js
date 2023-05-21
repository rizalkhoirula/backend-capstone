var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { users } = require("../models/");

const v = new Validator();

// API GET USERS REQUEST
router.get('/', async (req, res) => {
    const users = await Users.findAll();
    return res.json(users);
});

// API GET BY ID REQUEST
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  Users = await users.findByPk(id);
  return res.json(Users);
});

// API POST USERS REQUEST
router.post("/", async (req, res) => {
  const scheme = {
    username: "string",
    namalengkap: "string",
    kota: "string",
  };
  const validate = v.validate(req.body, scheme);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const Users = await users.create(req.body);

  res.json({ message: "Add User Succesfully" });
});

// API UPDATE USERS REQUEST
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  let Users = await users.findByPk(id);

  if (!Users) {
    return res.json({ message: "User Not Found" });
  }
  const scheme = {
    nama: "string|optional",
    kota: "string|optional",
    description: "string|optional",
  };
  const validate = v.validate(req.body, scheme);

  if (validate.length) {
    return res.status(400).json(validate);
  }
  Users = await users.update(req.body, { where: { id: id } });
  res.json({ message: "User updated successfully" });
  // res.json({message:'Product Ditemukan'});
});

// API DELETE USERS REQUEST
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const Users = await users.findByPk(id);

  if (!Users) {
    return res.json({ message: "User Not Found" });
  }
  await Users.destroy();
  res.json({ message: "User Deleted successfully" });
});

module.exports = router;

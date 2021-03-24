const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Soap = require("./models/Soap");

const app = express();

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

app.post("/soap", async (req, res) => {
  console.log(req.body);
  const { subjective, objective, assesment, plan } = req.body;

  const soap = new Soap({
    subjective,
    objective,
    assesment,
    plan,
  });

  const createdSoap = await soap.save();

  return res.status(200).json({
    soap: {
      _id: createdSoap._id,
      subjective: createdSoap.subjective,
      objective: createdSoap.objective,
      assesment: createdSoap.assesment,
      plan: createdSoap.plan,
    },
    status: "Create",
  });
});

app.get("/soap/:id", async (req, res) => {
  const soap = await Soap.findById(req.params.id);

  return res.status(200).json({
    soap: {
      _id: soap._id,
      subjective: soap.subjective,
      objective: soap.objective,
      assesment: soap.assesment,
      plan: soap.plan,
    },
    status: "Read",
  });
});

app.put("/soap/:id", async (req, res) => {
  const { subjective, objective, assesment, plan } = req.body;

  const soap = await Soap.findByIdAndUpdate(req.params.id, {
    subjective,
    objective,
    assesment,
    plan,
  });

  console.log("update", soap);

  return res.status(200).json({
    soap: {
      _id: soap._id,
      subjective: soap.subjective,
      objective: soap.objective,
      assesment: soap.assesment,
      plan: soap.plan,
    },
    status: "Update",
  });
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});

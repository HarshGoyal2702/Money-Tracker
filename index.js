const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://harshgoyal1331:MoneyTracker@moneylist.xgvzahs.mongodb.net/?retryWrites=true&w=majority&appName=MoneyList",
).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

const userSchema = mongoose.Schema({
  Category: String,
  Amount: Number,
  Info: String,
  Date: Date
});

const User = mongoose.model("User", userSchema);

app.post("/add", async (req, res) => {
  const { category_select, amount_input, info, date_input } = req.body;
  const data = {
    Category: category_select,
    Amount: amount_input,
    Info: info,
    Date: date_input,
  };

  try {
    await User.create(data);
    console.log("Successfully added data");
    res.sendStatus(200); // Send success response
  } catch (error) {
    console.log("Error adding data", error);
    res.sendStatus(500); // Send error response
  }
});

app.get("/", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
  });
  res.redirect("index.html");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Pharmacy Project",
  password: "1234",
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

db.connect();

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Stores");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving data");
  }
});

app.post("/add-store", async (req, res) => {
  const { storeID, storeName, location } = req.body;
  try {
    const query = "INSERT INTO Stores (StoreID, StoreName, Location) VALUES ($1, $2, $3)";
    const values = [storeID, storeName, location];
    await db.query(query, values);
    res.send("Store added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding store");
  }
});

app.post("/add-employee", async (req, res) => {
  const { employeeID, name, username, password, role, storeID, loginTime, logoutTime } = req.body;
  try {
    const query = `INSERT INTO Employees 
      (EmployeeID, Name, Username, Password, Role, StoreID, LoginTime, LogoutTime) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const values = [employeeID, name, username, password, role, storeID, loginTime, logoutTime];
    await db.query(query, values);
    res.send("Employee added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding employee");
  }
});

app.get("/employees", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Employees");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving employees");
  }
});

app.get("/stores", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Stores");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving stores");
  }
});

app.get("/profits", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Profits");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving profits");
  }
});

app.post("/add-stock", async (req, res) => {
  const { productID, name, description, price, stockLevel, storeID } = req.body;
  try {
    const query = `INSERT INTO Products 
      (ProductID, Name, Description, Price, StockLevel, StoreID) 
      VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [productID, name, description, price, stockLevel, storeID];
    await db.query(query, values);
    res.send("Stock added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding stock");
  }
});

app.get("/check-stock/:storeID", async (req, res) => {
  const { storeID } = req.params;
  try {
    const query = "SELECT * FROM Products WHERE StoreID = $1";
    const values = [storeID];
    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving stock");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

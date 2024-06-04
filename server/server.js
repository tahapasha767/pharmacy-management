import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { Console } from "console";
//import moment from "moment";
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
app.delete("/delete/employee", async (req, res) => {
  const {employeeID} = req.body;

  // Input validation (assuming username is an integer)
  

  try {
    // Use a parameterized query to prevent SQL injection
    const result = await db.query(
      `DELETE FROM employees WHERE employeeid = ${employeeID}`,
       // Convert username to integer for safe comparison
    );

    // Handle successful deletion
    if (result.affectedRows === 1) {
      res.status(200).send("Employee deleted successfully.");
    } else {
      res.status(404).send("Employee with the provided username not found.");
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("An error occurred during deletion.");
  }
});



app.post("/add-store", async (req, res) => {
  const { storeID, storeName, location } = req.body;
  try {
    const query = "INSERT INTO stores (storeID, storename, location) VALUES ($1, $2, $3)";
    const values = [storeID, storeName, location];
    await db.query(query, values);
    res.send("Store added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding store");
  }
});

app.post("/add-employee", async (req, res) => {
  const { employeeID, name, username, password, role, storeID } = req.body;
  try {
    const query = `INSERT INTO Employees 
      (EmployeeID, Name, Username, Password, Role, StoreID) 
      VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [employeeID, name, username, password, role, storeID];
    await db.query(query, values);
    res.send("Employee added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding employee");
  }
});
app.post('/login', async (req, res) => {
  // Extract data from the request
  const { username, password } = req.body;

  try {
    const { rows } = await db.query(
      'SELECT employeeid, role FROM employees WHERE username = $1 AND password = $2',
      [username, password]
    );

    // If no matching user is found, return an error
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const { employeeid, role } = rows[0];
    let hours_worked = null;
      await db.query(
        'INSERT INTO logins (employee_id, log_in) VALUES ($1, CURRENT_TIMESTAMP)',
        [employeeid]
      );
    

    res.status(200).json({ employeeid, role, hours_worked, message: 'Login successful.' });
  } catch (error) {
    // Handle errors
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to handle user logout
app.post('/logout', async (req, res) => {
  // Extract data from the request
  const { employee_id } = req.body;

  try {
    const result = await db.query(
      'UPDATE logins SET log_out = CURRENT_TIMESTAMP, hours_worked = CURRENT_TIMESTAMP - log_in WHERE employee_id = $1 AND log_out IS NULL',
      [employee_id]
    );

    // Check if any rows were affected by the update operation
    if (result.rowCount === 0) {
      // If no rows were updated, respond with an error message
      return res.status(404).json({ error: 'No active login session found for the specified employee.' });
    }

    // Send back a success response
    res.status(200).json({ message: 'Logout successful.' });
  } catch (error) {
    // Handle errors
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post("/sales", async (req, res) => {
  const { employeeid, productid, quantitysold } = req.body;
  try {
    // Get the current stock level
    const { rows } = await db.query("SELECT stocklevel FROM products WHERE productid = $1", [productid]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid entries' });
    }
    const stockLevel = rows[0].stocklevel;

    // Check if there is enough stock
    if (stockLevel < quantitysold) {
      return res.status(400).json({ 
        error: `There isn't enough stock to sell, only ${stockLevel} available`, 
        stockAvailable: stockLevel 
      });
    }

    // Record the transaction
    const transactionResult = await db.query(
      "INSERT INTO salestransactions (employeeid, productid, quantitysold, transactiondatetime) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING transactionid",
      [employeeid, productid, quantitysold]
    );
    const tid = transactionResult.rows[0].transactionid;

    // Update the stock level
    await db.query("UPDATE products SET stocklevel = stocklevel - $1 WHERE productid = $2", [quantitysold, productid]);

    // Respond with the transaction ID
    res.json({ message: "Transaction recorded successfully", transactionID: tid });

  } catch (err) {
    console.error(err);
    res.status(500).send("Couldn't add the transaction due to some issues");
  }
});
app.get("/employees", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        employees.*,
        stores.*
      FROM 
        stores
      LEFT JOIN 
        employees ON employees.storeid = stores.storeid
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving employees and stores");
  }
});


app.get("/stores", async (req, res) => {
  try {
    // Query to get the stores, employee count, and manager name
    const query = `
      SELECT 
        s.*,
        COUNT(e.employeeid) AS employee_count,
        MAX(CASE WHEN e.role = 'Manager' THEN e.name ELSE NULL END) AS manager_name
      FROM 
        Stores s
      LEFT JOIN 
        Employees e ON s.storeid = e.storeid
      GROUP BY 
        s.storeid
    `;

    // Execute the query
    const result = await db.query(query);

    // Send the result as JSON
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving stores");
  }
});


app.get("/profit", async (req, res) => {
  const { wageRate } = req.query;
  if (!wageRate) {
    return res.status(400).json({ error: 'Wage rate is required' });
  }

  try {
    const currentMonthStart = moment().startOf('month').format('YYYY-MM-DD');
    const currentMonthEnd = moment().endOf('month').format('YYYY-MM-DD');

    
    const hoursWorkedResult = await db.query(
      "SELECT SUM(hours_worked) as total_hours FROM logins WHERE date_part('month', log_in) = date_part('month', CURRENT_DATE) AND date_part('year', log_in) = date_part('year', CURRENT_DATE)"
    );
    const totalHoursWorked = hoursWorkedResult.rows[0].total_hours || 0;
    const salariesPaid = totalHoursWorked * wageRate;

    // Calculate total sales for the current month 
    const salesResult = await db.query(
      `SELECT SUM(st.quantitysold * p.price) as total_sales
       FROM salestransactions st
       JOIN products p ON st.productid = p.productid
       WHERE date_part('month', st.transactiondatetime) = date_part('month', CURRENT_DATE)
       AND date_part('year', st.transactiondatetime) = date_part('year', CURRENT_DATE)`
    );
    const totalSales = salesResult.rows[0].total_sales || 0;

    // Calculate profit
    const profit = totalSales - salariesPaid;

    res.json({ totalHoursWorked, salariesPaid, totalSales, profit });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error calculating profit' });
  }
});

app.post("/add-stock", async (req, res) => {
  const { productID, name, description, price, stockLevel } = req.body;
  try {
    // Check if the product already exists for the given store
    const checkQuery = `SELECT COUNT(*) AS count FROM Products WHERE ProductID = $1 `;
    const checkValues = [productID];
    const checkResult = await db.query(checkQuery, checkValues);

    if (checkResult.rows[0].count > 0) {
      // If the product exists, update its stock level
      const updateQuery = `UPDATE Products SET StockLevel = StockLevel + $1 WHERE ProductID = $2 `;
      const updateValues = [stockLevel, productID];
      await db.query(updateQuery, updateValues);
    } else {
      // If the product doesn't exist, insert a new row
      const insertQuery = `INSERT INTO Products (ProductID, Name, Description, Price, StockLevel) VALUES ($1, $2, $3, $4, $5)`;
      const insertValues = [productID, name, description, price, stockLevel];
      await db.query(insertQuery, insertValues);
    }

    res.send("Stock added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding stock");
  }
});

app.delete("/stores/:storeid", async (req, res) => {
  const storeid = parseInt(req.params.storeid, 10);

  if (isNaN(storeid)) {
    return res.status(400).send("Invalid store ID");
  }

  try {
    const employeeCountResult = await db.query(
      "SELECT COUNT(*) AS employee_count FROM Employees WHERE storeid = $1",
      [storeid]
    );

    const employeeCount = parseInt(employeeCountResult.rows[0].employee_count, 10);

    if (employeeCount > 0) {
      // If there are employees, return the count
      res.status(400).json({ message: "Store cannot be deleted", employee_count: employeeCount });
    } else {
      // If there are no employees, delete the store
      await db.query("DELETE FROM Stores WHERE storeid = $1", [storeid]);
      res.status(200).send("Store deleted successfully");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting store");
  }
});
app.put("/employees/:id", async (req, res) => {
  const employeeid = req.params.id;
  let { role, storeid } = req.body;


  const updateQuery = `
    UPDATE Employees
    SET 
      role = COALESCE($1, role),
      storeid = COALESCE($2, storeid)
    WHERE employeeid = $3
    RETURNING *;
  `;

  if (role === undefined) role = null;
  if (storeid === undefined) storeid = null;

  try {
    const result = await db.query(updateQuery, [role, storeid, employeeid]);

    if (result.rows.length === 0) {
      res.status(404).send("Employee not found");
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating employee");
  }
});
app.delete("/employees/:id", async (req, res) => {
  const employeeid = req.params.id;

  try {
    // Delete employee
    const deleteResult = await db.query("DELETE FROM Employees WHERE employeeid = $1 RETURNING *", [employeeid]);

    if (deleteResult.rows.length === 0) {
      res.status(404).send("Employee not found");
    } else {
      res.status(200).send("Employee deleted successfully");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting employee");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

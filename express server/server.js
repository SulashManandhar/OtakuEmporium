const PORT = 4600;
const express = require("express");
const fileUpload = require("express-fileupload");
var cors = require("cors");
const mysql2 = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

//SALT and HASHING
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const app = express();

//app use
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mysql connection
const db = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "otaku_db",
});

//UPLOAD ENDPOINT
app.post("/uploads", cors(), (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file upload" });
  }
  const file = req.files.file;
  file.mv(`${__dirname}/otaku-admin/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  }); //path for file upload
});

//welcome screen
const display = `
    <h1>Welcome to express server</h1>
    <hr>
    <span>Server is started...</span>
`;
app.get("/", (req, res) => res.send(display));

//Users
//fetch user data
app.get("/getUsers", (req, res) => {
  const getUsers = "SELECT * FROM users";
  db.query(getUsers, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.send(result);
  });
});

//ban users
app.put("/banUser", (req, res) => {
  const userId = req.body.userId;
  const banValue = req.body.banValue;

  const sqlUpdate = `UPDATE users SET ban = ? WHERE id = ?;`;
  db.query(sqlUpdate, [banValue, userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

//delete users
app.delete("/deleteUser/:userId", (req, res) => {
  const userId = req.params.userId;
  //res.send(userId);
  const sqlDelete = `DELETE FROM users WHERE id = ?;`;
  db.query(sqlDelete, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

//Apparels
//getApparels
app.get("/getApparels", (req, res) => {
  const getApparels = "SELECT * FROM apparels";
  db.query(getApparels, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.send(result);
  });
});

//addApparels
app.post("/addApparels", (req, res) => {
  const name = req.body.name;
  const category = req.body.category;
  const description = req.body.description;
  const color = req.body.color;
  const smallSize = req.body.smallSize;
  const mediumSize = req.body.mediumSize;
  const largeSize = req.body.largeSize;
  const price = req.body.price;
  const imagePath = req.body.imagePath;

  const addApparels = `INSERT INTO apparels (
        name,
        category,
        description,
        color,
        small_size,
        medium_size,
        large_size,
        price,
        imagePath
        ) VALUE (?,?,?,?,?,?, ?,?,?);`;
  db.query(
    addApparels,
    [
      name,
      category,
      description,
      color,
      smallSize,
      mediumSize,
      largeSize,
      price,
      imagePath,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send(result);
    }
  );
});

//edit apparels
app.put("/editApparels", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const category = req.body.category;
  const description = req.body.description;
  const color = req.body.color;
  const smallSize = req.body.smallSize;
  const mediumSize = req.body.mediumSize;
  const largeSize = req.body.largeSize;
  const price = req.body.price;
  const imagePath = req.body.imagePath;

  const updateApparel = `Update apparels SET 
    name = ?,
    category = ?,
    description = ?,
    color = ?,
    small_size = ?,
    medium_size = ?,
    large_size = ?,
    price = ?,
    imagePath = ?
    WHERE
        id = ?;`;

  db.query(
    updateApparel,
    [
      name,
      category,
      description,
      color,
      smallSize,
      mediumSize,
      largeSize,
      price,
      imagePath,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send(result);
    }
  );
});

//deleteApparels
app.delete("/deleteApparels/:apparelId", (req, res) => {
  const apparelId = req.params.apparelId;
  //res.send(apparelId);
  const sqlDelete = `DELETE FROM apparels WHERE id = ?;`;
  db.query(sqlDelete, [apparelId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

//Accessories
//getAccessories
app.get("/getAccessories", (req, res) => {
  const getAccessories = "SELECT * FROM accessories";
  db.query(getAccessories, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.send(result);
  });
});

//add accessories
app.post("/addAccessoires", (req, res) => {
  const name = req.body.name;
  const category = req.body.category;
  const description = req.body.description;
  const color = req.body.color;
  const price = req.body.price;
  const imagePath = req.body.imagePath;

  const addApparels = `INSERT INTO accessories (
        name,
        category,
        description,
        color,
        price,
        imagePath
        )
        VALUE (?,?,?,?,?,?);`;
  db.query(
    addApparels,
    [name, category, description, color, price, imagePath],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send(result);
    }
  );
});

//editaccessories (editAccessories)
app.put("/editAccessories", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const category = req.body.category;
  const description = req.body.description;
  const color = req.body.color;
  const price = req.body.price;
  const imagePath = req.body.imagePath;

  const updateAccessories = `Update accessories SET 
    name = ?,
    category = ?,
    description = ?,
    color = ?,
    price = ?,
    imagePath = ?
    WHERE
        id = ?;`;

  db.query(
    updateAccessories,
    [name, category, description, color, price, imagePath, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send(result);
    }
  );
});

//deleteAccessories
app.delete("/deleteAccessories/:accessorieId", (req, res) => {
  const accessorieId = req.params.accessorieId;
  const sqlDelete = `DELETE FROM accessories WHERE id = ?;`;
  db.query(sqlDelete, [accessorieId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

//drinkware
//getDrinkware
app.get("/getDrinkware", (req, res) => {
  const getDrinkware = "SELECT * FROM drinkware";
  db.query(getDrinkware, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.send(result);
  });
});

//addDrinkware
app.post("/addDrinkware", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const color = req.body.color;
  const price = req.body.price;
  const imagePath = req.body.imagePath;

  const addDrinkware = `INSERT INTO drinkware (
        name,
        description,
        color,
        price,
        imagePath
        )
        VALUE (?,?,?,?,?);`;
  db.query(
    addDrinkware,
    [name, description, color, price, imagePath],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send(result);
    }
  );
});

//editDrinkware
app.put("/updateDrinkware", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const color = req.body.color;
  const price = req.body.price;
  const imagePath = req.body.imagePath;

  const updateDrinkware = `Update drinkware SET 
    name = ?,
    description = ?,
    color = ?,
    price = ?,
    imagePath = ?
    WHERE
        id = ?;`;

  db.query(
    updateDrinkware,
    [name, description, color, price, imagePath, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send(result);
    }
  );
});

//deleteDrinkware
app.delete("/deleteDrinkware/:drinkwareId", (req, res) => {
  const drinkwareId = req.params.drinkwareId;
  const sqlDelete = `DELETE FROM drinkware WHERE id = ?;`;
  db.query(sqlDelete, [drinkwareId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

// HOME PAGE REQUEST LINK

//hero slider
app.get("/getSlider", (req, res) => {
  const getSilder = "SELECT * FROM slide_show";
  db.query(getSilder, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.send(result);
    // console.log(result);
  });
});
app.delete("/deleteSlider/:slideId", (req, res) => {
  const slideId = req.params.slideId;
  const sqlDelete = `DELETE FROM slide_show WHERE id = ?;`;
  db.query(sqlDelete, [slideId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});
app.post("/addSlider", (req, res) => {
  const title = req.body.title;
  const imagePath = req.body.imagePath;

  const addSlider = `INSERT INTO slide_show(
    title,
    imagePath
    ) VALUE 
    (?, ?);`;
  db.query(addSlider, [title, imagePath], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

//nav_links
app.get("/getNavLinks", (req, res) => {
  const getNavLinks = "SELECT * FROM nav_links";
  db.query(getNavLinks, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.send(result);
    //console.log(result);
  });
});

app.delete("/deleteNavLink/:navId", (req, res) => {
  const navId = req.params.navId;
  const sqlDelete = `DELETE FROM nav_links WHERE id = ?;`;
  db.query(sqlDelete, [navId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

app.post("/addLink", (req, res) => {
  const tab_name = req.body.tab_name;
  const tab_link = req.body.tab_link;

  const addLink = `INSERT INTO nav_links(
    tab_name,
    tab_link
    ) VALUE 
    (?, ?);`;
  db.query(addLink, [tab_name, tab_link], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

//listening express at port 4600
app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));

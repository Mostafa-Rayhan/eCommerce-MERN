const express = require("express");
const cors = require("cors");
const SSLCommerzPayment = require("sslcommerz-lts");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
// require("dotenv").config();
const multer = require("multer");
const app = express();
const path = require('path')
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
// app.use('/', express.static('uploads'));
// app.use('/product', express.static('uploads'));
app.use('/uploads', express.static('uploads')); 

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    // Generate a unique name for the file
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);

    // Get the file extension
    const ext = path.extname(file.originalname);

    // Create the final filename with the extension
    const filename = uniqueName + ext;
    const relativePath = 'uploads/' + filename;

    // console.log("relativ", relativePath);

    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

const uri =
  "mongodb+srv://asadm2258:nKpOoN6ngBfykn4e@cluster0.pthnrho.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const paymentUrl = "http://localhost:5000";

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false;

async function run() {
  try {
    // await client.connect();
    const db = client.db("med-tech");
    const productCollection = db.collection("product");
    const catCollection = db.collection("category");
    const brandCollection = db.collection("brand");
    const memberCollection = db.collection("member");
    const orderCollection = db.collection("order");
    // const reqCollection =  db.collection("req");


    // product

    // app.post("/product", async (req, res) => {
    //   const body = req.body;
    //   console.log("b", body);
    //   const newBlog = await productCollection.insertOne(body);
    //   res.send(newBlog);
    // });


    app.post("/product", upload.fields([
      { name: 'thumb', maxCount: 1 },
      { name: 'files', maxCount: 5 },
    ]) , async (req, res) => {
      // const files = req.files;


      const {
        owner,owner_name,sold,quantity,description,discounted,price,category,brand,product_name,
      } = req.body;

      // if (!files) {
      //   return res.status(400).json({ message: "Missing required files" });
      // }


      const thumb = req.files['thumb'] ? req.files['thumb'][0] : null;
      const multipleFiles = req.files['files'] || [];

      // Process the singleFile and multipleFiles as needed
      const singleFilePath = thumb ? 'uploads/' + thumb.filename : null;
      const multipleFilePaths = multipleFiles.map(file => 'uploads/' + file.filename);


      const newProduct = {
        owner,owner_name,sold,quantity,description,discounted,price,category,brand,product_name,
        files:multipleFilePaths,
        image:singleFilePath
      };

      const newBlog = await productCollection.insertOne(newProduct);
      res.send(newBlog);
    });


    // orders

    app.get("/order", async (req, res) => {
      const result = await orderCollection.find({}).toArray();
      res.send(result);
    });
    app.get("/order/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await orderCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/order/owner/:email", async (req, res) => {
      const email = req.params.email;
      const query = { owner: email };
      const result = await orderCollection.find(query).toArray();
      res.send(result);
    });

    app.patch("/order/:id", async (req, res) => {
      const body = req.body;
      const id = req.params.id;
      console.log("b", body);
      const query = { _id: new ObjectId(id) };
      const updatedData = {
        $set: body,
      };
      const newBlog = await orderCollection.updateOne(query, updatedData);
      res.send(newBlog);
    });

    app.delete("/order/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.send(result);
    });

    // payment

    app.post("/order", async (req, res) => {
      const body = req.body;
      const unId = new ObjectId().toString();
      // console.log("body", body);
      // console.log("un id", unId);
      const data = {
        total_amount: body.total_price,
        currency: "BDT",
        tran_id: unId, // use unique tran_id for each api call
        success_url: `${paymentUrl}/payment/success/${unId}`,
        // fail_url: 'http://localhost:3030/fail',
        // cancel_url: 'http://localhost:3030/cancel',
        ipn_url: "http://localhost:3030/ipn",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: "Customer Name",
        cus_email: "customer@example.com",
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };

      const newBlog = await orderCollection.insertOne({
        ...body,
        status: "not delivered",
      });

      const bp = body.items;
      // console.log("bough", bp);
      // const query2 = { _id: new ObjectId(bp[0]._id) };
      // const existP = await productCollection.findOne(query2);
      // console.log("exis", existP) ;

      bp.forEach(async (p) => {
        const query3 = { _id: new ObjectId(p._id) };
        const existP = await productCollection.findOne(query3);
        console.log("got p", existP);
        const newBody = {
          quantity: Number(existP.quantity) - Number(p.buyingQuantity),
          sold: Number(existP.sold) + Number(p.buyingQuantity),
        };
        const updatedData = {
          $set: newBody,
        };
        const updateP = productCollection.updateOne(query3, updatedData);
        console.log("up", updatedData);
        console.log("uping", updateP);
      });

      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      sslcz.init(data).then((apiResponse) => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;

        res.send({ url: GatewayPageURL });
        console.log("Redirecting to: ", GatewayPageURL);
      });
    });
    app.post("/payment/success/:unId", async (req, res) => {
      const id = req.params.unId;
      console.log("id", id);

      // res.send(newBlog);
      res.redirect(`http://localhost:3000/success/${id}`);
    });

    // member

    app.get("/member", async (req, res) => {
      const result = await memberCollection.find({}).toArray();
      res.send(result);
    });

    app.post("/member", async (req, res) => {
      const body = req.body;
      console.log("b", body);
      const newBlog = await memberCollection.insertOne(body);
      res.send(newBlog);
    });

    // category and brand

    app.get("/category", async (req, res) => {
      const result = await catCollection.find({}).toArray();
      res.send(result);
    });

    app.post("/category", async (req, res) => {
      const body = req.body;
      console.log("b", body);
      const newBlog = await catCollection.insertOne(body);
      res.send(newBlog);
    });
    app.get("/brand", async (req, res) => {
      const result = await brandCollection.find({}).toArray();
      res.send(result);
    });

    app.post("/brand", async (req, res) => {
      const body = req.body;
      console.log("b", body);
      const newBlog = await brandCollection.insertOne(body);
      res.send(newBlog);
    });

    // product

    app.get("/product", async (req, res) => {
      const result = await productCollection.find({}).toArray();
      res.send(result);
    });
    app.get("/product/:email", async (req, res) => {
      const email = req.params.email;
      const result = await productCollection.find({ owner: email }).toArray();
      res.send(result);
    });
    app.get("/product/single/:id", async (req, res) => {
      console.log("id calling product");
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.send(result);
    });

    // app.post("/product", async (req, res) => {
    //   const body = req.body;
    //   console.log("b", body);
    //   const newBlog = await productCollection.insertOne(body);
    //   res.send(newBlog);
    // });

    app.put("/product/:id", async (req, res) => {
      const body = req.body;
      const id = req.params.id;
      console.log("b", body);
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedData = {
        $set: body,
      };
      const newBlog = await productCollection.updateOne(
        query,
        updatedData,
        options
      );
      res.send(newBlog);
    });
    app.put("/product/rating/:id", async (req, res) => {
      const body = req.body;
      const id = req.params.id;
      console.log("b", body);
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const getMem = await productCollection.findOne(query);
      console.log("getmem", getMem);

      if (!Array.isArray(getMem.reviews)) {
        getMem.reviews = []; // Initialize reviews as an empty array if it's not already an array
      }

      const updatedData = {
        $set: {
          reviews: [...getMem?.reviews, body],
        },
      };

      const newBlog = await productCollection.updateOne(
        query,
        updatedData,
        options
      );
      res.send(newBlog);
    });

    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      console.log("b", id);
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });

    // end of product

    app.get("/req/:email", async (req, res) => {
      // const id = req.params.id;
      const email = req.params.email;
      // const query = { user_id: id};
      const query = { reciever_email: email };
      console.log(email);
      // console.log("id", id);
      const result = await reqCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/donate", async (req, res) => {
      const result = await donatesCollection.find({}).toArray();
      res.send(result);
    });
    app.post("/donate", async (req, res) => {
      const body = req.body;
      console.log("b", body);
      const newBlog = await donatesCollection.insertOne(body);
      res.send(newBlog);
      // console.log(newBlog);
    });

    app.get("/donate/:email", async (req, res) => {
      // const id = req.params.id;
      const email = req.params.email;
      // const query = { user_id: id};
      const query = { email: email };
      console.log(email);
      // console.log("id", id);
      const result = await donatesCollection.find(query).toArray();
      res.send(result);
    });

    // appointments

    app.get("/appointment-request/:id", async (req, res) => {
      const id = req.params.id;
      const query = { user_id: id };
      console.log("id", id);
      const result = await appointmentCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/appointment-request", async (req, res) => {
      const result = await appointmentCollection.find({}).toArray();
      res.send(result);
    });
    app.post("/appointment-request", async (req, res) => {
      const body = req.body;
      const newBlog = await appointmentCollection.insertOne(body);
      res.send(newBlog);
      // console.log(newBlog);
    });

    app.patch("/appointment-request/:id", async (req, res) => {
      const body = req.body;
      // console.log("body", body);
      const id = req.params.id;
      console.log("id", id);
      const query = { _id: new ObjectId(id) };
      const updatedData = {
        $set: body,
      };
      const newBlog = await appointmentCollection.updateOne(query, updatedData);
      res.send(newBlog);
      // console.log(newBlog);
    });

    // member
    app.get("/member", async (req, res) => {
      // const body = req.body;
      // console.log("body", body);
      const newBlog = await memberCollection.find({}).toArray();
      res.send(newBlog);
      // console.log(newBlog);
    });
    app.get("/member/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const newBlog = await memberCollection.find(query);
      res.send(newBlog);
    });

    app.post("/member", async (req, res) => {
      const body = req.body;
      const newBlog = await memberCollection.insertOne(body);
      res.send(newBlog);
      // console.log(newBlog);
    });

    app.patch("/member/:id", async (req, res) => {
      const body = req.body;
      // console.log("body", body);
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updatedData = {
        $set: body,
      };
      const newBlog = await memberCollection.updateOne(query, updatedData);
      res.send(newBlog);
      // console.log(newBlog);
    });
    app.put("/member/rating/:id", async (req, res) => {
      const body = req.body;
      // console.log("body", body);
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const getMem = await memberCollection.findOne(query);
      console.log("getmem", getMem);

      if (!Array.isArray(getMem.reviews)) {
        getMem.reviews = []; // Initialize reviews as an empty array if it's not already an array
      }

      const updatedData = {
        $set: {
          reviews: [...getMem?.reviews, body],
        },
      };

      const result = await memberCollection.updateOne(
        query,
        updatedData,
        options
      );
      res.send(result);
      // console.log(newBlog);
    });




    await client.db("admin").command({ ping: 1 });
    console.log("successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("toy server is Running");
});

app.listen(port, () => {
  console.log(`Toy server running on port: ${port}`);
});

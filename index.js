const express = require("express");
const cors = require("cors");
// const jwt = require("jsonwebtoken");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.port || 5000;
app.use(cors());
app.use(express.json());
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${user}:${password}@cluster0.z4h5afx.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const projects = client.db("projects").collection("projects");
    // create a document to insert
    // app.get("/insertproject", async (req, res) => {
    //   const doc = [
    //     {
    //       projectName: "Need Aid -a online donation service for humanity.",
    //       objective: [
    //         "To design a web-based application that helps the Donors and The organization ease their work.",
    //         "Design and integrate an automated system to improve the services.",
    //         "Donor is entirely concerned with knowing more about the service.",
    //         "To donate to individual places or organizations.",
    //         "Run some social projects to help the people.",
    //         "Speeding up the practical procedures.",
    //       ],
    //       systemFeatures: [
    //         "Donor can donate money for specific fund, can see the top donor list and can send a gift message to the top donor so that the top donor have got more inspired. If any top donor is got a gift message, he/she will notify from the system and then he/she can see the gift message.",
    //         "Any user can get sponsorship to advertise their product. When admin accept this sponsorship this advertise is shown somewhere of this system.",
    //         "Any User can buy a lottery ticket for raffle draw and only the admin can draw this raffle . after that the draw result will be published on this system.",
    //       ],
    //       introduction:
    //         "There have many poor people who need help and others who want to help them by giving money. But sometimes this process may be long and complex. Sometimes they can't get enough time to find out the actual helpless people. That’s why most of the time this helping process can't be happening, so we have made a solution for this. We are made a system that will help those who want to donate and who actually need helps.",
    //       toolsAndTechnology: [
    //         "HTML",
    //         "CSS",
    //         "Bootstrap",
    //         "JavaScript",
    //         " React JS",
    //         "NodeJS",
    //         "ExpressJS",
    //         "Mongo DB",
    //         "FireBase",
    //         "JWT",
    //         "vercel",
    //       ],
    //       thumbNail: "https://i.ibb.co/pzHXVDx/image.png",
    //       clientSide:
    //         "https://github.com/KhalidMimMuzahid/need-aid-client-side-react-app",
    //       serverSide:
    //         "https://github.com/KhalidMimMuzahid/need-aid-server-side",
    //       liveSite: "https://need-aid.web.app/",
    //     },

    //     {
    //       projectName: "Used Bike Bazar - A resale website for used bike.",
    //       objective: [
    //         "To design a web-based application that make resale-product business easy and effective",
    //         "To design and integrate an automated system to improve the services.",
    //         "To get a opportunity to chose their product at home",
    //         "To pay their chosen product easily",
    //         "To selling product very quickly and effectively",
    //         "To manage all entire business at the same time as a admin",
    //       ],
    //       systemFeatures: [
    //         "Seller can create a selling post, delete post, can advertise a post and that post will go to the buyers home route and also can see their all buyers ",
    //         "Buyer can see all the advertised unsold posts and can book bikes or report this post to admin, can see the product according to the product category. Can see their order and then can pay for this product.",
    //         "Admin can manage seller and buyer. Can verify seller then verified seller will get the checked mark",
    //       ],
    //       introduction:
    //         "At present, the demand for the resale market in our country is increasing day by day. We often find that most people after buying a product, want to exchange that product after using it for some time, exchange their old product with a new product, so the resale market is a good way. on the other hand, a resale market is also a good option for those who cannot buy new products due to money problems. Because they get the product of their choice at a relatively low price",
    //       toolsAndTechnology: [
    //         "React JS",
    //         "Node JS",
    //         "Express JS",
    //         "Tailwind",
    //         "TanStack Query",
    //         "react hook form",
    //         "Firebase",
    //         "JWT",
    //         "Vercel",
    //         "Mongo DB",
    //       ],
    //       thumbNail: "https://i.ibb.co/QYB0NLQ/image.png",
    //       clientSide:
    //         "https://github.com/KhalidMimMuzahid/used-bike-bazar-client-side-react-app",
    //       serverSide:
    //         "https://github.com/KhalidMimMuzahid/used-bike-bazar-server-side",
    //       liveSite: "https://used-bike-bazar.web.app/",
    //     },

    //     {
    //       projectName: "Pixel Shooter- A Photography service based website.",
    //       objective: [
    //         "To design a web-based solution to manage the photography service",
    //         "To Design and integrate an automated system to improve the services.",
    //         "To know about the specific service that is provided by the photographer",
    //         "To have a opportunity to get review for each service",
    //         "To pre-book the specific service",
    //       ],
    //       systemFeatures: [
    //         "user can know about the specific service",
    //         "user can review the specific service according to service quality, for some reason then can delete and update their review",
    //         "photographer can add their services with details",
    //       ],
    //       introduction:
    //         "Pixel Shooter is a web based application for photographers and their clients. All clients and photographers can connect with each other through this application. Client can book specific service and review service wise. And the photographer can update their services according to the client's reviews. Photographers can add a new service. And there are more opportunities to manage photography marketing using this system.",
    //       toolsAndTechnology: [
    //         "React JS",
    //         "Node JS",
    //         "Express JS",
    //         "Tailwind",
    //         "Firebase",
    //         "Mongo DB",
    //       ],
    //       thumbNail: "https://i.ibb.co/8MR0FLk/image.png",
    //       clientSide:
    //         "https://github.com/KhalidMimMuzahid/pixel-shooter-client-side-react-app",
    //       serverSide:
    //         "https://github.com/KhalidMimMuzahid/-pixel-shooter-server-side",
    //       liveSite: "https://pixel-shooter-3d676.web.app/",
    //     },
    //   ];
    //   const result = await projects.insertMany(doc);
    //   console.log(result);
    //   res.send(result);
    // });
    app.get("/projects", async (req, res) => {
      const query = {};
      const options = {};
      const result = await projects.find(query, options).toArray();
      res.send(result);
    });
    app.get("/projects/details", async (req, res) => {
      const _id = req.query._id;
      const query = { _id: ObjectId(_id) };

      const result = await projects.findOne(query);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/test", (req, res) => {
  res.send({ message: "okk boss" });
});
app.listen(port, () => {
  console.log("listening on port", port);
});

import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.SERVER_PORT || 8080;

app.get("/", (req, res) => {
  return res.redirect("/users");
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use("/auth", router.users);
app.use("/programs", router.programs);

// app.get('/test-db', async (req, res) => {
//   try {
//     const users = await prisma.user.findMany({ take: 1 });
//     res.json({ message: 'Database is connected', users });
//   } catch (error) {
//     console.error('Database connection error:', error);
//     res.status(500).json({ message: 'Database connection failed', error: error.message });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

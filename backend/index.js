import express from "express";

const app = express();

import router from "./router.js";

router(app);

app.listen(3000);
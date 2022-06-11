import { homepage, findByName, verifiedUsers } from "./controller.js";

const router = (app) => {
  app.get("/", homepage);
  app.get("/find-by-name", findByName);
  app.get("/find-verified-users", verifiedUsers);
};

export default router;
import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import MeetupController from "./app/controllers/MeetupController";
import SubscriptionController from "./app/controllers/SubscriptionController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/signup", UserController.store);

routes.post("/signin", SessionController.store);

routes.use(authMiddleware);

routes.put("/update", UserController.update);

routes.post("/files", upload.single("file"), FileController.store);

routes.get("/meetups", MeetupController.index);
routes.post("/meetups", MeetupController.store);
routes.put("/meetups/:id", MeetupController.update);
routes.delete("/meetups/:id", MeetupController.delete);

routes.post("/subscription/:id", SubscriptionController.store);
routes.get("/subscriptions", SubscriptionController.index);

export default routes;
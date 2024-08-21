import { Router } from "express";
import { 
  addField,
  listFields
} from "./field.controller.js";
import { addFieldValidator } from "../../middlewares/check-validators.js";
import { uploadFieldImage } from "../../middlewares/multer-uploads.js";

const api = Router();

api.post(
  "/addField",
  uploadFieldImage.single("photo"),
  addFieldValidator,
  addField
);

api.get("/getFields", listFields);


export default api;

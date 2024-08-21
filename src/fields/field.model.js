"use strict";

import { Schema, model} from "mongoose";

const fieldSchema = Schema(
  {
    fieldName: {
      type: String,
    },
    fieldType: {
      type: String,
    },
    capacity: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export default model("Field", fieldSchema);


const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: [
        (val) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val),
      ],
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Require password only if it's not a Google account
      },
      min: 6,
    },
    refresh_token: String,
  },
  {
    virutals: {
      id: {
        get() {
          return this._id;
        },
      },
    },
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("User", UserSchema);

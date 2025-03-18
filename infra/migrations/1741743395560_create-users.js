exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    // For reference, GitHub usernames can have up to 39 characters.
    username: {
      type: "varchar(30)",
      notNull: true,
      unique: true,
    },
    email: {
      type: "varchar(254)",
      notNull: true,
      unique: true,
    },
  });
};

exports.down = false;

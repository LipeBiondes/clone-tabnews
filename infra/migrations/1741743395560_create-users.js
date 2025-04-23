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
    // Why 254? Because it's the maximum length of an email address. See https://stackoverflow.com/a/574698/376773.
    email: {
      type: "varchar(254)",
      notNull: true,
      unique: true,
    },
    // Why 60? Because it's the maximum length of a bcrypt hash. See https://www.npmjs.com/package/bcrypt#hash-info.
    password: {
      type: "varchar(60)",
      notNull: true,
    },
    // Why timestamptz with timezone? Because it stores the date and time in UTC format, which is the best practice for storing dates and times in databases.
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('UTC', now())"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('UTC', now())"),
    },
  });
};

exports.down = false;

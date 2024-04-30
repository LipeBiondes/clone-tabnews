import database from "infra/database";

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

beforeAll(cleanDatabase);

test("POST to /api/v1/migrations shold return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response1.status).toBe(201);

  const response1Body = await response1.json();

  expect(Array.isArray(response1Body)).toBe(true);

  expect(response1Body.length).toBeGreaterThan(0);

  /*  const migrations = await database.query("select * from pgmigrations");
  console.log(migrations.rows);

  const migrationsExecuted = migrations.rows.filter(
    (migration) => migration.name === response1Body[0].name,
  );

  expect(migrationsExecuted.length).toBe(1);
*/

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);

  const response2Body = await response2.json();

  expect(Array.isArray(response2Body)).toBe(true);

  expect(response2Body.length).toBe(0);
});

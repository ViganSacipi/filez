import "dotenv/config";
import db from "#db/client";

async function seed() {
  const folders = ["Work", "Personal", "Projects"];

  for (const folderName of folders) {
    const {
      rows: [folder],
    } = await db.query(
      `INSERT INTO folders(name)
       VALUES ($1)
       RETURNING *`,
      [folderName]
    );

    for (let i = 1; i <= 5; i++) {
      await db.query(
        `INSERT INTO files(name, size, folder_id)
         VALUES ($1, $2, $3)`,
        [`${folderName}_file_${i}`, i * 100, folder.id]
      );
    }
  }
}

// run seed
async function main() {
  try {
    await db.connect();
    await seed();
    console.log("🌱 Database seeded");
  } catch (err) {
    console.error(err);
  } finally {
    await db.end();
  }
}

main();
import * as SQLite from "expo-sqlite";
export const db: SQLite.SQLiteDatabase =
  SQLite.openDatabaseSync("expense_tracker");

export const setupDatabase = () => {
  db.execSync(`CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          amount REAL,
          date TEXT
        );`);
};

export const deleteDatabase = () => {
  db.runSync("DELETE FROM expenses WHERE id = $id", { $id: 1 });
};

export const addColumnInTable = () => {
  db.runSync('UPDATE expenses SET type = "other"');
};

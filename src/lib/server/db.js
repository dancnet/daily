import Database from "better-sqlite3";
export const db = new Database('./data.sqlite3', {fileMustExist: true});
console.log('Database is now open.');
process.on('exit', () => {db.close(); console.log('Database is now closed.')});
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));
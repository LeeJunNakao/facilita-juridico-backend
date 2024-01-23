"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const cli_color_1 = __importDefault(require("cli-color"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const __1 = require("..");
dotenv_1.default.config();
commander_1.program
    .option('-u, --up', 'Run migrations')
    .option('-d, --down', 'Run back migrations')
    .parse(process.argv);
commander_1.program.parse(process.argv);
const getMigrations = (db) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.none(`
    CREATE TABLE IF NOT EXISTS migration (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) UNIQUE
    )`);
    const migrations = yield db.any('SELECT name FROM migration;');
    return migrations;
});
const registerMigration = (db, migration) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.none(`INSERT INTO migration(name) VALUES('${migration}');`);
});
const removeMigration = (db, migration) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.none(`DELETE FROM migration WHERE name = '${migration}';`);
});
const runMigrations = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, __1.initDb)();
    const migrationFiles = fs_1.default.readdirSync(__dirname);
    const sortedMigrationFiles = migrationFiles
        .filter((file) => file !== 'index.ts')
        .sort();
    const migrations = yield getMigrations(db);
    if (options.down) {
        sortedMigrationFiles.reverse();
    }
    try {
        yield db.tx((t) => __awaiter(void 0, void 0, void 0, function* () {
            const promises = sortedMigrationFiles.map((file) => __awaiter(void 0, void 0, void 0, function* () {
                const migrationPath = path_1.default.join(__dirname, file);
                const migrationModule = require(migrationPath);
                const fileAlreadyMigrated = migrations.find(({ name }) => name === file);
                if (options.up) {
                    if (!fileAlreadyMigrated) {
                        yield migrationModule.default(t).up();
                        yield registerMigration(t, file);
                        console.log(cli_color_1.default.greenBright(`MIGRATION: ${file} executed successfully`));
                    }
                }
                else {
                    if (fileAlreadyMigrated) {
                        yield migrationModule.default(t).down();
                        removeMigration(t, file);
                        console.log(cli_color_1.default.redBright(`MIGRATION: ${file} reverted successfully`));
                    }
                }
            }));
            return t.batch(promises);
        }));
    }
    catch (error) {
        console.error('Error executing migrations:', error);
    }
    finally {
        db.$pool.end();
    }
});
runMigrations(commander_1.program.opts());

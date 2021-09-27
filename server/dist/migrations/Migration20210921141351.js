"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20210921141351 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20210921141351 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "display_name" text not null, "username" text not null, "password" text not null, "confirm_password" text not null);');
        this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
        this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');
    }
}
exports.Migration20210921141351 = Migration20210921141351;
//# sourceMappingURL=Migration20210921141351.js.map
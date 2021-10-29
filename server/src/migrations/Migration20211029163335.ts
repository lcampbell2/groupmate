import { Migration } from '@mikro-orm/migrations';

export class Migration20211029163335 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "group" add column "general_meeting" jsonb not null;');

    this.addSql('create table "group_event" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null, "description" text not null, "created_by" jsonb not null, "group_id" int4 not null, "time_stamp" jsonb not null, "location" jsonb not null, "meeting_link" varchar(255) not null);');

    this.addSql('alter table "group_event" add constraint "group_event_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade;');
  }

}

import { Migration } from '@mikro-orm/migrations';

export class Migration20211112145153 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "group" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" text not null, "description" text not null, "slug" text not null, "visibility" text check ("visibility" in (\'open\', \'closed\', \'private\')) not null);');

    this.addSql('create table "group_event" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null, "description" text not null, "group_id" int4 not null, "event_time" timestamptz(0) not null, "location" varchar(255) null, "meeting_link" varchar(255) not null);');

    this.addSql('create table "event_location" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "country" text not null, "region" text not null, "city" text not null, "postal_code" text not null, "address" text not null, "location_name" text not null, "event_id" int4 not null);');

    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "display_name" text not null, "email" text not null, "password" text not null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "group_user" ("id" serial primary key, "user_id" int4 not null, "group_id" int4 not null, "role" text check ("role" in (\'owner\', \'admin\', \'write\', \'read\')) not null);');

    this.addSql('create table "user_invite_requests" ("user_id" int4 not null, "group_id" int4 not null);');
    this.addSql('alter table "user_invite_requests" add constraint "user_invite_requests_pkey" primary key ("user_id", "group_id");');

    this.addSql('create table "group_invite_requests" ("group_id" int4 not null, "user_id" int4 not null);');
    this.addSql('alter table "group_invite_requests" add constraint "group_invite_requests_pkey" primary key ("group_id", "user_id");');

    this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null, "description" text not null, "author_id" int4 not null, "group_id" int4 not null);');

    this.addSql('create table "post_reply" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "message" text not null, "author_id" int4 not null, "post_id" int4 not null);');

    this.addSql('alter table "group_event" add constraint "group_event_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade;');

    this.addSql('alter table "event_location" add constraint "event_location_event_id_foreign" foreign key ("event_id") references "group_event" ("id") on update cascade;');

    this.addSql('alter table "group_user" add constraint "group_user_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "group_user" add constraint "group_user_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade;');

    this.addSql('alter table "user_invite_requests" add constraint "user_invite_requests_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_invite_requests" add constraint "user_invite_requests_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "group_invite_requests" add constraint "group_invite_requests_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "group_invite_requests" add constraint "group_invite_requests_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "post" add constraint "post_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade;');

    this.addSql('alter table "post_reply" add constraint "post_reply_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "post_reply" add constraint "post_reply_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade;');
  }

}

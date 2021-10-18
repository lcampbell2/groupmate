import { Migration } from '@mikro-orm/migrations';

export class Migration20211018125638 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post_reply" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "message" text not null, "author_id" int4 not null, "post_id" int4 not null);');

    this.addSql('alter table "post_reply" add constraint "post_reply_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "post_reply" add constraint "post_reply_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade;');
  }

}

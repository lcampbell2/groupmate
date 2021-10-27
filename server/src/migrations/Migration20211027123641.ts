import { Migration } from '@mikro-orm/migrations';

export class Migration20211027123641 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_invite_requests" ("user_id" int4 not null, "group_id" int4 not null);');
    this.addSql('alter table "user_invite_requests" add constraint "user_invite_requests_pkey" primary key ("user_id", "group_id");');

    this.addSql('create table "group_invite_requests" ("group_id" int4 not null, "user_id" int4 not null);');
    this.addSql('alter table "group_invite_requests" add constraint "group_invite_requests_pkey" primary key ("group_id", "user_id");');

    this.addSql('alter table "user_invite_requests" add constraint "user_invite_requests_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_invite_requests" add constraint "user_invite_requests_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "group_invite_requests" add constraint "group_invite_requests_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "group_invite_requests" add constraint "group_invite_requests_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
  }

}

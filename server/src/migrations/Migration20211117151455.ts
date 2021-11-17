import { Migration } from '@mikro-orm/migrations';

export class Migration20211117151455 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "group_event" rename column "event_time" to "start_time";');


    this.addSql('alter table "group_event" add column "end_time" timestamptz(0) not null;');
  }

}

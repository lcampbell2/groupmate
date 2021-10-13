import { Migration } from '@mikro-orm/migrations';

export class Migration20211013122600 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "group_user" drop column "this_is_a_fake_property";');
  }

}

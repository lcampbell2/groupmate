import { Migration } from '@mikro-orm/migrations';

export class Migration20211013151557 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" rename column "descrpition" to "description";');
  }

}

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class addRecipesSchema1615348000116 implements MigrationInterface {
  private table = new Table({
    name: 'recipes',
    columns: [
      {
        name: 'id',
        type: 'VARCHAR',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'name',
        type: 'VARCHAR',
        length: '40',
        isNullable: false,
      },
      {
        name: 'description',
        type: 'VARCHAR',
        length: '1000',
        isNullable: true,
      },
      {
        name: 'user_id',
        type: 'VARCHAR',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  private foreignKey = new TableForeignKey({
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    referencedTableName: 'users',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log(`UP ${__filename}`);
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey('recipes', this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(`DOWN ${__filename}`);
    await queryRunner.dropTable(this.table);
  }
}

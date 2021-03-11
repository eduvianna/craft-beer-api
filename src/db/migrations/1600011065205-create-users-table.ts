import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createUsersTable1600011065205 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'VARCHAR',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'email',
        type: 'VARCHAR',
        length: '255',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'username',
        type: 'VARCHAR',
        length: '40',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'password',
        type: 'VARCHAR',
        length: '100',
        isNullable: false,
      },
      {
        name: 'avatar_id',
        type: 'VARCHAR',
        isNullable: true,
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
    columnNames: ['avatar_id'],
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    referencedTableName: 'files',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log(`UP ${__filename}`);
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey('users', this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(`DOWN ${__filename}`);
    await queryRunner.dropTable(this.table);
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createFilesTable1600005685692 implements MigrationInterface {
  private table = new Table({
    name: 'files',
    columns: [
      {
        name: 'id',
        type: 'UUID',
        isPrimary: true,
        generationStrategy: 'uuid',
      },
      {
        name: 'name',
        type: 'VARCHAR',
        length: '255',
        isNullable: false,
      },
      {
        name: 'path',
        type: 'VARCHAR',
        length: '800',
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

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log(`UP ${__filename}`);
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(`DOWN ${__filename}`);
    await queryRunner.dropTable(this.table);
  }
}

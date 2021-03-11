import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class addSensorsSchema1612278351759 implements MigrationInterface {
  private table = new Table({
    name: 'sensors',
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
        name: 'type',
        type: 'VARCHAR',
        length: '50',
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

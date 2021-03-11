import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class addMeasurementsSchema1612278800225 implements MigrationInterface {
  private table = new Table({
    name: 'measurements',
    columns: [
      {
        name: 'id',
        type: 'VARCHAR',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'sensor_id',
        type: 'VARCHAR',
        isNullable: false,
      },
      {
        name: 'value',
        type: 'VARCHAR',
        length: '255',
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
    columnNames: ['sensor_id'],
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    referencedTableName: 'sensors',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log(`UP ${__filename}`);
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey('measurements', this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(`DOWN ${__filename}`);
    await queryRunner.dropTable(this.table);
  }
}

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateActivity1625361055384 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'activities',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: "description",
            type: "varchar"
          },
          {
            name: 'category',
            type: 'uuid'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('activities')
  }
}

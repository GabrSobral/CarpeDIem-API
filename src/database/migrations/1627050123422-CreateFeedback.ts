import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFeedback1627050123422 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'feedback',
        columns: [
          {
            name: 'user',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'activity',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'category',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'feedback',
            type: 'boolean'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('feedback');
  }
}

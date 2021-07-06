import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateQuestion1625485282186 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: "questions",
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true
            },
            {
              name: 'body',
              type: 'varchar'
            },
            {
              name: 'category',
              type: 'uuid'
            }
          ],
          foreignKeys: [
            {
              name: 'FKQuestionsCategories',
              columnNames: ['category'],
              referencedTableName: "categories",
              referencedColumnNames: ["id"],
              onDelete: 'cascade',
              onUpdate: 'cascade'
            }
          ]
        }
      )
    )
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('questions')
  }
}

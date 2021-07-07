import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AlterActivityForeignKey1625445635186 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'activities',
      new TableForeignKey({
        name: 'FKActivityCategory',
        columnNames: ["category"],
        referencedColumnNames: ['id'],
        referencedTableName: "categories",
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    )
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('activities', "FKActivityCategory")
  }
}

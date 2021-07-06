import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnswer1625509577124 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "answers",
				columns: [
					{
						name: 'user',
						type: 'uuid',
						isPrimary: true
					},
					{
						name: 'question',
						type: 'uuid',
						isPrimary: true
					},
					{
						name: "category",
						type: "uuid",
						isPrimary: true
					},
					{
						name: "answer",
						type: 'varchar'
					}
				],
				foreignKeys: [
					{
						name: "FKAnswerUser",
						columnNames: ["user"],
						referencedTableName: "users",
						referencedColumnNames: ['id'],
						onDelete: 'cascade',
						onUpdate: 'cascade'
					},
					{
						name: "FKAnswerQuestion",
						columnNames: ["question"],
						referencedTableName: "questions",
						referencedColumnNames: ['id'],
						onDelete: 'cascade',
						onUpdate: 'cascade'
					},
					{
						name: "FKAnswerCategory",
						columnNames: ["category"],
						referencedTableName: "categories",
						referencedColumnNames: ['id'],
						onDelete: 'cascade',
						onUpdate: 'cascade'
					},
				]
			})
		)
	}
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('answers')
	}
}

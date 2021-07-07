import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArchive1625614077348 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "archives",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true
					},
					{
						name: "url",
						type: "varchar",
						isUnique: true
					},
					{
						name: "name",
						type: "varchar"
					},
					{
						name: "description",
						type: "varchar",
						isNullable: true
					},
					{
						name: "author",
						type: "varchar"
					}
				]
			})
		)
	}
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('archives')
	}
}

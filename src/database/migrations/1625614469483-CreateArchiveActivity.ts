import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArchiveActivity1625614469483 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "archives_activities",
				columns: [
					{
						name: 'archive',
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
					}
				],
				foreignKeys: [
					{
						name: 'FK_ARCHIVE-ACTIVITIES_ARCHIVE',
						columnNames: ['archive'],
						referencedColumnNames: ["id"],
						referencedTableName: 'archives'
					},
					{
						name: 'FK_ARCHIVE-ACTIVITIES_ACTIVITY',
						columnNames: ['activity'],
						referencedColumnNames: ["id"],
						referencedTableName: 'activities'
					},
					{
						name: 'FK_ARCHIVEACTIVITIES_CATEGORY',
						columnNames: ['category'],
						referencedColumnNames: ["id"],
						referencedTableName: 'categories'
					}
				]
			})
		)
	}
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('archives_activities')
	}
}

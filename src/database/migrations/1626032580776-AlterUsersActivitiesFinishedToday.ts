import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUsersActivitiesFinishedToday1626032580776 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'users', new TableColumn({
				name: "activities_finished_today",
				type: "int",
				default: 0
			})
		)
		await queryRunner.addColumn(
			'users', new TableColumn({
				name: "all_activities_finished",
				type: "int",
				default: 0
			})
		)
	}
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('users', 'activities_finished_today')
		await queryRunner.dropColumn('users', 'all_activities_finished')
	}
}

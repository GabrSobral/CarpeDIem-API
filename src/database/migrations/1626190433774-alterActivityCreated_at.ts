import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class alterActivityCreatedAt1626190433774 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'activities',
			new TableColumn({
				name: 'created_at',
				type: 'timestamp',
				default: 'now()'
			})
		),
		await queryRunner.addColumn(
			'activities',
			new TableColumn({
				name: 'updated_at',
				type: 'timestamp',
				default: 'now()'
			})
		)
	}
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('archives', 'created_at')
		await queryRunner.dropColumn('archives', 'updated_at')
	}
}

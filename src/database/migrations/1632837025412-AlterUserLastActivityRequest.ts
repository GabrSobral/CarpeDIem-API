import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserLastActivityRequest1632837025412 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'users', 
			new TableColumn({
				name: 'last_activity_request',
				isNullable: true,
				type: 'timestamp'
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('users', 'last_activity_request')
	}
}

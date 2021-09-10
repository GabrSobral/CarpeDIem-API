import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserPasswordToken1631275849665 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'users', 
			new TableColumn({
				name: 'password_reset_token',
				isNullable: true,
				type: 'varchar'
			})
		)
		await queryRunner.addColumn(
			'users', 
			new TableColumn({
				name: 'password_reset_expires',
				isNullable: true,
				type: 'timestamp'
			})
		)
	}
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('users', 'password_reset_token')
		await queryRunner.dropColumn('users', 'password_reset_expires')
	}
}

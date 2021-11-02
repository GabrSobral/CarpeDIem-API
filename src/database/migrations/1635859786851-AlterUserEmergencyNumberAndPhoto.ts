import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserEmergencyNumberAndPhoto1635859786851 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'users', 
			new TableColumn({
				name: 'emergency_number',
				isNullable: true,
				type: 'varchar'
			})
		)
		await queryRunner.addColumn(
			'users', 
			new TableColumn({
				name: 'photo_url',
				isNullable: true,
				type: 'varchar'
			})
		)
	}
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('users', "emergency_number")
		await queryRunner.dropColumn('users', "photo_url")
	}
}

import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUsers1626019890732 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'users', 
			new TableColumn({
				name: "quantity_of_activities",
				type: 'int',
				default: 3,
				isNullable: true
			})
		)
	}
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('users', 'quantity_of_activities')
	}
}
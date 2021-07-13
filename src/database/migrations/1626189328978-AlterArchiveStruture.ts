import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterArchiveStruture1626189328978 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'archives',
			new TableColumn({
				name:"duration",
				type: 'varchar',
				isNullable: true
			})
		)
		await queryRunner.addColumn(
			'archives',
			new TableColumn({
				name:"format",
				type: 'varchar',
				isNullable: true
			})
		)
	}
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('archives', 'duration')
		await queryRunner.dropColumn('archives', 'format')
	}
}

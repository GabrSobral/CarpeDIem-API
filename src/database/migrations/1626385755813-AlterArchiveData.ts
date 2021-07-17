import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterArchiveData1626385755813 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'archives',
			new TableColumn({
				name: "size",
				type: 'int',
				isNullable: true
			})),

		await queryRunner.addColumn(
			'archives',
			new TableColumn({
				name: "created_at",
				type: 'timestamp',
				default: 'now()',
				isNullable: true
			}))

		await queryRunner.dropColumn('archives', 'description')			
		await queryRunner.dropColumn('archives', 'author')			
	}
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('archives', 'size')			
		await queryRunner.dropColumn('archives', 'created_at')			

		await queryRunner.addColumn(
			'archives',
			new TableColumn({
				name: "description",
				type: 'varchar',
			}))
		await queryRunner.addColumn(
			'archives',
			new TableColumn({
				name: "author",
				type: 'varchar',
			}))
	}
}

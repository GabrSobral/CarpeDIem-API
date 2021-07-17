import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterArchivePublicId1626479231624 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('archives', new TableColumn({
			name:"public_id",
			type: "varchar",
			isNullable: true
		}))
	}
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('archives', 'public_id')
	}
}

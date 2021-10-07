import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class CreateRefreshToken1633632505291 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "refresh_token",
			columns: [
				{
					name: "id",
					type: 'uuid',
					isPrimary: true,
				},
				{
					name: "expires_in",
					type: 'int'
				},
				{
					name: "user_id",
					type: 'uuid',
					isPrimary: true
				}
			],
			foreignKeys: [
				{
					name: 'FK_USER_REFRESH_TOKEN',
					columnNames: ['user_id'],
					referencedColumnNames: ["id"],
					referencedTableName: 'users'
				}
			]
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('refresh_token')
	}
}

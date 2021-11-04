import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserPhotoPublicId1635863950154 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
			'users', 
			new TableColumn({
				name: 'photo_public_id',
				isNullable: true,
				type: 'varchar'
			})
		)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', "photo_public_id")
    }

}

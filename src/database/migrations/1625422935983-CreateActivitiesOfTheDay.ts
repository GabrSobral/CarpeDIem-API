import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateActivitiesOfTheDay1625422935983 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "activities_of_the_day",
        columns: [
          {
            name: "activity",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "destined_to",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "date",
            type: "timestamp",
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: "FKActivityActivitiesOfTheDay",
            columnNames: ["activity"],
            referencedTableName: "activities",
            referencedColumnNames: ["id"],
            onDelete: 'cascade',
            onUpdate: 'cascade'
          },
          {
            name: "FKUserDestinedTo",
            columnNames: ["destined_to"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: 'cascade',
            onUpdate: 'cascade'
          }
        ]
			})
		)
	}
	public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('activities_of_the_day')
	}
}

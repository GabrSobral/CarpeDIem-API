import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateActivitiesOfTheDay1625422935983 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "activities_of_the_day",
        columns: [
          {
            name: "activity",
            type: "uuid"
          },
          {
            name: "destined_to",
            type: "uuid"
          },
          {
            name: "date",
            type: "timestamp",
            default: "now()"
          }
        ],
        foreignKeys: [
          {
            name: "FKActivityActivitiesOfTheDay",
            columnNames: ["activity"],
            referencedTableName: "activities",
            referencedColumnNames: ["id"],
          },
          {
            name: "FKUserDestinedTo",
            columnNames: ["destined_to"],
            referencedTableName: "users",
            referencedColumnNames: ["id"]
          }
        ]
			})
		)
	}
	public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('activities_of_the_day')
	}
}

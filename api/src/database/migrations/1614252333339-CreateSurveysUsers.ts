import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSurveysUsers1614252333339 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'surveysUsers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'surveyId',
            type: 'uuid',
          },
          {
            name: 'value',
            type: 'number',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fkuser',
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            columnNames: ['userId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fksurvey',
            referencedTableName: 'surveys',
            referencedColumnNames: ['id'],
            columnNames: ['surveyId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('surveysUser');
  }
}

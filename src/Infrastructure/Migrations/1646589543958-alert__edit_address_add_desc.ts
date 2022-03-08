import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class alert_editAddressAddDesc1646589543958
    implements MigrationInterface
{
    name = 'alert_editAddressAddDesc1646589543958';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'user',
            'addres',
            new TableColumn({
                name: 'address',
                type: 'varchar',
                length: '250',
                isNullable: true,
            }),
        );

        await queryRunner.addColumn(
            'user',
            new TableColumn({
                name: 'desc',
                type: 'text',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'user',
            'address',
            new TableColumn({
                name: 'addres',
                type: 'date',
                isNullable: true,
            }),
        );

        await queryRunner.dropColumn('user', 'desc');
    }
}

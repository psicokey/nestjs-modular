import { MigrationInterface, QueryRunner } from "typeorm";

export class DateColumnProduct1753997632867 implements MigrationInterface {
    name = 'DateColumnProduct1753997632867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`create_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`update_at\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`create_at\``);
    }

}

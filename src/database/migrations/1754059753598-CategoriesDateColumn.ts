import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoriesDateColumn1754059753598 implements MigrationInterface {
    name = 'CategoriesDateColumn1754059753598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`create_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`update_at\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`create_at\``);
    }

}

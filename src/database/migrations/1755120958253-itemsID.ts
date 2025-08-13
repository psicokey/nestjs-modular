import { MigrationInterface, QueryRunner } from "typeorm";

export class ItemsID1755120958253 implements MigrationInterface {
    name = 'ItemsID1755120958253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD PRIMARY KEY (\`id\`)`);
    }

}

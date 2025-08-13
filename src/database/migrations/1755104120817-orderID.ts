import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderID1755104120817 implements MigrationInterface {
    name = 'OrderID1755104120817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_f1d359a55923bb45b057fbdab0d\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP COLUMN \`orderId\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD \`orderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_f1d359a55923bb45b057fbdab0d\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_f1d359a55923bb45b057fbdab0d\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP COLUMN \`orderId\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD \`orderId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_f1d359a55923bb45b057fbdab0d\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class FixIds1754404783684 implements MigrationInterface {
    name = 'FixIds1754404783684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_6c687a8fa35b0ae35ce766b56ce\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_6c687a8fa35b0ae35ce766b56ce\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_6c687a8fa35b0ae35ce766b56ce\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_6c687a8fa35b0ae35ce766b56ce\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class TagTable1628816300876 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`CREATE TABLE IF NOT EXISTS tag
        (id SERIAL PRIMARY KEY, 
        name VARCHAR(100) NOT NULL)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tag');
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductTable1628650931426 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`CREATE TABLE IF NOT EXISTS product
        (id SERIAL PRIMARY KEY, 
        name VARCHAR(100) NOT NULL,  
        tags TEXT[],
        created_at TIMESTAMP NOT NULL DEFAULT NOW())`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product');
    }

}

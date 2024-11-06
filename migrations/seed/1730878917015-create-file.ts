import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFile1730878917015 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO roles (id, name) VALUES 
            ('1', 'Admin'), 
            ('2', 'User')
        `);

        await queryRunner.query(`
            INSERT INTO permissions (id, name) VALUES 
            ('1', 'READ'), 
            ('2', 'WRITE')
        `);

        await queryRunner.query(`
            INSERT INTO menus (id, name, url) VALUES 
            ('1', 'Home', '/home'), 
            ('2', 'Dashboard', '/dashboard')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

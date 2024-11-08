import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFile1730878917015 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO roles ("id", "name") VALUES 
            (1, 'Admin'), 
            (2, 'User')
        `);

        await queryRunner.query(`
            INSERT INTO permissions ("id", "name") VALUES 
            (1, 'READ'), 
            (2, 'WRITE'),
            (3, 'DELETE')
        `);

        await queryRunner.query(`
            INSERT INTO menus ("id", "name", "url") VALUES 
            (1, 'Home', '/home'), 
            (2, 'Dashboard', '/dashboard'), 
            (3, 'Settings', '/settings')
        `);

        await queryRunner.query(`
            INSERT INTO users ("id", "name", "username", "password") VALUES 
            (1, 'Admin', 'admin', 'admin123'), 
            (2, 'User', 'user', 'user123')
        `);

        await queryRunner.query(`
            INSERT INTO users_roles ("usersId", "rolesId") VALUES 
            (1, 1),
            (1, 2),
            (2, 2)
        `);

        await queryRunner.query(`
            INSERT INTO roles_permissions ("rolesId", "permissionsId") VALUES 
            (1, 1), 
            (1, 2), 
            (1, 3), 
            (2, 1)
        `);

        await queryRunner.query(`
            INSERT INTO roles_menus ("rolesId", "menusId") VALUES 
            (1, 1), 
            (1, 2), 
            (1, 3), 
            (2, 1), 
            (2, 2)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM roles_menus`);
        await queryRunner.query(`DELETE FROM roles_permissions`);
        await queryRunner.query(`DELETE FROM users_roles`);

        await queryRunner.query(`DELETE FROM users`);
        await queryRunner.query(`DELETE FROM menus`);
        await queryRunner.query(`DELETE FROM permissions`);
        await queryRunner.query(`DELETE FROM roles`);
    }
}
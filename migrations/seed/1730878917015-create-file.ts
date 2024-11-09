import { PERMISSION } from "common/constants/permission";
import { ROLE } from "common/constants/role";
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFile1730878917015 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO roles ("id", "name") VALUES 
            (1, '${ROLE.ADMIN}'), 
            (2, '${ROLE.CUSTOMER}')
        `);

        await queryRunner.query(`
            INSERT INTO permissions ("id", "name") VALUES 
            (1, '${PERMISSION.READ_LIST_USER}'), 
            (2, '${PERMISSION.READ_DETAIL_USER}'), 
            (3, '${PERMISSION.CREATE_USER}'), 
            (4, '${PERMISSION.UPDATE_USER}'), 
            (5, '${PERMISSION.DELETE_USER}'),

            (6, '${PERMISSION.READ_LIST_MENU}'), 
            (7, '${PERMISSION.READ_DETAIL_MENU}'), 
            (8, '${PERMISSION.CREATE_MENU}'), 
            (9, '${PERMISSION.UPDATE_MENU}'), 
            (10, '${PERMISSION.DELETE_MENU}'),

            (11, '${PERMISSION.READ_LIST_PERMISSION}'), 
            (12, '${PERMISSION.READ_DETAIL_PERMISSION}'), 
            (13, '${PERMISSION.CREATE_PERMISSION}'), 
            (14, '${PERMISSION.UPDATE_PERMISSION}'), 
            (15, '${PERMISSION.DELETE_PERMISSION}'),

            (16, '${PERMISSION.READ_LIST_ROLE}'), 
            (17, '${PERMISSION.READ_DETAIL_ROLE}'), 
            (18, '${PERMISSION.CREATE_ROLE}'), 
            (19, '${PERMISSION.UPDATE_ROLE}'), 
            (20, '${PERMISSION.DELETE_ROLE}'),

            (21, '${PERMISSION.ASSIGN_PERMISSION_TO_ROLE}'), 
            (22, '${PERMISSION.ASSIGN_ROLE_TO_USER}')
        `);

        await queryRunner.query(`
            INSERT INTO menus ("id", "name", "url") VALUES 
            (1, 'Home', '/home'), 
            (2, 'Dashboard', '/dashboard'), 
            (3, 'Settings', '/settings')
        `);

        await queryRunner.query(`
            INSERT INTO users ("id", "name", "username", "password") VALUES 
            (1, 'Admin', 'admin', '$2a$12$mPPVsEweGCkSFvhaxYZUEu0oettBEg/ZcLTcc7/F2drMRBjVj.scq'), 
            (2, 'User', 'user', '$2a$12$WGzSYcArf6cb5s1ryZKuf.VNhUmQiL0jMygPBwySR5pkntvdeyagq')
        `);//password: username + '123'

        await queryRunner.query(`
            INSERT INTO users_roles ("usersId", "rolesId") VALUES 
            (1, 1),
            (1, 2),
            (2, 2)
        `);

        // Assign all permissions to Admin role
        await queryRunner.query(`
            INSERT INTO roles_permissions ("rolesId", "permissionsId") VALUES 
            (1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
            (1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
            (1, 11), (1, 12), (1, 13), (1, 14), (1, 15),
            (1, 16), (1, 17), (1, 18), (1, 19), (1, 20),
            (1, 21), (1, 22)
        `);

        // Assign read permissions to Customer role
        await queryRunner.query(`
            INSERT INTO roles_permissions ("rolesId", "permissionsId") VALUES 
            (2, 1), (2, 2),
            (2, 6), (2, 7),
            (2, 11), (2, 12),
            (2, 16), (2, 17)
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
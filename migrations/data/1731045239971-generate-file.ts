import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateFile1731045239971 implements MigrationInterface {
    name = 'GenerateFile1731045239971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menus" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_3fec3d93327f4538e0cbd4349c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refreshtokens" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_87227f9dbc6460359fd991d66ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_permissions" ("rolesId" integer NOT NULL, "permissionsId" integer NOT NULL, CONSTRAINT "PK_f8e26259e2114a037f1180ec0d8" PRIMARY KEY ("rolesId", "permissionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bf98d8fd47610db71dfc5a4a5f" ON "roles_permissions" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f25fd350775094ceb3a02c1468" ON "roles_permissions" ("permissionsId") `);
        await queryRunner.query(`CREATE TABLE "roles_menus" ("rolesId" integer NOT NULL, "menusId" integer NOT NULL, CONSTRAINT "PK_d94da037b736bad4a8a50c6b055" PRIMARY KEY ("rolesId", "menusId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b465775f8f104ad3673b8d1f41" ON "roles_menus" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e66c7ce4d2940d236ddacba488" ON "roles_menus" ("menusId") `);
        await queryRunner.query(`CREATE TABLE "users_roles" ("usersId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_37623035dbbec2f0a4b76ff4000" PRIMARY KEY ("usersId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_deeb1fe94ce2d111a6695a2880" ON "users_roles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_21db462422f1f97519a29041da" ON "users_roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "refreshtokens" ADD CONSTRAINT "FK_5e0a01181da36ecd50cacef092f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_bf98d8fd47610db71dfc5a4a5ff" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_f25fd350775094ceb3a02c14681" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_menus" ADD CONSTRAINT "FK_b465775f8f104ad3673b8d1f410" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_menus" ADD CONSTRAINT "FK_e66c7ce4d2940d236ddacba4889" FOREIGN KEY ("menusId") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_deeb1fe94ce2d111a6695a2880e" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_21db462422f1f97519a29041da0" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_21db462422f1f97519a29041da0"`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_deeb1fe94ce2d111a6695a2880e"`);
        await queryRunner.query(`ALTER TABLE "roles_menus" DROP CONSTRAINT "FK_e66c7ce4d2940d236ddacba4889"`);
        await queryRunner.query(`ALTER TABLE "roles_menus" DROP CONSTRAINT "FK_b465775f8f104ad3673b8d1f410"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_f25fd350775094ceb3a02c14681"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_bf98d8fd47610db71dfc5a4a5ff"`);
        await queryRunner.query(`ALTER TABLE "refreshtokens" DROP CONSTRAINT "FK_5e0a01181da36ecd50cacef092f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21db462422f1f97519a29041da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_deeb1fe94ce2d111a6695a2880"`);
        await queryRunner.query(`DROP TABLE "users_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e66c7ce4d2940d236ddacba488"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b465775f8f104ad3673b8d1f41"`);
        await queryRunner.query(`DROP TABLE "roles_menus"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f25fd350775094ceb3a02c1468"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf98d8fd47610db71dfc5a4a5f"`);
        await queryRunner.query(`DROP TABLE "roles_permissions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "refreshtokens"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "menus"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
    }

}

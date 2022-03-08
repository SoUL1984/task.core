import { MigrationInterface, QueryRunner } from 'typeorm';

export class create_user1646552645204 implements MigrationInterface {
    name = 'create_user1646552645204';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."user_city_enum" AS ENUM('Санкт-Петербург', 'Самара', 'Москва')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."user_role_enum" AS ENUM('customer', 'dentaltechn', 'director', 'courier', 'admin')`,
        );
        await queryRunner.query(
            `CREATE TABLE "user" (
                "id" SERIAL NOT NULL, 
                "email" character varying NULL, 
                "password" character varying(250) NOT NULL, 
                "name" character varying(250) NOT NULL, 
                "city" "public"."user_city_enum" NOT NULL DEFAULT 'Москва', 
                "addres" date NULL, 
                "phone" character varying NULL, 
                "birthday" date NULL, 
                "role" "public"."user_role_enum" NOT NULL DEFAULT 'customer', 
                "lastVisit" date NULL, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), 
                CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), 
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_city_enum"`);
    }
}

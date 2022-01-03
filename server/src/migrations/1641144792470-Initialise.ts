import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialise1641144792470 implements MigrationInterface {
    name = 'Initialise1641144792470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5e568e001f9d1b91f67815c580f" UNIQUE ("username"), CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "UQ_407c6798fe20fd5d75de4a233c1" UNIQUE ("password"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject_tutor" ("tutorId" uuid NOT NULL, "subjectId" uuid NOT NULL, CONSTRAINT "PK_585ff8a95fe13f4ad62a65a52d4" PRIMARY KEY ("tutorId", "subjectId"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "numberOfTutors" integer NOT NULL DEFAULT '0', "description" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tutor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "salary" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_09866c57be89d0a8dbef57c5a32" UNIQUE ("username"), CONSTRAINT "UQ_840e5143ce8306cc8a4b3956247" UNIQUE ("email"), CONSTRAINT "UQ_3971a840af011b5ad8ddbe94ec9" UNIQUE ("password"), CONSTRAINT "PK_984f6d98173bd54eb367e727491" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "tutorId" uuid NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."skill_level_enum" AS ENUM('Beginner', 'Intermediate', 'Advanced')`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "level" "public"."skill_level_enum" NOT NULL DEFAULT 'Beginner', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_638bac731294171648258260ff2" UNIQUE ("password"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subject_tutor" ADD CONSTRAINT "FK_d9fe34d761c594b43c92257df7d" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject_tutor" ADD CONSTRAINT "FK_ee9de85fbce1af975dbdcc26846" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_d0bf2b28f974f68f2b9e3e97274" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_d0bf2b28f974f68f2b9e3e97274"`);
        await queryRunner.query(`ALTER TABLE "subject_tutor" DROP CONSTRAINT "FK_ee9de85fbce1af975dbdcc26846"`);
        await queryRunner.query(`ALTER TABLE "subject_tutor" DROP CONSTRAINT "FK_d9fe34d761c594b43c92257df7d"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`DROP TYPE "public"."skill_level_enum"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "tutor"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "subject_tutor"`);
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}

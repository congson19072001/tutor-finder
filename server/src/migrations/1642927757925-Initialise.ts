import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialise1642927757925 implements MigrationInterface {
    name = 'Initialise1642927757925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."resume_type_enum" AS ENUM('Education', 'Work Experience', 'Certification')`);
        await queryRunner.query(`CREATE TABLE "resume" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tutorId" uuid NOT NULL, "title" character varying NOT NULL, "type" "public"."resume_type_enum" NOT NULL DEFAULT 'Certification', "description" character varying NOT NULL, "startYear" integer NOT NULL, "endYear" integer, CONSTRAINT "PK_7ff05ea7599e13fac01ac812e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."schedule_status_enum" AS ENUM('pending', 'accepted', 'canceled', 'finished')`);
        await queryRunner.query(`CREATE TYPE "public"."schedule_type_enum" AS ENUM('one-to-one', 'group', 'trial')`);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "tutorId" uuid NOT NULL, "startTime" TIMESTAMP WITH TIME ZONE NOT NULL, "endTime" TIMESTAMP WITH TIME ZONE NOT NULL, "status" "public"."schedule_status_enum" NOT NULL DEFAULT 'pending', "type" "public"."schedule_type_enum" NOT NULL DEFAULT 'one-to-one', "recurrenceRule" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_profile_gender_enum" AS ENUM('Male', 'Female')`);
        await queryRunner.query(`CREATE TYPE "public"."user_profile_province_enum" AS ENUM('An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu', 'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước', 'Bình Thuận', 'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Đắk Nông', 'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Tĩnh', 'Hải Dương', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định', 'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên', 'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'Trà Vinh', 'Tuyên Quang', 'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái', 'Phú Yên', 'Cần Thơ', 'Đà Nẵng', 'Hải Phòng', 'Hà Nội', 'TP HCM')`);
        await queryRunner.query(`CREATE TABLE "user_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gender" "public"."user_profile_gender_enum" NOT NULL DEFAULT 'Male', "age" integer, "address" character varying NOT NULL DEFAULT '', "province" "public"."user_profile_province_enum" NOT NULL DEFAULT 'Hà Nội', "avatar" character varying NOT NULL DEFAULT 'https://pic.onlinewebfonts.com/svg/img_264570.png', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "tutorId" uuid NOT NULL, "subject" character varying NOT NULL, "content" character varying NOT NULL, "score" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tutor_profile_gender_enum" AS ENUM('Male', 'Female')`);
        await queryRunner.query(`CREATE TYPE "public"."tutor_profile_province_enum" AS ENUM('An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu', 'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước', 'Bình Thuận', 'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Đắk Nông', 'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Tĩnh', 'Hải Dương', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định', 'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên', 'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'Trà Vinh', 'Tuyên Quang', 'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái', 'Phú Yên', 'Cần Thơ', 'Đà Nẵng', 'Hải Phòng', 'Hà Nội', 'TP HCM')`);
        await queryRunner.query(`CREATE TYPE "public"."tutor_profile_advancenotice_enum" AS ENUM('at_least_1_hour', 'at_least_3_hour', 'at_least_6_hour', 'at_least_12_hour', 'at_least_1_day', 'at_least_2_day')`);
        await queryRunner.query(`CREATE TYPE "public"."tutor_profile_bookingwindow_enum" AS ENUM('2_week', '3_week', '1_month', '2_month')`);
        await queryRunner.query(`CREATE TABLE "tutor_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bio" character varying NOT NULL DEFAULT '', "gender" "public"."tutor_profile_gender_enum" NOT NULL DEFAULT 'Male', "age" integer, "address" character varying NOT NULL DEFAULT '', "province" "public"."tutor_profile_province_enum" NOT NULL DEFAULT 'Hà Nội', "avatar" character varying NOT NULL DEFAULT 'https://pic.onlinewebfonts.com/svg/img_264570.png', "advanceNotice" "public"."tutor_profile_advancenotice_enum" NOT NULL DEFAULT 'at_least_1_day', "bookingWindow" "public"."tutor_profile_bookingwindow_enum" NOT NULL DEFAULT '2_week', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_0cc3e6db6aeecc65adda6e0e7ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "availability" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tutorId" uuid NOT NULL, "startTime" integer NOT NULL, "endTime" integer NOT NULL, "dayOfWeek" integer NOT NULL, CONSTRAINT "PK_05a8158cf1112294b1c86e7f1d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "tutorId" uuid NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "level" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "tutor" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "tutor" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "fullName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "fullName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profileId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_9466682df91534dd95e4dbaa616" UNIQUE ("profileId")`);
        await queryRunner.query(`ALTER TABLE "tutor" ADD "fullName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tutor" ADD "profileId" uuid`);
        await queryRunner.query(`ALTER TABLE "tutor" ADD CONSTRAINT "UQ_c0a68fd48f16be59eb3cf2d5382" UNIQUE ("profileId")`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tutor" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "tutor" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tutor" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "tutor" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "resume" ADD CONSTRAINT "FK_60064c050504704b0cb4a08110e" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_56604413fff7f049b6dff722eed" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_d796103491cf0bae197dda59477" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_8dc9c3a13e1e099d799ad593b40" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutor" ADD CONSTRAINT "FK_c0a68fd48f16be59eb3cf2d5382" FOREIGN KEY ("profileId") REFERENCES "tutor_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "availability" ADD CONSTRAINT "FK_a2dbcbd86709186ad2a92fd63ae" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_d0bf2b28f974f68f2b9e3e97274" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_d0bf2b28f974f68f2b9e3e97274"`);
        await queryRunner.query(`ALTER TABLE "availability" DROP CONSTRAINT "FK_a2dbcbd86709186ad2a92fd63ae"`);
        await queryRunner.query(`ALTER TABLE "tutor" DROP CONSTRAINT "FK_c0a68fd48f16be59eb3cf2d5382"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_8dc9c3a13e1e099d799ad593b40"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_d796103491cf0bae197dda59477"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_56604413fff7f049b6dff722eed"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP CONSTRAINT "FK_60064c050504704b0cb4a08110e"`);
        await queryRunner.query(`ALTER TABLE "tutor" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "tutor" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tutor" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "tutor" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tutor" DROP CONSTRAINT "UQ_c0a68fd48f16be59eb3cf2d5382"`);
        await queryRunner.query(`ALTER TABLE "tutor" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "tutor" DROP COLUMN "fullName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fullName"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "fullName"`);
        await queryRunner.query(`ALTER TABLE "tutor" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tutor" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "availability"`);
        await queryRunner.query(`DROP TABLE "tutor_profile"`);
        await queryRunner.query(`DROP TYPE "public"."tutor_profile_bookingwindow_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tutor_profile_advancenotice_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tutor_profile_province_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tutor_profile_gender_enum"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
        await queryRunner.query(`DROP TYPE "public"."user_profile_province_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_profile_gender_enum"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`DROP TYPE "public"."schedule_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."schedule_status_enum"`);
        await queryRunner.query(`DROP TABLE "resume"`);
        await queryRunner.query(`DROP TYPE "public"."resume_type_enum"`);
    }

}

import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AvailabilityApplication } from "./AvailabilityApplication";
import { CertificationApplication } from "./CertificationApplication";
import { DiplomaApplication } from "./DiplomaApplication";
import { Subject } from "./Subject";

export type TutorGender = "Male" | "Female";
export type TutorNotice = "at_least_1_hour" | "at_least_3_hour" | "at_least_6_hour" | "at_least_12_hour" | "at_least_1_day" | "at_least_2_day";
export type TutorBookingWindow = "2_week" | "3_week" | "1_month" | "2_month";


@ObjectType()
@Entity()
export class TutorApplication extends BaseEntity {

    @Field(_type=>ID)
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field(_type=>String)
    @Column({ unique: true })
    username!: string;

    @Field(_type=>String)
    @Column({ unique: true })
    email!: string;

    @Column({ unique: true })
    password!: string;

    @Field(_type=>String)
    @Column()
    fullName!: string;

    @Field(_type=>ID, {nullable: true})
    @Column("uuid", {nullable: true})
    subjectId: string;

    @Field(_type=>Subject, {nullable: true})
    @JoinColumn({name: "subjectId"})
    subject: Subject;

    @Field({nullable: true})
    @Column({nullable: true})
    salary: number;

    @Field(_type=>String)
    @Column({default: ""})
    bio: string;

    @Field(_type=>String)
    @Column({
        type: "enum",
        enum: ["Male", "Female"],
        default: "Male"
    })
    gender: TutorGender;
    
    @Field({nullable: true})
    @Column({nullable: true})
    country: string;

    @Field(_type=>String, {nullable: true})
    @Column({nullable: true})
    videoUrl: string;

    @Field(_type=>String)
    @Column({default: "https://pic.onlinewebfonts.com/svg/img_264570.png"})
    avatar!: string;

    @Field()
    @Column({
        type: "enum",
        enum: ["at_least_1_hour", "at_least_3_hour", "at_least_6_hour", "at_least_12_hour", "at_least_1_day", "at_least_2_day"],
        default: "at_least_1_day"
    })
    advanceNotice: TutorNotice;

    @Field()
    @Column({
        type: "enum",
        enum: ["2_week", "3_week", "1_month", "2_month"],
        default: "2_week"
    })
    bookingWindow: TutorBookingWindow;

    @Field(_type=>Number,{nullable: true})
    @Column({nullable: true})
    age: number;

    @Field(_type=>String)
    @Column({default: ""})
    address: string;

    @Field(_type=>String, {nullable: true})
    @Column({nullable: true})
    timezone: string;


    @Field(_type => [CertificationApplication], { nullable: true })
    @OneToMany(() => CertificationApplication, c => c.tutor, { cascade: true, nullable: true })
    certificationApplications: CertificationApplication[];

    @Field(_type => [DiplomaApplication], { nullable: true })
    @OneToMany(() => DiplomaApplication, d => d.tutor, { cascade: true, nullable: true })
    diplomaApplications: DiplomaApplication[];

    @Field(_type => [AvailabilityApplication], { nullable: true })
    availabilityApplications: AvailabilityApplication[];

    @Field(_type => Boolean)
    @Column({default: false})
    isValid: boolean;

    @Field()
    @CreateDateColumn({type: 'timestamptz'})
    createdAt: Date;

    @Field()
    @UpdateDateColumn({type: 'timestamptz'})
    updatedAt: Date;
}
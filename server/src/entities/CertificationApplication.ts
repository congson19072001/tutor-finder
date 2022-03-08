import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TutorApplication } from "./TutorApplication";

@ObjectType()
@Entity()
export class CertificationApplication extends BaseEntity{

    @Field(_type=>ID)
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field(_type=>ID)
    @Column()
    tutorId!: string;

    @Field(_type=>String)
    @Column()
    certificate!: string;

    @Field(_type => String)
    @Column()
    subject!: String;

    @Field(_type => String)
    @Column()
    description!: string;

    @Field(_type => String)
    @Column()
    issuedBy!: string;

    @Field(_type => String)
    @Column()
    badgeUrl!: string;

    @Field()
    @Column()
    startYear!: number;

    @Field(_type => Number, { nullable: true })
    @Column({nullable: true})
    endYear: number;


    @Field(_type => TutorApplication, { nullable: true })
    @ManyToOne(_type => TutorApplication, tutor => tutor.certifications)
    @JoinColumn({ name: "tutorId" })
    tutor: Promise<TutorApplication>;


}
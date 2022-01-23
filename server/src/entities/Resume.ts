import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tutor } from "./Tutor";
export type ResumeType = "Education" | "Work Experience" | "Certification";

@ObjectType()
@Entity()
export class Resume extends BaseEntity{

    @Field(_type=>ID)
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field(_type=>ID)
    @Column()
    tutorId!: string;

    @Field(_type=>String)
    @Column()
    title!: string;


    @Field(_type => String)
    @Column({
        type: "enum",
        enum: ["Education", "Work Experience", "Certification"],
        default: "Certification"
    })
    type!: ResumeType;

    @Field()
    @Column()
    description!: string;

    @Field()
    @Column()
    startYear!: number;

    @Field(_type => Number, { nullable: true })
    @Column({nullable: true})
    endYear: number;

    @Field()
    @CreateDateColumn({type: "timestamptz"})
    createdAt: Date;

    @Field(_type => Tutor, { nullable: true })
    @ManyToOne(_type => Tutor, tutor => tutor.resumes)
    @JoinColumn({ name: "tutorId" })
    tutor: Promise<Tutor>;

    @Field()
    @UpdateDateColumn({type: "timestamptz"})
    updatedAt: Date;


}
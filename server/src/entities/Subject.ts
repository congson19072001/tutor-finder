import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Speciality } from "./Speciality";
import { SubjectTutor } from "./SubjectTutor";
import { Tutor } from "./Tutor";

@ObjectType()
@Entity()
export class Subject extends BaseEntity{

    @Field(_type=>ID)
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field(_type=>String)
    @Column({unique: true})
    title!: string;

    @OneToMany(_to => SubjectTutor, st => st.subject)
    tutorConnection: SubjectTutor[];

    @OneToMany(_to => Speciality, st => st.subject)
    specialities : Speciality[];

    @Field()
    @Column({default: 0})
    numberOfTutors!: number;

    @Field()
    @Column()
    description!: string;

    @Field()
    @CreateDateColumn({type: "timestamptz"})
    createdAt: Date;

    @Field(_type => [Tutor], { nullable: true })
    tutors: Tutor[];

    @Field()
    @UpdateDateColumn({type: "timestamptz"})
    updatedAt: Date;


}
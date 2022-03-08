import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SpecialityTutor } from "./SpecialityTutor";
import { Tutor } from "./Tutor";

@ObjectType()
@Entity()
export class Speciality extends BaseEntity{

    @Field(_type=>ID)
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field(_type=>String)
    @Column()
    title!: string;

    @Field(_type=>ID)
    @Column("uuid")
    subjectId!: string;

    @OneToMany(_to => SpecialityTutor, st => st.speciality)
    tutorConnection: SpecialityTutor[];

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
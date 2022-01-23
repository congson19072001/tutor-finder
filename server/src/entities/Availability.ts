import { Field, ID, ObjectType } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Tutor } from "./Tutor";


@ObjectType()
@Entity()
export class Availability extends BaseEntity {
    @Field(_type => ID)
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field(_type => ID)
    @Column({type: 'uuid'})
    tutorId!: string;

    @Field(_type => Tutor)
    @ManyToOne(_type => Tutor, tutor => tutor.availabilities)
    @JoinColumn({ name: "tutorId" })
    tutor!: Promise<Tutor>;

    @Field()
    @Column()
    startTime!: number;

    @Field()
    @Column()
    endTime!: number;

    @Field()
    @Column()
    dayOfWeek!: number;
    
}
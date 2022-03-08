import { Field, ID, ObjectType } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { TutorApplication } from "./TutorApplication";


@ObjectType()
@Entity()
export class AvailabilityApplication extends BaseEntity {
    @Field(_type => ID)
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field(_type => ID)
    @Column({type: 'uuid'})
    tutorId!: string;

    @Field(_type => TutorApplication)
    @ManyToOne(_type => TutorApplication, tutor => tutor.availabilities)
    @JoinColumn({ name: "tutorId" })
    tutor!: Promise<TutorApplication>;

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
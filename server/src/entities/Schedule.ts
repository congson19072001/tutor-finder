import { Field, ID, ObjectType } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Tutor } from "./Tutor";
import { User } from "./User";

export type ScheduleStatus = "pending" | "accepted" | "canceled" | "finished";
export type ScheduleType = "one-to-one" | "group" | "trial";


@ObjectType()
@Entity()
export class Schedule extends BaseEntity {
    @Field(_type => ID)
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field(_type => ID)
    @Column({type: 'uuid'})
    userId!: string;

    @Field(_type => ID)
    @Column({type: 'uuid'})
    tutorId!: string;

    @Field(_type => Tutor)
    @ManyToOne(_type => Tutor, tutor => tutor.schedules)
    @JoinColumn({ name: "tutorId" })
    tutor!: Promise<Tutor>;

    @Field(_type => User)
    @ManyToOne(_type => User, user => user.schedules)
    @JoinColumn({ name: "userId" })
    user!: Promise<User>;

    @Field(_type => Date)
    @Column({type: 'timestamp'})
    startTime!: Date;

    @Field(_type => Date)
    @Column({type: 'timestamp'})
    endTime!: Date;

    @Field(_type => String)
    @Column({
        type: 'enum',
        enum: ["pending", "accepted", "canceled", "finished"],
        default: "pending"
    })
    status!: string;

    @Field(_type => String)
    @Column({
        type: 'enum',
        enum: ["one-to-one", "group", "trial"],
        default: "one-to-one"
    })
    type!: string;

    @Field(_type => String)
    @Column()
    recurrenceRule: string;

    @Field()
    @CreateDateColumn({type: 'timestamptz'})
    createdAt: Date;

    @Field()
    @UpdateDateColumn({type: 'timestamptz'})
    updatedAt: Date;



    




    
}
import { Field, ID, ObjectType } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Tutor } from "./Tutor";
import { User } from "./User";



@ObjectType()
@Entity()
export class Review extends BaseEntity {
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
    @ManyToOne(_type => Tutor, tutor => tutor.reviews)
    @JoinColumn({ name: "tutorId" })
    tutor!: Promise<Tutor>;

    @Field(_type => User)
    @ManyToOne(_type => User, user => user.reviews)
    @JoinColumn({ name: "userId" })
    user!: Promise<User>;

    @Field(_type => String)
    @Column()
    subject!: string;

    @Field(_type => String)
    @Column()
    content!: string;

    @Field()
    @Column()
    score!: number;

    @Field()
    @CreateDateColumn({type: 'timestamptz'})
    createdAt: Date;

    @Field()
    @UpdateDateColumn({type: 'timestamptz'})
    updatedAt: Date;


    
}
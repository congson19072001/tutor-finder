import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Schedule } from "./Schedule";
import { UserProfile } from "./UserProfile";


@ObjectType()
@Entity()
export class User extends BaseEntity {

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

    @Field()
    @OneToOne(() => UserProfile, { cascade: true })
    @JoinColumn()
    profile: UserProfile;

    @Field(_type => [Schedule], { nullable: true })
    schedules: Schedule[];

    @Field()
    @CreateDateColumn({type: 'timestamptz'})
    createdAt: Date;

    @Field()
    @UpdateDateColumn({type: 'timestamptz'})
    updatedAt: Date;
}
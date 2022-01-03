import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@ObjectType()
@Entity()
export class Admin extends BaseEntity {

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
    firstName!: string;

    @Field(_type=>String)
    @Column()
    lastName!: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
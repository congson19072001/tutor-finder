import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Skill extends BaseEntity{

    @Field(_type=>ID)
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field(_type=>String)
    @Column()
    title!: string;

    @Field({nullable: true})
    @Column({nullable: true})
    description: string;

    @Field()
    @Column()
    level!: string;

    @Field()
    @CreateDateColumn({type: 'timestamptz'})
    createdAt: Date;

    @Field()
    @UpdateDateColumn({type: 'timestamptz'})
    updatedAt: Date;


}
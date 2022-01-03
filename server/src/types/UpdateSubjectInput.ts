import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class UpdateSubjectInput {
	@Field(_type => ID)
	id: string

	@Field()
	title: string

	@Field()
	description: string
}
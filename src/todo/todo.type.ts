/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
// import { User } from 'src/auth/auth.entity';

@ObjectType('Todo')
export class TodoType {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  status: boolean;

  @Field()
  createdAt: string;

  // user: User;
}
@InputType()
export class UpdateTodoInput {
  @Field()
  title: string;

  @Field()
  description: string;
}

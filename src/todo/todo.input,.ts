import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field()
  @MinLength(1)
  title: string;

  @Field()
  @MinLength(1)
  description: string;
}

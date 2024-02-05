/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType('User')
export class UserType {
  @Field((type) => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  createdAt: string;
}

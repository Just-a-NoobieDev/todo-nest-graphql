/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType('access_token')
export class Access_token {
  @Field()
  access_token: string;
}

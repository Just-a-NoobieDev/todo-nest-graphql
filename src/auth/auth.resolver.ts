/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './auth.type';
import { AuthService } from './auth.service';

@Resolver((of) => UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query((returns) => UserType)
  user(@Args('id') id: string) {
    return this.authService.getUser(id);
  }

  @Query((returns) => UserType)
  users() {
    return this.authService.getUsers();
  }

  @Mutation((returns) => UserType)
  createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('cpassword') cpassword: string,
  ) {
    return this.authService.createUser(name, email, password, cpassword);
  }
}

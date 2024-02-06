import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserType } from './user.type';
import { Public } from 'src/auth/decorators/public.decorators';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Public()
  @Query(() => UserType)
  user(@Args('id') id: string) {
    return this.userService.getUser(id);
  }

  @Public()
  @Query(() => UserType)
  users() {
    return this.userService.getUsers();
  }

  @Public()
  @Mutation(() => UserType)
  createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('cpassword') cpassword: string,
  ) {
    return this.userService.createUser(name, email, password, cpassword);
  }
}

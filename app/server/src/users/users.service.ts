import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/schemas/user.schema';
import { IUserService, SearchUserParams } from './entities/user.entity';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  create(data: CreateUserDto): Promise<User> {
    const user = new this.UserModel(data);
    return user.save();
  }

  findAll({
    offset,
    limit,
    contactPhone,
    name,
    email,
  }: SearchUserParams): Promise<User[]> {
    return this.UserModel.find(
      {
        name: `/${name}/i`,
        email: `/${email}/i`,
        contactPhone: `/${contactPhone}/i`,
      },
      null,
      { limit, offset },
    )
      .select('-__v')
      .exec();
  }

  findById(id: string): Promise<User> {
    return this.UserModel.findById({ _id: id }).select('-__v').exec();
  }

  findByEmail(email: string): Promise<User> {
    return this.UserModel.findOne({ email: email }).select('-__v');
  }
}
export { SearchUserParams };

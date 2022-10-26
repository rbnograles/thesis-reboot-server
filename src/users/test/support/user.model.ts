import { userStub } from './../stubs/user.stub';
import { MockModel } from '../../../db/test/support/mock.model';
import { User } from 'src/users/schemas/user.schema';

export class UserModel extends MockModel<User> {
  protected entityStub = userStub();
}

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';

jest.mock('../auth.service.ts');

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined 123', () => {
    expect(service).toBeDefined();
  });
});

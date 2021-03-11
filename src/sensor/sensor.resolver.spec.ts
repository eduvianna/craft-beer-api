import { Test, TestingModule } from '@nestjs/testing';
import { SensorResolver } from './sensor.resolver';

describe('SensorResolver', () => {
  let resolver: SensorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorResolver],
    }).compile();

    resolver = module.get<SensorResolver>(SensorResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

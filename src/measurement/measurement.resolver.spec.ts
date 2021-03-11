import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementResolver } from './measurement.resolver';

describe('MeasurementResolver', () => {
  let resolver: MeasurementResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasurementResolver],
    }).compile();

    resolver = module.get<MeasurementResolver>(MeasurementResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

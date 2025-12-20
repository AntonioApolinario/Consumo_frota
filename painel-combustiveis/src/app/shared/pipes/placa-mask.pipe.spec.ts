import { PlacaMaskPipe } from './placa-mask.pipe';

describe('PlacaMaskPipe', () => {
  let pipe: PlacaMaskPipe;

  beforeEach(() => {
    pipe = new PlacaMaskPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a valid plate', () => {
    expect(pipe.transform('ABC1234')).toBe('ABC-1234');
  });

  it('should format lowercase plate to uppercase', () => {
    expect(pipe.transform('abc1234')).toBe('ABC-1234');
  });

  it('should format plate with special characters', () => {
    expect(pipe.transform('ABC-1234')).toBe('ABC-1234');
    expect(pipe.transform('ABC.1234')).toBe('ABC-1234');
  });

  it('should return empty string for null value', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return original value if length is not 7', () => {
    expect(pipe.transform('ABC123')).toBe('ABC123');
    expect(pipe.transform('ABC12345')).toBe('ABC12345');
  });

  it('should handle mixed format plates', () => {
    expect(pipe.transform('abc-1234')).toBe('ABC-1234');
    expect(pipe.transform('aBc1234')).toBe('ABC-1234');
  });
});

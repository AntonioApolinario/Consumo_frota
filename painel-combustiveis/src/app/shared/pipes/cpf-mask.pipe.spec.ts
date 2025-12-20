import { CpfMaskPipe } from './cpf-mask.pipe';

describe('CpfMaskPipe', () => {
  let pipe: CpfMaskPipe;

  beforeEach(() => {
    pipe = new CpfMaskPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a valid CPF', () => {
    expect(pipe.transform('12345678901')).toBe('123.456.789-01');
  });

  it('should format CPF with non-numeric characters', () => {
    expect(pipe.transform('123.456.789-01')).toBe('123.456.789-01');
  });

  it('should return empty string for null value', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return original value if length is not 11', () => {
    expect(pipe.transform('123456789')).toBe('123456789');
    expect(pipe.transform('12345678901234')).toBe('12345678901234');
  });

  it('should handle mixed alphanumeric input', () => {
    expect(pipe.transform('abc12345678901xyz')).toBe('123.456.789-01');
  });
});

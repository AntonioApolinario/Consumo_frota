import { CurrencyBrPipe } from './currency-br.pipe';

describe('CurrencyBrPipe', () => {
  let pipe: CurrencyBrPipe;

  beforeEach(() => {
    pipe = new CurrencyBrPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format integer values', () => {
    expect(pipe.transform(100)).toMatch(/R\$\s*100,00/);
    expect(pipe.transform(1000)).toMatch(/R\$\s*1\.000,00/);
  });

  it('should format decimal values', () => {
    expect(pipe.transform(5.50)).toMatch(/R\$\s*5,50/);
    expect(pipe.transform(1234.56)).toMatch(/R\$\s*1\.234,56/);
  });

  it('should format zero value', () => {
    expect(pipe.transform(0)).toMatch(/R\$\s*0,00/);
  });

  it('should return empty string for null value', () => {
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should format negative values', () => {
    expect(pipe.transform(-100)).toMatch(/-R\$\s*100,00/);
  });

  it('should handle large values', () => {
    expect(pipe.transform(1000000)).toMatch(/R\$\s*1\.000\.000,00/);
    expect(pipe.transform(123456.78)).toMatch(/R\$\s*123\.456,78/);
  });

  it('should handle very small decimal values', () => {
    expect(pipe.transform(0.01)).toMatch(/R\$\s*0,01/);
    expect(pipe.transform(0.99)).toMatch(/R\$\s*0,99/);
  });
});

describe('Jest Configuration', () => {
  it('should be properly configured', () => {
    expect(true).toBe(true);
  });

  it('should support TypeScript', () => {
    const message: string = 'Jest está funcionando!';
    expect(message).toContain('funcionando');
  });
});

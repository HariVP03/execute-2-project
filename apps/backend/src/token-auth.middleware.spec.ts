import { TokenAuthMiddleware } from './token-auth.middleware';

describe('TokenAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new TokenAuthMiddleware()).toBeDefined();
  });
});

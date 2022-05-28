import { FirebaseAuthMiddleware } from './firebase-auth.middleware';

describe('FirebaseAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new FirebaseAuthMiddleware()).toBeDefined();
  });
});

import { Injectable, NestMiddleware } from '@nestjs/common';
import admin from 'firebase-admin';
@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const header = req.headers?.authorization;
    if (
      header !== 'Bearer null' &&
      req.headers?.authorization?.startsWith('Bearer ')
    ) {
      const idToken = req.headers.authorization.split('Bearer ')[1];
      try {
        req.user = await admin.auth().verifyIdToken(idToken);
      } catch (err) {
        console.log(err);
        return;
      }
    }
    console.log('sexy b=uoy');
    next();
  }
}

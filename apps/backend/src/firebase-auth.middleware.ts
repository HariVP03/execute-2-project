import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import admin from 'firebase-admin';
@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    if (
      req.headers?.authorization !== 'Bearer null' &&
      req.headers?.authorization?.startsWith('Bearer ')
    ) {
      const idToken = req.headers.authorization.split('Bearer ')[1];
      try {
        req.user = await admin.auth().verifyIdToken(idToken);
        return next();
      } catch (err) {
        res.status(HttpStatus.FORBIDDEN).send('token invalid');
        return;
      }
    } else {
      return res.status(HttpStatus.FORBIDDEN).send('token invalid');
    }
  }
}

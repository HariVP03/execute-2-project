import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class TokenAuthMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  use(req: any, res: any, next: () => void) {
    if (
      req.headers?.authorization !== 'Bearer null' &&
      req.headers?.authorization?.startsWith('Bearer ')
    ) {
      const token = req.headers.authorization.split('Bearer ')[1];
      try {
        const t = this.prisma.token.findUnique({ where: { token } });
        req.token = t;
        if (t) return next();
        else res.status(HttpStatus.FORBIDDEN).send('token invalid');
      } catch (err) {
        res.status(HttpStatus.FORBIDDEN).send('token invalid');
      }
    } else {
      return res.status(HttpStatus.FORBIDDEN).send('token invalid');
    }
    next();
  }
}

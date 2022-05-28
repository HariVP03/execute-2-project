import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class TokenAuthMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: any, res: any, next: () => void) {
    console.log('sad');
    if (
      req.headers?.authorization !== 'Bearer null' &&
      req.headers?.authorization?.startsWith('Bearer ')
    ) {
      const token = req.headers.authorization.split('Bearer ')[1];
      try {
        console.log(token);
        const t = await this.prisma.token.findUnique({ where: { token } });
        console.log(token);
        req.token = t;
        console.log(t);
        if (t) return next();
        else res.status(HttpStatus.FORBIDDEN).send('token invalid');
      } catch (err) {
        res.status(HttpStatus.FORBIDDEN).send('token invalid');
      }
    } else {
      console.log('ded');
      return res.status(HttpStatus.FORBIDDEN).send('token invalid');
    }
  }
}

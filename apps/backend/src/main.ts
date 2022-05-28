import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeApp } from 'firebase-admin/app';
import admin from 'firebase-admin';
import { ValidationPipe } from '@nestjs/common';
const json = {
  type: 'service_account',
  project_id: 'execute-30e71',
  private_key_id: '351bc0a22689c304f5e99590f31d92e0e26e5f2d',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDs1eoZM/HT6dZd\nwzknK71dnY+yZPfAY+mJc2cFfRPKNV7jf/l8K145SzTaRjM/YH9QiY2p16aPctBY\nxcHQKSQ3UZA+KETzAOBAGYkAyXYonwZDeHDlZUGGxoBo+evAEBgTzprNgKDUyA9V\nQbmgRL6ePp5/FVe/cnF81pEAqjelWp2WFgEpLx5K9OKmxkDb/IioMYAtj3GmCyU8\n+k+gNFLWMLjSCpqR4My1ry/LdReZmIaMj6qyTbazk3LtyU8LVcGVQ3D5/nWsvxap\ngxAz87o6oX8s6O/ACRuy2oOdAp6nVAilPYIBmG+4bf10MDZF7MuJnosPXyGP6Pup\n92nWWtoNAgMBAAECggEADOTYiea6E793XEN0qR1IggBCAoRcuKy32jPeN/5HRYsC\nT4B4JLp3tsbRadDImXq3c7sJa2XCO60UisC5fIvA3QIjyD6JAnHZw6OgQdq2BCAk\nRygXfWW125CTDSQOIba+mNV2uBl4qBz8OLgLUx5rAlKGboTK8jFY3GMSIecigG4D\nsqB4e2UCVzhAe/JPUNoVsFmsC3bPhTYWn9Z9RAJ8q56nDI2dF17m6okAJf3Nh2Yz\nqMnzPqaDSPbm0uIn/h2tHy1m9HqNNrte0husPUma6y0WHcKyToN+AGig/MXoIz3Z\nR2MdTAI8pNsxAiNZlmiz4/9Dse1ZRVTUDf8hJyguAQKBgQD+zOY6jnS4xSj5BdlG\ncL2csT1bH1KY+WIZPxE5l/2cZytQ0KIgl13AD7PMBMLMTnGo1QReBAUNYGUV97de\nvuKe2B+rpSl3eZylnywJ77BWv0zS7UOb1pSEMoOI8YJ+Q6BmUaDriEjyw4Mm2UJM\nEPM3k87LI61uSfbmdmmxNLD1ZQKBgQDt81zl5YbmXgFQpVExS5NnMrHSCEr7Zjsj\nrJxhC6zn7shfKmai8sN1leqNLQOMWvS1nCoBceOACPq4GQNh7eiSUZ9QGi1EInJm\n47QhLOJei/njuLMZRyyE2o37bims71N0CBqHnO5v0epq4vCEe/xIbh+OeNIwNgKh\nDXEVKsB7iQKBgQD+UXt2dNvR1JBpxcmxQjQvYsTP37qsjzW35zgFGUx8QIl+d09r\nYkmjusiF2Tapf554mm1qfW6hhFZBD+hJvBMr4qHxy79QzeRpdy8Yl9GVNAm0+jai\nJBJGxLh/BjduWYeOuOj6TiQpkrWkH/PJQp3QGkqsfWbMjyzNqOEji2kY9QKBgQCw\npgOoVF5ydQVK5n/BNdcHPNZQE4H+4qUy1bj+PpmtUVKFe8fYXpsGlzYaenlw4DFd\nBcMVcYQwD/p5Y3BkaidHQLshz10dgOknQxH9swGWqRnpmbu0H2eIdWwEZYMg9Ecj\nE8UGOlW0w8TgdvuRjy36Y26f6Ug5LE+FWqJB0Yw16QKBgBr8YesQjCQggCmwPH4p\n3HklhwYqZLsow2zWPEp7jrMdDzUevSb3UgKzR/6n9oHVW9uTiH/tXzi/UUExnPlU\nhTqSjHXywOMDYogDQSOsQ0bDT22zWTJGbmbArgegbdtljEq7BFV3tc3aQac9O8To\nlOgqIU3SXLA4v3NGGcMPsIH3\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-qjser@execute-30e71.iam.gserviceaccount.com',
  client_id: '116952006260540567379',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qjser%40execute-30e71.iam.gserviceaccount.com',
};

async function bootstrap() {
  initializeApp({ credential: admin.credential.cert(json as any) });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();
  await app.listen(8888);
}
bootstrap();

import * as jose from 'jose'

export class TokenService {

  private readonly secretKey;
  private readonly algorithm;

  constructor(secretKey: string, algorithm = 'HS256') {
    this.secretKey = secretKey;
    this.algorithm = algorithm;
  }


  async generate(payload: jose.JWTPayload, expirationTime: number | string = '2h') {

    const secret = new TextEncoder().encode(this.secretKey)
    const alg = this.algorithm

    const jwt = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg, type: 'JWT' })
      .setIssuedAt(Date.now())
      .setIssuer("https://example.com")
      .setExpirationTime(expirationTime)
      .sign(secret)

    return jwt;
  }


  async verify(token: string) {
    const secret = new TextEncoder().encode(this.secretKey)

    const result = await jose.jwtVerify(token, secret, {
      algorithms: [this.algorithm]
    })

    return result;
  }
}
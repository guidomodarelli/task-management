# Authentication and Authorization

<ins>Authentication</ins>: is when you want to verify that somebody is who they claim to be
<ins>Authorization</ins>: is letting somebody into a specific system depending on their identify or permission level

## JSON Web Tokens (JWT)

- Usable for Authorization or secure exchange of information between parties
- Verify that the sender is who it/he/she claims to be
- Signed by the issuer, using a secret or key-pair (HMAC algorithm, RSA or ECDSA)

### JWT structure

`header.payload.signature`

<ins>header</ins>: contains metadata about the token (type, hashing algorithm, etc.)
<ins>payload</ins>: contains claims (statements about an entity - for example, a use and additional data)
<ins>signature</ins>: is the result of the encoded header, the encoded payload, signed against a secret. It's the result of the encoded header and the encoded payload running through a one way hashing algorithm signed against a secret or a private key.

That secret is a secret that only we know.

So if we're the only ones who know that secret, nobody can fake the signature.

### Example: Authoring real "John Doe"

"John Doe" sends a request to our API. He wants to delete a task.
In the request headers, we can find a JWT token.
To validate his token, we take the headers and payload, and re-generate the signature using our secret.
We then compare the result signature with the signature in his token.

`ab1c3 = ab1c3` ✅

### More about JSON Web Tokens

- JSON Web Tokens can be decoded by anyone. They should not contain sensitive information such as passwords.
- It is useful for front-end applications to use these tokens to toggle features conditionally.
- JWTs should ideally be short-lived
  - When you sign a token, you specify the payload, for example, that the use is an admin or their username. Those claims could change for the real user.
  - For example, the user could go to the application and change their name or change their role or whatever.
  - That's why you token should be short lived, because always want it to be as close possible to real state on your database, for example.

We're going to use PassportJs, which is an authentication middleware for NodeJs.

## Packages explanation

- `@nestjs/jwt`: that's a jwt package that allows integration with the NestJS framework
- `@nestjs/passport`: integrates the passport package with the NestJs module ecosystem
- `passport`: the pure passport library with the core functionality and passport
- `passport-jwt`: is the strategy that we use with passport to work with JSON web tokens

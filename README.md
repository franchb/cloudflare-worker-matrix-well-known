# cloudflare-worker-matrix-well-known

.well-known/matrix/* handler as a CF worker

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![build](https://github.com/franchb/cloudflare-worker-matrix-well-known/actions/workflows/test.yml/badge.svg)

This Cloudflare Function allows to serve `.well-known` Matrix.org server delegations from your Cloudflare Pages static site main domain, like `your-blog.com` and run Matrix.org server on some subdomain, for example `matrix.your-blog.com:1234`.

The exact details of how server name resolution works can be found in the [spec](https://spec.matrix.org/v1.3/server-server-api/#resolving-server-names).

Delegation allows you to specify the server name and port that your Matrix.org installation is reachable at, or to host the Matrix.org server at a different server name to the domain that is being delegated.

For example, if your Matrix.Org server installation is actually reachable at matrix.example.com port 8448, you will be able to delegate from example.com to matrix.example.com so that your users will have @user:example.com user names instead of @user:matrix.example.com usernames.

Delegation can be performed in one of two ways:

    Well-known delegation (preferred): A well-known text file is served over HTTPS on the domain name that you want to use, pointing to your server on matrix.example.com port 8448;
    DNS SRV delegation (not recommended): See the SRV delegation section below for details.


Using well-known delegation requires that you are running a web server at example.com which is listening on the standard HTTPS port TCP/443.

Assuming that your Matrix.org installation is listening for HTTPS connections at matrix.example.com on port 8448, the delegation file must be served at https://example.com/.well-known/matrix/server and contain the following JSON document:

```json
{
    "m.server": "matrix.example.com:8448"
}
```


## License

Apache 2.0

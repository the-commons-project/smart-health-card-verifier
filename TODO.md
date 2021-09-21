# List of TODOs

1. Add tests
2. Add linter
3. Store responses from API calls in local storage (data won't be updated often)
4. Add pre-push to main hook to check if version in app.json was updated
5. Add decision tree diagram
6. We pull issuer keys from `${issuerURL}/.well-known/jwks.json`.
   How do we check that `issuerURL` actually belongs to the issuer?
7. Complete code refactoring -> code looks scrappy, use [styleguide](https://gitlab.com/affinidi/coding-styleguide) for reference:

- Use logger, instead of console.log
- Proper error handling instead of console.log or SERVER_ERROR
- Implement JWK certificate chain validation (commented out)

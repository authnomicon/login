# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- `GET /login` handler checks if `module:@authnomicon/credentials.PasswordStore`
interface is implemented prior to redirecting to `/login/password`.  If not, the
original render error is propagated.
- Moved `login/http/prompt`, and associated files, to `prompt`.
- Moved `login/http/service`, and associated files, to `service`.

### Removed
- Removed `/signup` endpoint.  Moved to [`@authnomicon/signup`](https://github.com/authnomicon/signup).
- Removed logout prompt.  Moved to [`@authnomicon/logout`](https://github.com/authnomicon/logout).

### Fixed
- `GET /login` handler correctly checks if `module:@authnomicon/login.IdentifierRouter`
interface is implemented before redirecting to `/login/password`.

## [0.0.6] - 2024-01-12
### Added
- Exposed `password/prompt` component which implements `http://i.authnomicon.org/prompts/http/Prompt`,
for decoupling password prompts from underlying HTTP semantics.

### Changed
- `IdentifierRouter` component now accepts `identifier, cb` arguments and
invokes `cb` with `err, prompt, options`, decoupling it from underlying HTTP
semantics.
- Moved `login/password/http/service`, and associated files, to `password/service`.
- Moved `login/identifier/http/service`, and associated files, to `identifier/service`.

### Fixed
- No longer double-calling `req#login()` when authenticating with a username and password.

## [0.0.5] - 2023-11-27
### Removed
- Removed `/logout` endpoint.  Moved to [`@authnomicon/logout`](https://github.com/authnomicon/logout).

## [0.0.4] - 2023-10-20

TODO: Review this for accuracy.

### Added
- Added `/signup` endpoint.  Moved from [`@authnomicon/account`](https://github.com/authnomicon/account).
- Added `/account/select` endpoint.  Moved from [`@authnomicon/account`](https://github.com/authnomicon/account).
- Added login prompt.  Moved from [`@authnomicon/prompts`](https://github.com/authnomicon/prompts).
- Added logout prompt.  Moved from [`@authnomicon/prompts`](https://github.com/authnomicon/prompts).
- Added select-account prompt.  Moved from [`@authnomicon/prompts`](https://github.com/authnomicon/prompts).

### Changed
- Moved `http/service`, and associated files, to `login/http/service`.
- Moved `identifier/http/service`, and associated files, to `login/identifier/http/service`.
- Moved `password/http/service`, and associated files, to `login/password/http/service`.
- `/logout` endpoint moved to distinct service named `logout/http/service`.

## [0.0.3] - 2021-12-02
### Added
- Added `/logout` endpoint.

## [0.0.2] - 2021-11-18
### Changed

- If a `login` view is not found, `/login` endpoint will redirect to
`/login/identifier` if an `IdentifierRouter` component is available, otherwise
it will redirect to `/login/password` as before.

## [0.0.1] - 2021-10-21

- Initial release.

[Unreleased]: https://github.com/authnomicon/login/compare/v0.0.6...HEAD
[0.0.6]: https://github.com/authnomicon/login/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/authnomicon/login/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/authnomicon/login/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/authnomicon/login/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/authnomicon/login/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/authnomicon/login/releases/tag/v0.0.1

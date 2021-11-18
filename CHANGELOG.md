# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed

- If a `login` view is not found, `/login` endpoint will redirect to
`/login/identifier` if an `IdentifierRouter` component is available, otherwise
it will redirect to `/login/password` as before.

## [0.0.1] - 2021-10-21

- Initial release.

[Unreleased]: https://github.com/authnomicon/login/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/authnomicon/login/releases/tag/v0.0.1

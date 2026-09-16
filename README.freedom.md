# Freedom LLP fork of `in-app-purchase`

Fork of [voltrue2/in-app-purchase](https://github.com/voltrue2/in-app-purchase),
based on the unmodified **1.11.4** release from npm (first commit in this repo).

## Why this fork exists

Battle of Geniuses needs two things upstream does not provide:

1. **Mac App Store receipts.** Unity reports them with `Store: "MacAppStore"`,
   which upstream does not recognise at all, so a Mac purchase fails to validate.
2. **A "could not reach the store" status.** Upstream reports a transport failure
   and a genuinely bad receipt as the same `FAILURE`. Our purchase flow must tell
   them apart: the client destroys the pending purchase when the server says the
   receipt is invalid, so a network blip reported as `FAILURE` silently loses a
   purchase the player paid for.

## What is changed

All changes live in a single commit on top of the upstream import.

- `constants.js`
  - `UNITY.APPLE_MAC = 'MacAppStore'`
  - `VALIDATION.SERVER_ISSUE = 3`
- `index.js` — `MacAppStore` receipts are recognised and routed to Apple.
- `lib/apple.js`
  - a transport error, or Apple's own 21005 ("receipt server unavailable"),
    reports `SERVER_ISSUE` instead of an unknown-status `1`
  - every `validatedData` carries `service: 'apple'`
- `lib/google.js`
  - HTTP 4xx stays `FAILURE`; HTTP 5xx reports `SERVER_ISSUE`
  - error payloads carry `service: 'google'`

## History

This replaces `ykolomiets/in-app-purchase#develop`, which carried the same two
features on top of **1.8.9** (2018) and was abandoned. That fork also called the
`androidpublisher/v2` Play API, which Google has since retired — it answers 404,
and the library turns any HTTP >= 399 into a validation failure, so with Play
Developer API credentials configured *every* Android purchase was rejected.
Upstream 1.11.4 uses `v3`.

The old fork had additionally removed Apple's production-then-sandbox retry, so
a sandbox receipt sent to production (status 21007) surfaced as a hard error —
which is exactly what App Review does when testing in-app purchases. Upstream's
retry is intentionally kept here.

## Updating

Rebase the feature commit onto a newer upstream import; keep the upstream import
unmodified so the delta stays reviewable.

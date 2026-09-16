'use strict';

// services
exports.SERVICES = {
	UNITY: 'unity',
	APPLE: 'apple',
	GOOGLE: 'google',
	WINDOWS: 'windows',
	AMAZON: 'amazon',
	ROKU: 'roku'
};

exports.UNITY = {
	APPLE: 'AppleAppStore',
	APPLE_MAC: 'MacAppStore',
	GOOGLE: 'GooglePlay',
	AMAZON: 'AmazonApps'
};

// validation
exports.VALIDATION = {
	SUCCESS: 0,
	FAILURE: 1,
	POSSIBLE_HACK: 2,
	// The store could not be reached or answered with a server-side failure. Distinct from
	// FAILURE on purpose: a caller must be able to tell "this receipt is bad" (do not retry,
	// the purchase is void) from "we could not ask" (retry, the purchase may well be valid).
	SERVER_ISSUE: 3
};

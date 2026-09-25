# Functional Design Clarification: Input Limits

The approved security baseline requires explicit length and request-size limits. Choose the initial bounds for the public create endpoint.

## Clarification 1: Destination URL and JSON body limits

A) Maximum destination URL length: 2,048 characters; maximum JSON request body: 4 KiB (recommended for a compact URL-shortener API)

B) Maximum destination URL length: 4,096 characters; maximum JSON request body: 8 KiB

X) Other (describe both the maximum URL length and request-body size)

[Answer]: A

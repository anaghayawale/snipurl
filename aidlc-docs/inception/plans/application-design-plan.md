# Application Design Plan

## Objective

Define the high-level components, interfaces, services, and dependency relationships for the Node.js, TypeScript, and Express URL-shortener API. Detailed business rules remain deferred to Functional Design.

## Questions

## Question 1: Application organization

Which component organization should the design use?

A) Small modular design: separate HTTP routes, validation, link service, in-memory repository, code generator, and error/rate-limit middleware (recommended for maintainability and tests)

B) Compact design: most behavior in one Express application module with a small helper layer

X) Other (describe the preferred organization)

[Answer]: B

## Question 2: Initial rate-limit policy

What default public API limit should the design target?

A) 100 requests per IP address per 15 minutes across all endpoints (recommended for an initial public service)

B) 60 requests per IP address per minute across all endpoints

C) 30 create requests per IP address per 15 minutes, with 100 redirect or metadata requests per IP address per 15 minutes

X) Other (describe the desired limit)

[Answer]: A

## Execution Checklist

- [x] Analyze approved requirements, stories, and enabled security constraints.
- [x] Identify candidate components, services, and dependencies.
- [x] Create this application-design plan with design questions.
- [x] Validate all answers and resolve ambiguities.
- [x] Generate `components.md` with high-level responsibilities and interfaces.
- [x] Generate `component-methods.md` with type-level method signatures.
- [x] Generate `services.md` with orchestration responsibilities.
- [x] Generate `component-dependency.md` with dependency relationships and a validated data-flow diagram.
- [x] Generate `application-design.md` as a consolidated summary.
- [x] Validate design completeness, consistency, and applicable security rules.
- [x] Update state tracking and README.
- [ ] Obtain explicit approval of the application design.

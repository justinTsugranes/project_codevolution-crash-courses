# Notes

In its most basic form, JavaScript is a synchronous, blocking, single-threaded lanauge.

Synchronous

- Code executes from the top down, with only one line executing at any given time.

Blocking

- No matter how long a previous previous takes, the subsequent processes won't begin until the former is completed.
- If function A has to execute an intensive chunk of code, JavaScript has to finish that function before moving on to function B, regardless of the time it takes to complete.

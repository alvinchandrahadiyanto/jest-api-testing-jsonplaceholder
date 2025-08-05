# What is JEST
This is my first automation code in JEST. This test for web https://jsonplaceholder.typicode.com/

## To run these tests, you'll first need to install Jest and Axios:
```npm install jest axios```

### 1. jest: The Testing Framework
Jest is the core tool that runs your tests. It provides the functions and structure you use to write tests, such as:
describe(): A function for grouping related tests together.
test() or it(): A function for defining a single test case.
expect(): A function that lets you make "assertions" (checks) about your code's behavior. For example, expect(response.status).toBe(200) is an assertion.

### 2. axios: The HTTP Client
axios is a library that makes it easy to send HTTP requests. Your tests need to make actual network calls to the API endpoints to see if they work correctly.
axios.get(): Sends a GET request.
axios.post(): Sends a POST request.
axios.put(): Sends a PUT request.

** In short, you can think of it like this: **
Jest  | Axios
------------- | -------------
is the driver that runs the whole show and tells you the results.  | Axios is the engine that makes the actual API calls for the driver.


## Run the tests
```npx jest api.test.js```
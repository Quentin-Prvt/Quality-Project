# Amazon Testing with Playwright

This project is focused on performing a series of 10 automated tests on the Amazon website using Playwright. The goal is to verify the quality and robustness of Amazon’s user interface by simulating various user interactions and validating expected outcomes as part of a software development quality assurance process.

# 📁 Project Structure

- tests/: Contains all test scripts for the specified functionalities on Amazon.
- playwright.config.ts: Configuration file for Playwright, where browser settings and test runner options are defined.

# 🛠️ Getting Started

Prerequisites

- Node.js (v14 or higher)
- Playwright
- Git

Installation

1. Clone the repository:

```
git clone https://github.com/your-username/amazon-playwright-tests.git
cd amazon-playwright-tests
```

2. Install dependencies:

```
npm install
```


3. Install Playwright browsers:

```
npx playwright install
```



Running Tests

To execute all tests and view the results in the Playwright UI, use:

```
npx playwright test --ui
```

Viewing Test Results

After the tests complete, a summary will display in the terminal. Detailed results, including screenshots and videos, are available in the results/ directory.

# ✅ Test Scenarios

The project includes the following 10 test scenarios for Amazon:

- Home Page Load: Verifies that the homepage loads correctly with no missing elements.
- Search Functionality: Ensures that searching for a product returns relevant results.
- Filter Results: Applies filters (e.g., price range, brand) on search results and verifies they are correctly applied.
- Product Page Details: Confirms that product details (title, price, description) are displayed accurately on the product page.
- Add to Cart: Tests adding a product to the cart and checks if it appears in the cart with correct details.
- Remove from Cart: Verifies that removing a product from the cart updates the cart contents as expected.
- Checkout Process: Simulates proceeding through the checkout steps and ensures each step functions correctly.
- Login Functionality: Tests the login process with valid and invalid credentials to confirm correct access and error handling.
- Wishlist Addition: Adds a product to the wishlist and verifies it appears there.
- Logout Functionality: Ensures that logging out works and the user is redirected to the appropriate page.

Temporary test list, subject to change

© STORDEUR Théo - DANEL Théo - DE POORTER Maxence - FORDELONE Marco - PRUVOT Quentin ©

# Amazon Testing with Playwright

This project is focused on performing a series of 13 automated tests on the Amazon website using Playwright. The goal is to verify the quality and robustness of Amazon’s user interface by simulating various user interactions and validating expected outcomes as part of a software development quality assurance process.

# 📁 Project Structure

- tests/: Contains all test scripts for the specified functionalities on Amazon.
- playwright.config.ts: Configuration file for Playwright, where browser settings and test runner options are defined.

# Gherkin 
Google doc link : https://docs.google.com/document/d/1MuP5eP_QDthOQ7gEQG7cAMu3Usk6mqIY9twL-9KBi_A/edit?usp=sharing


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

# ✅ Test Scenarios

The project includes the following 10 test scenarios for Amazon:

Search Functionality: Confirm that the search's function works
- Keyword search displays products matching the entered term.
- Category search navigates through categories and shows products under the selected category.

Product Page Details: Confirms that product details are displayed accurately on the product page, including:
- Title: Ensures the product title is displayed and not empty.
- Price: Checks that the product price is visible and correctly formatted.
- Description: Verifies that the product description is shown and contains relevant information.
- Review Count: Confirms that the review count is displayed and is a valid number (zero or more).

Cart Manipulation: Confirm that cart's function works.
- Add to Cart: The item appears in the cart with the correct quantity and details after adding.
- Remove from Cart: The item is no longer in the cart after removal.
- Modify Quantity in Cart: The item quantity change in the cart after modifying

Login Functionality: Confirm that the login process works.
- Sign in with good password: The user access to the captcha to validate his connection
- Sign in with bad password: The user get an error 

Register Functionality: Confirm that the register process works.
- Register with good credentials (if email already used, it retry)

Buy functionnality: Confirm that the buy function work
- Buy an item until we need to login (no checkout)


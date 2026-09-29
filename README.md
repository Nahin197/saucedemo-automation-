# 🧪 SauceDemo Automation Testing

> End-to-end automated test suite for [saucedemo.com](https://www.saucedemo.com/) built with **Playwright** and **JavaScript**, following the **Page Object Model (POM)** design pattern. Integrated with **Allure** and **Playwright HTML** reporting.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Test Scenarios](#-test-scenarios)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running Tests](#-running-tests)
- [Generating Reports](#-generating-reports)
- [Run Tests + Auto Generate Report](#-run-tests--auto-generate-report)
- [Demo Video](#-demo-video)

---

## 📌 Project Overview

This project automates key user journeys on the SauceDemo e-commerce website as part of an **Automation Testing Assessment**. It covers login validation, full purchase flows, cart verification, price calculation, and logout — all structured using the **Page Object Model** for maintainability and scalability.

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | Browser automation framework |
| JavaScript (ES6+) | Test scripting language |
| Page Object Model (POM) | Design pattern for test maintainability |
| [Allure Playwright](https://www.npmjs.com/package/allure-playwright) | Rich test reporting |
| Playwright HTML Reporter | Built-in test report viewer |
| Node.js | Runtime environment |

---

## 📁 Project Structure

```
sauce-demo/
│
├── pages/                        # Page Object Model classes
│   ├── LoginPage.js              # Login page actions & locators
│   ├── ProductPage.js            # Product listing, menu, cart actions
│   ├── CartPage.js               # Cart page actions & locators
│   ├── CartOverViewPage.js       # Checkout overview verifications
│   ├── CheckoutInfoPage.js       # Shipping info form actions
│   └── checkoutCompletePage.js  # Order success page actions
│
├── tests/                        # Test spec files
│   ├── test1.spec.js             # Q1: Locked-out user login error
│   ├── test2.spec.js             # Q2: Standard user full purchase flow
│   └── test3.spec.js             # Q3: Performance glitch user purchase flow
│
├── allure-results/               # Raw Allure test result data
├── allure-report/                # Generated Allure HTML report
├── playwright-report/            # Playwright built-in HTML report
├── playwright.config.js          # Playwright configuration
└── package.json                  # Project dependencies & scripts
```

---

## ✅ Test Scenarios

### 🔴 Q1 — Locked Out User Login Validation [`test1.spec.js`]

- Navigate to [saucedemo.com](https://www.saucedemo.com/)
- Attempt login with `locked_out_user` / `secret_sauce`
- **Verify** error message: *"Epic sadface: Sorry, this user has been locked out."*

---

### 🟡 Q2 — Standard User Full Purchase Journey [`test2.spec.js`]

- Login with `standard_user` / `secret_sauce`
- Reset App State via hamburger menu
- Add **3 items** to the cart: `Sauce Labs Backpack`, `Sauce Labs Bolt T-Shirt`, `Sauce Labs Onesie`
- Navigate to Cart and **verify** product names and total price (`$53.97`)
- Proceed to Checkout, fill in shipping information
- On Checkout Overview, **verify** product names, subtotal, tax, and grand total
- Finish the purchase and **verify** success message: *"Thank you for your order!"*
- Reset App State and log out

---

### 🟢 Q3 — Performance Glitch User Purchase Journey [`test3.spec.js`]

- Login with `performance_glitch_user` / `secret_sauce`
- Reset App State via hamburger menu
- Sort products by **Name (Z to A)**
- Add the **first product** (`Test.allTheThings() T-Shirt (Red)`) to the cart
- Proceed to Checkout, fill in shipping information
- On Checkout Overview, **verify** product name, subtotal, tax, and grand total
- Finish the purchase and **verify** success message: *"Thank you for your order!"*
- Reset App State and log out

---

## ⚙️ Prerequisites

Ensure the following are installed on your machine:

- **Node.js** v18 or higher → [Download](https://nodejs.org/)
- **npm** (comes bundled with Node.js)
- **Java JDK** (required by Allure CLI) → [Download](https://www.oracle.com/java/technologies/downloads/)

Verify your installations:

```bash
node --version
npm --version
java --version
```

---

## 📦 Installation

**1. Clone the repository:**

```bash
git clone https://github.com/Nahin197/saucedemo-automation-.git
cd saucedemo-automation-
```

**2. Install project dependencies:**

```bash
npm install
```

**3. Install Playwright browsers:**

```bash
npx playwright install
```

**4. Install Allure CLI globally:**

```bash
npm install -g allure-commandline
```

---

## ▶️ Running Tests

### Run Individual Tests

Run each scenario separately in headed (visible browser) mode:

```bash
# Q1 — Locked-out user login error
npx playwright test tests/test1.spec.js --project=chromium --headed

# Q2 — Standard user full purchase flow
npx playwright test tests/test2.spec.js --project=chromium --headed

# Q3 — Performance glitch user purchase flow
npx playwright test tests/test3.spec.js --project=chromium --headed
```

---

### Run All Tests Sequentially

Run all 3 test files one after another in a fixed order:

```bash
npx playwright test tests/test1.spec.js tests/test2.spec.js tests/test3.spec.js --project=chromium --headed --workers=1
```

> `--workers=1` forces sequential execution — one test at a time.

---

### Run All Tests in Parallel

Run all 3 test files simultaneously for faster execution:

```bash
npx playwright test tests/test1.spec.js tests/test2.spec.js tests/test3.spec.js --project=chromium --workers=3
```

> `--workers=3` spawns 3 browser instances running each file at the same time.

---

## 📊 Generating Reports

### Allure Report

After running tests, generate and open the Allure report:

```bash
npx allure generate allure-results --clean && npx allure open allure-report
```

Or use the npm shortcut:

```bash
npm run getreport
```

### Playwright HTML Report

Playwright auto-generates an HTML report after every run. Open it with:

```bash
npx playwright show-report
```

---

## 🚀 Run Tests + Auto Generate Report

These one-liner commands run tests and **automatically open the Allure report** on completion:

```bash
# Q1 only + report
npx playwright test tests/test1.spec.js --project=chromium --headed && npx allure generate allure-results --clean && npx allure open allure-report

# Q2 only + report
npx playwright test tests/test2.spec.js --project=chromium --headed && npx allure generate allure-results --clean && npx allure open allure-report

# Q3 only + report
npx playwright test tests/test3.spec.js --project=chromium --headed && npx allure generate allure-results --clean && npx allure open allure-report

# All tests sequentially + report
npx playwright test tests/test1.spec.js tests/test2.spec.js tests/test3.spec.js --project=chromium --headed --workers=1 && npx allure generate allure-results --clean && npx allure open allure-report

# All tests in parallel + report
npx playwright test tests/test1.spec.js tests/test2.spec.js tests/test3.spec.js --project=chromium --workers=3 && npx allure generate allure-results --clean && npx allure open allure-report
```

> The `&&` operator ensures the report is only generated **after all tests have finished**.

---

## 🎥 Demo Video

Watch a full walkthrough of all 3 test scenarios:

👉 [Watch Demo Video on Google Drive](https://drive.google.com/file/d/1puzDmvpXpNGmL6uKYlp-QQ5gm_21gTtd/view?usp=drive_link)

---

## 👤 Author

**Nahin Islam**  
SQA Engineer | Automation Enthusiast  
GitHub: [@Nahin197](https://github.com/Nahin197)

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


## 🎥 All 3 Testing Video

Watch a full walkthrough of all 3 test scenarios:

👉 [Watch Demo Video on Google Drive](https://drive.google.com/file/d/1puzDmvpXpNGmL6uKYlp-QQ5gm_21gTtd/view?usp=drive_link)

---

## 👤 Author

**Md. Khademul Islam Nahin**  
 Aspiring SQA Engineer | Automation Enthusiast  
GitHub: [@Nahin197](https://github.com/Nahin197)

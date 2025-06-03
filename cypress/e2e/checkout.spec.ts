import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { checkout } from '../support/pageObjects/checkout_po';
import { signUp } from '../support/pageObjects/signUp_po';

// Mobile View Port
beforeEach(() => {
  cy.viewport('iphone-x');
});

Given('User navigates to the Automation Exercise page', () => {
  cy.visit('/');
});

When('User clicks on the Products link', () => {
  checkout.clickOnProductsLink();
});

Then('User clicks on the View Product link for the third item', () => {
  checkout.clickOnViewProductLink();
});

When('User enters the quantity for the selected item', () => {
  checkout.enterRandomQuantity();
});

When('User clicks on the Add to cart button', () => {
  checkout.clickOnAddToCartButton();
});

When('User clicks on the View Cart link', () => {
  checkout.clickOnViewCartLink();
});

When('User clicks on the Proceed To Checkout button', () => {
  checkout.clickOnProceedToCheckoutButton();
});

Then('User clicks on the Register Login link', () => {
  checkout.clickOnRegisterLoginLink();
});

When('User enters Full Name and Email', () => {
  signUp.enterNameAndEmail();
});

When('User clicks on Signup button', () => {
  signUp.clickOnSignUpButton();
});

Then('User completes Sign Up mandatory info', () => {
  signUp.enterSignUpMandatoryInfo();
});

When('User clicks on the Create Account button', () => {
  signUp.clickOnCreateAccountButton();
});

Then('User should land on the Account Created page', () => {
  cy.fixture('signUp').then((data) => {
    signUp.verifyLandingPage(data.accountCreatedConfirmationTitle);
  });
});

When('User clicks on the Continue button', () => {
  signUp.clickOnContinueButton();
});

Then('User should land on the Home Page and be logged in successfully', () => {
  signUp.verifyUserIsLoggedIn();
});

When('User clicks on the Cart icon', () => {
  checkout.clickOnCartIcon();
});

Then('User reviews that total amount to be paid is correct', () => {
  checkout.verifyTotalIsCorrect();
});

Then('User should land on the Review Your Order page', () => {
  cy.fixture('checkout').then((data) => {
    signUp.verifyLandingPage(data.reviewYourOrderTitle);
  });
});

When('User clicks on the Place Order button', () => {
  checkout.clickOnPlaceOrderButton();
});

Then('User completes Payment mandatory info', () => {
  checkout.enterPaymentMandatoryInfo();
});

When('User clicks on the Pay and Confirm Order button', () => {
  checkout.clickOnPayAndConfirmOrderButton();
});

Then('User should land on the Order Placed page', () => {
  cy.fixture('checkout').then((data) => {
    signUp.verifyLandingPage(data.orderConfirmationMsg);
  });
});

When('User clicks on the Logout button', () => {
  checkout.clickOnLogOutLink();
});

Then('User should land on the Login Sign Up page', () => {
  cy.fixture('checkout').then((data) => {
    signUp.verifyLandingPage(data.loginPageTitle);
  });
});

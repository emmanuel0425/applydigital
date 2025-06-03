import { SignUp } from '../locators/signUp';
import { faker } from '@faker-js/faker';

class SignUpPO {
  /**
   * @description Enter name and email address.
   * @author Emmanuel
   */
  enterNameAndEmail(): void {
    cy.get(SignUp.SIGN_UP_NAME_TEXTBOX).should('be.visible').type(faker.person.firstName());
    cy.get(SignUp.SIGN_UP_EMAIL_TEXTBOX).should('be.visible').type(faker.internet.email());
  }

  /**
   * @description Click on Signup button.
   * @author Emmanuel
   */
  clickOnSignUpButton(): void {
    cy.get(SignUp.SIGN_UP_BUTTON).should('be.visible').click();
  }

  /**
   * @description Fill out mandatory info to complete Sign Up.
   * @author Emmanuel
   */
  enterSignUpMandatoryInfo(): void {
    cy.get(SignUp.PASSWORD_TEXTBOX).should('be.visible').type(faker.internet.password());
    cy.get(SignUp.FIRST_NAME_TEXBOX).should('be.visible').type(faker.person.firstName());
    cy.get(SignUp.LAST_NAME_TEXTBOX).should('be.visible').type(faker.person.lastName());
    cy.get(SignUp.ADDRESS_TEXTBOX).should('be.visible').type(faker.location.streetAddress());
    // Pass dropdown option from fixture file
    cy.fixture('signUp').then((data) => {
      cy.get(SignUp.COUNTRY_DROPDOWN)
        .select(data.listOfCountries[1])
        .should('have.value', 'United States');
    });
    cy.get(SignUp.STATE_TEXTBOX).should('be.visible').type(faker.location.state());
    cy.get(SignUp.CITY_TEXTBOX).should('be.visible').type(faker.location.city());
    cy.get(SignUp.ZIPCODE_TEXTBOX).should('be.visible').type(faker.location.zipCode());
    cy.get(SignUp.MOBILE_TEXTBOX).should('be.visible').type(faker.phone.number());
  }

  /**
   * @description Click on Create Account button.
   * @author Emmanuel
   */
  clickOnCreateAccountButton(): void {
    cy.intercept('POST', 'https://automationexercise.com/signup').as('signUp');

    cy.get(SignUp.CREATE_ACCOUNT_BUTTON).should('be.visible').click();

    // Wait for request and work with payload
    cy.wait('@signUp', { timeout: 10000 }).then((interception) => {
      console.log(interception.request.body);

      // interceptionrequest.body will contain the URL-encoded string
      const formBody = interception.request.body;

      // Parse it with URLSearchParams
      const params = new URLSearchParams(formBody);

      // Map name sent in the payload and store in a variable
      const name: string = params.get('name');

      // Store the value of data property globally for assertion
      cy.setState('name', name);
    });
  }

  /**
   * @description Verify user lands on correct page.
   * @param landingPage Name of element to be visible on page
   * @author Emmanuel
   */
  verifyLandingPage(landingPage: string): void {
    cy.contains(landingPage).should('be.visible');
  }

  /**
   * @description Click on Continue button.
   * @author Emmanuel
   */
  clickOnContinueButton(): void {
    cy.get(SignUp.CONTINUE_BUTTON).should('be.visible').click();
  }

  /**
   * @description Verify user is now logged in.
   * @author Emmanuel
   */
  verifyUserIsLoggedIn(): void {
    // Access the name variable stored with setState function to assert user was logged in successfully after Sign Up
    cy.getState().then((signUp: any) => {
      cy.contains(`Logged in as ${signUp.name}`).should('be.visible');
    });
  }
}

export const signUp: SignUpPO = new SignUpPO();

import { SignUp } from '../locators/signUp';
import { globalPO } from './global_po';
import { faker } from '@faker-js/faker';
import { UserFormData } from '../data/userDataFactory';
class SignUpPO {
  userData: UserFormData;

  constructor() {
    this.userData = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      streetAddress: '',
      state: '',
      zipCode: '',
      city: '',
    };
  }

  /**
   * @description Generate fake but valid user data for form submission.
   * @author Emmanuel
   */
  generateFakeUserData(): void {
    this.userData.firstName = faker.person.firstName();
    this.userData.lastName = faker.person.lastName();
    this.userData.email = faker.internet.email();
    this.userData.password = faker.internet.password({ prefix: '@1' });
    this.userData.phoneNumber = faker.phone.number({ style: 'international' });
    this.userData.streetAddress = faker.location.streetAddress();
    this.userData.state = faker.location.state();
    this.userData.zipCode = faker.location.zipCode();
    this.userData.city = faker.location.city();
  }

  /**
   * @description Enter name and email address.
   * @author Emmanuel
   */
  enterNameAndEmail(): void {
    this.generateFakeUserData();

    globalPO.typeIntoField(SignUp.SIGN_UP_NAME_TEXTBOX, this.userData.firstName);
    globalPO.typeIntoField(SignUp.SIGN_UP_EMAIL_TEXTBOX, this.userData.email);
  }

  /**
   * @description Click on Signup button.
   * @author Emmanuel
   */
  clickOnSignUpButton(): void {
    globalPO.clickOnElement(SignUp.SIGN_UP_BUTTON);
  }

  /**
   * @description Fill out mandatory info to complete Sign Up.
   * @param country Name of country to be selected.
   * @author Emmanuel
   */
  enterSignUpMandatoryInfo(country: string): void {
    globalPO.typeIntoField(SignUp.PASSWORD_TEXTBOX, this.userData.password);
    globalPO.typeIntoField(SignUp.FIRST_NAME_TEXBOX, this.userData.firstName);
    globalPO.typeIntoField(SignUp.LAST_NAME_TEXTBOX, this.userData.lastName);
    globalPO.typeIntoField(SignUp.ADDRESS_TEXTBOX, this.userData.streetAddress);
    // Pass dropdown option from fixture file
    cy.fixture('signUp').then((data) => {
      const countryName = data.listOfCountries.find((c: string) => c === country);
      cy.get(SignUp.COUNTRY_DROPDOWN).select(countryName).should('have.value', country);
    });
    globalPO.typeIntoField(SignUp.STATE_TEXTBOX, this.userData.state);
    globalPO.typeIntoField(SignUp.CITY_TEXTBOX, this.userData.city);
    globalPO.typeIntoField(SignUp.ZIPCODE_TEXTBOX, this.userData.zipCode);
    globalPO.typeIntoField(SignUp.MOBILE_TEXTBOX, this.userData.phoneNumber);
  }

  /**
   * @description Click on Create Account button.
   * @author Emmanuel
   */
  clickOnCreateAccountButton(): void {
    cy.intercept('POST', 'https://automationexercise.com/signup').as('signUp');

    globalPO.clickOnElement(SignUp.CREATE_ACCOUNT_BUTTON);

    // Wait for request and work with payload
    cy.wait('@signUp', { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(302);
      // interception.request.body will contain the URL-encoded string
      const formBody = interception.request.body;

      // Parse it with URLSearchParams
      const params = new URLSearchParams(formBody);

      // Map name sent in the payload and store in a variable
      const name: string = params.get('name');

      // Store the value of 'name' property globally for assertion
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
    globalPO.clickOnElement(SignUp.CONTINUE_BUTTON);
  }

  /**
   * @description Verify user is now logged in.
   * @author Emmanuel
   */
  verifyUserIsLoggedIn(): void {
    // Access the 'name' variable stored with setState function to assert user was logged in successfully after Sign Up
    cy.getState().then((signUp: any) => {
      cy.contains(`Logged in as ${signUp.name}`).should('be.visible');
    });
  }
}

export const signUp: SignUpPO = new SignUpPO();

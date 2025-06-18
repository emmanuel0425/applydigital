import { Checkout } from '../locators/checkout';
import { faker } from '@faker-js/faker';
import { globalPO } from './global_po';
import { CardInfo } from '../data/userDataFactory';

class CheckoutPO {
  randomQuantity: string;
  cardInfo: CardInfo;

  constructor() {
    // Properties to store form data for validation
    this.cardInfo = {
      fullName: '',
      creditCardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvc: '',
    };
    this.randomQuantity = '';
  }

  /**
   * @description Generate fake but valid user data for form submission.
   * @author Emmanuel
   */
  generateFakeUserData(): void {
    this.randomQuantity = faker.number.int({ min: 1, max: 20 }).toString();
    this.cardInfo.fullName = faker.person.fullName().replace(/[^a-zA-Z0-9 ]/g, '');
    this.cardInfo.creditCardNumber = faker.finance.creditCardNumber('63[7-9]#-####-####-###L');
    this.cardInfo.expiryMonth = faker.number.int({ min: 10, max: 12 }).toString();
    this.cardInfo.expiryYear = this.getRandomYear().toString();
    this.cardInfo.cvc = faker.finance.creditCardCVV();
  }

  /**
   * @description Click on Products link.
   * @author Emmanuel
   */
  clickOnProductsLink(): void {
    globalPO.clickOnElementByLocatorAndText(Checkout.NAV_DIV, Checkout.PRODUCTS_LINK);
  }

  /**
   * @description Click on View Product link.
   * @author Emmanuel
   */
  clickOnViewProductLink(): void {
    globalPO.clickOnElementByLocatorAndText(Checkout.PRODUCT_LIST_DIV, Checkout.VIEW_PRODUCT_LINK);
  }

  /**
   * @description Enter random quantity for an item between 1 - 20.
   * @author Emmanuel
   */
  enterRandomQuantity(): void {
    this.generateFakeUserData();
    globalPO.typeIntoField(Checkout.ITEM_QUANTITY_TEXTBOX, this.randomQuantity);
  }

  /**
   * @description Click on Add to cart button.
   * @author Emmanuel
   */
  clickOnAddToCartButton(): void {
    globalPO.clickOnElementByText(Checkout.ADD_TO_CART_BUTTON);
  }

  /**
   * @description Click on View Cart link.
   * @author Emmanuel
   */
  clickOnViewCartLink(): void {
    cy.get(Checkout.MODAL_DIV).within(() => {
      globalPO.clickOnElementByText(Checkout.VIEW_CART_LINK);
    });
  }

  /**
   * @description Click on Proceed To Checkout button.
   * @author Emmanuel
   */
  clickOnProceedToCheckoutButton(): void {
    globalPO.clickOnElementByText(Checkout.PROCEED_TO_CHECKOUT_BUTTON);
  }

  /**
   * @description Click on Register / Login link.
   * @author Emmanuel
   */
  clickOnRegisterLoginLink(): void {
    cy.get(Checkout.MODAL_DIV).within(() => {
      cy.contains('a[href="/login"]', Checkout.REGISTER_LOGIN_LINK).should('be.visible').click();
    });
  }

  /**
   * @description Click on the Cart icon.
   * @author Emmanuel
   */
  clickOnCartIcon(): void {
    globalPO.clickOnElementByLocatorAndText(Checkout.NAV_DIV, Checkout.CART_LINK);
  }

  /**
   * @description Verify item's price multiplied by item's quantity is correct.
   * @author Emmanuel
   */
  verifyTotalIsCorrect(): void {
    cy.get(Checkout.CART_PRICE).as('price');
    cy.get(Checkout.CART_QUANTITY).as('quantity');
    cy.get(Checkout.CART_TOTAL).as('total');

    cy.get('@price')
      .invoke('text')
      .then((priceText) => {
        const price = parseFloat(priceText.replace('Rs. ', ''));
        cy.get('@quantity')
          .invoke('text')
          .then((quantityText) => {
            const quantity = parseFloat(quantityText);
            cy.get('@total')
              .invoke('text')
              .then((totalText) => {
                const total = parseFloat(totalText.replace('Rs. ', ''));
                expect(total).to.eq(price * quantity);
              });
          });
      });
  }

  /**
   * @description Click on Place Order button.
   * @author Emmanuel
   */
  clickOnPlaceOrderButton(): void {
    globalPO.clickOnElementByText(Checkout.PLACE_ORDER_BUTTON);
  }

  /**
   * @description Get random year.
   * @author Emmanuel
   */
  getRandomYear(minYear: number = 2026, maxYear: number = 2030): number {
    const start: Date = new Date(`${minYear}-01-01`);
    const end: Date = new Date(`${maxYear}-12-31`);
    const randomDate: Date = faker.date.between({ from: start, to: end });
    return randomDate.getFullYear();
  }

  /**
   * @description Fill out Payment mandatory info.
   * @author Emmanuel
   */
  enterPaymentMandatoryInfo(): void {
    globalPO.typeIntoField(Checkout.NAME_ON_CARD_TEXTBOX, this.cardInfo.fullName);
    globalPO.typeIntoField(Checkout.CARD_NUMBER_TEXTBOX, this.cardInfo.creditCardNumber);
    globalPO.typeIntoField(Checkout.CVC_TEXTBOX, this.cardInfo.cvc);
    globalPO.typeIntoField(Checkout.EXPIRY_MONTH_TEXTBOX, this.cardInfo.expiryMonth);
    globalPO.typeIntoField(Checkout.EXPIRY_YEAR_TEXTBOX, this.cardInfo.expiryYear);
  }

  /**
   * @description Click on Pay and Confirm Order button.
   * @author Emmanuel
   */
  clickOnPayAndConfirmOrderButton(): void {
    globalPO.clickOnElement(Checkout.PAY_BUTTON);
  }

  /**
   * @description Click on Logout link.
   * @author Emmanuel
   */
  clickOnLogOutLink(): void {
    globalPO.clickOnElementByLocatorAndText(Checkout.NAV_DIV, Checkout.LOGOUT_LINK);
  }
}

export const checkout: CheckoutPO = new CheckoutPO();

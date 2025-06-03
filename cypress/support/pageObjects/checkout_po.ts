import { Checkout } from '../locators/checkout';
import { SignUp } from '../locators/signUp';
import { faker } from '@faker-js/faker';

class CheckoutPO {
  /**
   * @description Click on Products link.
   * @author Emmanuel
   */
  clickOnProductsLink(): void {
    cy.get(Checkout.NAV_DIV).contains(Checkout.PRODUCTS_LINK).should('be.visible').click();
  }

  /**
   * @description Click on View Product link.
   * @author Emmanuel
   */
  clickOnViewProductLink(): void {
    cy.get(Checkout.PRODUCT_LIST_DIV)
      .contains(Checkout.VIEW_PRODUCT_LINK)
      .should('be.visible')
      .click();
  }

  /**
   * @description Enter random quantity for an item between 1 - 20.
   * @author Emmanuel
   */
  enterRandomQuantity(): void {
    cy.get(Checkout.ITEM_QUANTITY_TEXTBOX).type(faker.number.int({ min: 1, max: 20 }).toString());
  }

  /**
   * @description Click on Add to cart button.
   * @author Emmanuel
   */
  clickOnAddToCartButton(): void {
    cy.contains(Checkout.ADD_TO_CART_BUTTON).should('be.visible').click();
  }

  /**
   * @description Click on View Cart link.
   * @author Emmanuel
   */
  clickOnViewCartLink(): void {
    cy.get(Checkout.MODAL_DIV).within(() => {
      cy.contains(Checkout.VIEW_CART_LINK).should('be.visible').click();
    });
  }

  /**
   * @description Click on Proceed To Checkout button.
   * @author Emmanuel
   */
  clickOnProceedToCheckoutButton(): void {
    cy.contains(Checkout.PROCEED_TO_CHECKOUT_BUTTON).should('be.visible').click();
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
    cy.get(Checkout.NAV_DIV).contains(Checkout.CART_LINK).should('be.visible').click();
  }

  /**
   * @description Verify item's price multiplied by item's quantity is correct.
   * @author Emmanuel
   */
  verifyTotalIsCorrect(): void {
    cy.get(Checkout.CART_PRICE).then(($el) => {
      // Get item price amount
      const str: string = $el.text();
      const priceStr: string = str.replace('Rs. ', '');
      const price: number = parseFloat(priceStr);
      console.log(price);
      cy.get(Checkout.CART_QUANTITY).then(($el) => {
        // Get item price quantity
        const str: string = $el.text();
        const quantity: number = parseFloat(str);
        console.log(quantity);
        cy.get(Checkout.CART_TOTAL).then(($el) => {
          // Get item total amount
          const str: string = $el.text();
          const totalStr: string = str.replace('Rs. ', '');
          const total: number = parseFloat(totalStr);
          console.log(total);

          // Assert total amount is correct
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
    cy.contains(Checkout.PLACE_ORDER_BUTTON).should('be.visible').click();
  }

  /**
   * @description Get random year.
   * @author Emmanuel
   */
  getRandomYear(minYear = 2026, maxYear = 2030) {
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
    cy.get(Checkout.NAME_ON_CARD_TEXTBOX).should('be.visible').type(faker.person.fullName());
    cy.get(Checkout.CARD_NUMBER_TEXTBOX)
      .should('be.visible')
      .type(faker.finance.creditCardNumber());
    cy.get(Checkout.CVC_TEXTBOX).should('be.visible').type(faker.finance.creditCardCVV());
    cy.get(Checkout.EXPIRY_MONTH_TEXTBOX)
      .should('be.visible')
      .type(faker.number.int({ min: 1, max: 12 }).toString());
    cy.get(Checkout.EXPIRY_YEAR_TEXTBOX).should('be.visible').type(this.getRandomYear().toString());
  }

  /**
   * @description Click on Pay and Confirm Order button.
   * @author Emmanuel
   */
  clickOnPayAndConfirmOrderButton(): void {
    cy.get(Checkout.PAY_BUTTON).should('be.visible').click();
  }

  /**
   * @description Click on Logout link.
   * @author Emmanuel
   */
  clickOnLogOutLink(): void {
    cy.get(Checkout.NAV_DIV).contains(Checkout.LOGOUT_LINK).should('be.visible').click();
  }
}

export const checkout: CheckoutPO = new CheckoutPO();

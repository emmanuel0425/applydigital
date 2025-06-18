class GlobalPO {
  /**
   * @description Click on element.
   * @param selector Selector of element to click on
   * @author Emmanuel
   */
  clickOnElement(selector: string): void {
    cy.get(selector).should('be.visible').click();
  }

  /**
   * @description Type a value into an input field with visibility and value checks.
   * @param selector Selector lo locate
   * @param value Text to be typed into the field
   * @author Emmanuel
   */
  typeIntoField(selector: string, value: string): void {
    cy.get(selector).should('be.visible').clear().type(value).should('have.value', value);
  }

  /**
   * @description Click on element by locator and text.
   * @param selector Selector of element to click on
   * @param text Element content
   * @author Emmanuel
   */
  clickOnElementByLocatorAndText(selector: string, text: string): void {
    cy.get(selector).contains(text).should('be.visible').click();
  }

  /**
   * @description Click on element.
   * @param selector Selector of element to click on
   * @author Emmanuel
   */
  clickOnElementByText(selector: string): void {
    cy.contains(selector).should('be.visible').click();
  }
}

export const globalPO: GlobalPO = new GlobalPO();

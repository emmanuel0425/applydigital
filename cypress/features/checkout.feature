Feature: Checkout

  Scenario: Verify user can complete checkout for an item
    Given User navigates to the Automation Exercise page
    When User clicks on the Products link
    Then User clicks on the View Product link for the third item
    When User enters the quantity for the selected item
    When User clicks on the Add to cart button
    When User clicks on the View Cart link
    When User clicks on the Proceed To Checkout button
    Then User clicks on the Register Login link
    When User enters Full Name and Email
    When User clicks on Signup button
    Then User completes Sign Up mandatory info
    When User clicks on the Create Account button
    Then User should land on the Account Created page
    When User clicks on the Continue button
    Then User should land on the Home Page and be logged in successfully
    When User clicks on the Cart icon
    Then User reviews that total amount to be paid is correct
    When User clicks on the Proceed To Checkout button
    Then User should land on the Review Your Order page
    When User clicks on the Place Order button
    Then User completes Payment mandatory info
    When User clicks on the Pay and Confirm Order button
    Then User should land on the Order Placed page
    When User clicks on the Logout button
    Then User should land on the Login Sign Up page





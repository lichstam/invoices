Feature: Invoices
  Create invoice and add items

  Scenario: Invoice creation
    Given I create 1 of the following invoices
      | clientId     | 123   |
      | userId       | 123   |
      | taxInPercent | 15    |
      | currency     | USD   |
    Then I retrieve that invoice

  Scenario: Fetch all invoices
    Given I create 3 of the following invoices
      | clientId     | 123   |
      | userId       | 123   |
      | taxInPercent | 15    |
      | currency     | USD   |
    Then I retrieve all invoices
    And the total amount is 3

  Scenario: Add items
    Given I create 1 of the following invoices
      | clientId     | 123   |
      | userId       | 123   |
      | taxInPercent | 15    |
      | currency     | USD   |
    When I add the following items to the newly created invoice with term 'Pay now'
      | name | description | 1000 | 1 | 1000 |
      | name | description | 1010 | 1 | 1000 |
      | name | description | 1010 | 1 | 1000 |
    Then I retrieve that invoice that contains a new revision with these new items
    When I add the following items to the newly created invoice with term 'Pay later'
      | name | description | 2000 | 1 | 1000 |
      | name | description | 4010 | 1 | 1000 |
      | name | description | 1010 | 1 | 1000 |
      | name | description | 1010 | 1 | 1000 |
      | name | description | 1010 | 1 | 1000 |
      | name | description | 1010 | 1 | 1000 |
    Then a new revision is created
    And they all contain datestamps
    And the total amount of revisions is 2

  Scenario: Change invoice settings
    Given I create 1 of the following invoices
      | clientId     | 123   |
      | userId       | 123   |
      | taxInPercent | 15    |
      | currency     | USD   |
    When I change the settings to following
      | clientId     | 007 |
      | userId       | xxx |
      | taxInPercent | 25  |
      | currency     | SEK |
    Then I retrieve the invoice with the new settings

  Scenario: Delete invoice
    Given I create 1 of the following invoices
      | clientId     | 123   |
      | userId       | 123   |
      | taxInPercent | 15    |
      | currency     | USD   |
    When I delete the last created invoice
    Then I retrieve 0 invoice

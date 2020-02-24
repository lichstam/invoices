Feature: Client
  Create client

  Scenario: Client creation and fetch
    Given I create a client with the following information
      | name    | Sir Alfred    |
      | street  | oxford street |
      | city    | london        |
      | state   | london state  |
      | country | england       |
      | zipcode | 2323          |
    When I retrieve the client
    Then I receive that client

  Scenario: Client update
    Given I create a client with the following information
      | name    | Sir Alfred    |
      | street  | oxford street |
      | city    | london        |
      | state   | london state  |
      | country | england       |
      | zipcode | 2323          |
    Then I update the client with the following information
      | name    | Foo       |
      | street  | xx street |
      | city    | malmoe    |
      | state   | scania    |
      | country | sweden    |
      | zipcode | 112       |
    And I retrieve the client containing the new updates

  Scenario: Delete client
    Given I create a client with the following information
      | name    | Sir Alfred    |
      | street  | oxford street |
      | city    | london        |
      | state   | london state  |
      | country | england       |
      | zipcode | 2323          |
    When I delete the last created client
    Then I retrieve 0 clients

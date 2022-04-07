# FAQ 

## Table of contents
- [How to request to include new vaccine code?](#how-to-request-to-include-a-new-vaccine-code)
- [How to request to include a new system or observation code?](#How-to-request-to-include-a-new-system-or-observation-code?)
- [Known Issues](#known-issues)



## How to request to include a new vaccine code?

We are doing our best to include the vaccine codes approved by CDC, but if you don't see
in the list, please create the pull request. Thanks for your support!

To do so, 
Please create a pull request that changes "covid_19_vaccine_codes" section of 
```
resources/public/vaccine-codes/accepted_codee.json
```

## How to request to include a new system or observation code?

We are doing our best to include the system codes that are offial, but if you don't see
in the list, please create the pull request. Thanks for your support!

To do so, 
Please create a pull request that changes "covid_19_lab_test_codes" section of 
```
resources/public/vaccine-codes/accepted_codee.json
```



## Known Issues
Here is known issue which is already associated with jira ticket. 

* [throw ErrorCode.SERVER_ERROR](https://thecommonsproject.atlassian.net/browse/SHCV-81)


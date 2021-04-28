# README #

### Dispatch Commands ###
* dispatch init -n omnipresence-genee-qna-dispatcher-dev --luisAuthoringKey "493306cefb1e4a26a725119c85d75631" --luisAuthoringRegion "westus"

* dispatch add -t luis -i 01fdcd8e-9758-47d5-9630-a7982c2ba2e0 --intentName "Skill_Analytics"  -v 0.1 -k 493306cefb1e4a26a725119c85d75631
* dispatch add -t luis -i d5ea40fd-c799-4efb-af82-cf254bf99d63 --intentName "Skill_Engagement" -v 0.1 -k 493306cefb1e4a26a725119c85d75631
* dispatch add -t luis -i 008625b7-0de9-41ec-93d7-e20e44076686 --intentName "Skill_List" -v 0.1 -k 493306cefb1e4a26a725119c85d75631

* dispatch add -t qna -i da9e9781-a82b-442d-9ed5-10591f822bbb --intentName "KB_Genee" -k ba4e9c71045b43499648a6c8ea5c4bb5 

* dispatch create
* dispatch refresh

DISPATCH_LUIS_APP_ID=5645c99d-a6f7-4538-8f90-f0c6621f7ce9
DISPATCH_LUIS_APP_KEY=493306cefb1e4a26a725119c85d75631
DISPATCH_LUIS_APP_ENDPOINT=https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/5645c99d-a6f7-4538-8f90-f0c6621f7ce9?verbose=true&timezoneOffset=0&subscription-key=493306cefb1e4a26a725119c85d75631&q=

### Docker Commands ###
* docker build -t kpi-assistant:v1 .
* docker run --env MicrosoftAppId=2333b0bb-fa9f-41e8-ac12-9ead0e66d8b8 --env MicrosoftAppPassword=e@kANGyB9_R4OYApjqtI15Tl=oDtR/K9 --rm -d --network host kpi-assistant:v1  

### LUDOWN Commands ###
* ludown parse toluis --in kpi_assistant.lu 

### LUIS Commands ###
* luis import application --in ./luis/kpi_assistant.json  --appName "kpi_assistant"
* luis train version --appId "8a31889b-2fea-4758-9f45-52eb720d3e3a" --versionId "0.1"
* luis publish version --appId "8a31889b-2fea-4758-9f45-52eb720d3e3a" --versionId "0.1" --region "westus"

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact
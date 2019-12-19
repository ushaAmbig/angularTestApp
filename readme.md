# AngularJS Calculation testApp

This is a test app created with AngularJS 1.7.9. 
App will take two numbers as input and multiply them and store them in Database. 

## Software Used

Below are the software and frameworks used for this project

 - NodeJS
 - ExpressJS
 - MongoDB Community Server
 - AngularJS 1.7.9
 - Bootstrap 4
 - Unit Test Frameworks
	 - Karma for Angular
	 - Mocha for NodeJS

## Installation

Before launching the application, you may have to install below software

**NodeJS - [https://nodejs.org/en/download/](https://nodejs.org/en/download/)** 
**MongoDB - [https://www.mongodb.com/download-center/community](https://www.mongodb.com/download-center/community)**

After installing above software, please clone or download this project to your local and open terminal in the project location.

In terminal, run below command to install all node module dependencies

    $ npm install

then, you can launch the application using below command

    $ npm start

Once you start the application, you will see below message in terminal

    Db connected successfully
    Server running in port 3000
  
  After this, you can open [http://localhost:3000/](http://localhost:3000/) in browser, and start using the application
 
 ## Unit Testing
mocha and karma are used for unit testing. 

Front-end test cases are under - */public/tests/main.spec.js*
Back-end test cases are under - */test/api.spec.js*

to run the unit tests, run below command

    $ npm test

***Note*: Before start the test, make sure application is running in port 3000**

Above command should run NodeJS test cases and then AngularJS test cases. To run individual test cases use below commands

    $ npm test-node
    $ npm test-angular

Test result should look like this,

    Db connected successfully
    
    
      √ Get results API call (43ms)
      √ POST results API call with invalid data #1
      √ POST results API call with invalid data #2
    new recored created: 5dfb1f33c9107c1f4c31c775
    new recored deleted: { n: 1, ok: 1, deletedCount: 1 }
      √ POST results API call with valid data and delete the record (1004ms)
    
      4 passing (1s)
    
    
    > angulartest@1.0.0 test-angular C:\Users\Admin\Documents\angularTest
    > karma start
    
    19 12 2019 12:26:54.668:INFO [karma-server]: Karma v4.4.1 server started at http
    ://0.0.0.0:9876/
    19 12 2019 12:26:54.675:INFO [launcher]: Launching browsers Chrome with concurre
    ncy unlimited
    19 12 2019 12:26:54.684:INFO [launcher]: Starting browser Chrome
    19 12 2019 12:26:56.319:INFO [Chrome 79.0.3945 (Windows 7.0.0)]: Connected on so
    cket P26eE-Fdr3vD2aAYAAAA with id 54388810
    Chrome 79.0.3945 (Windows 7.0.0): Executed 7 of 7 SUCCESS (0.13 secs / 0.091 sec
    s)
    TOTAL: 7 SUCCESS


Thank you!
Usha Ambig
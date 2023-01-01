# Canadian Chamber Of Commerce
![]
## Table of Contents
- [Project Description](#project-description)
- [Tools and Frameworks](#tools-and-frameworks)
- [Features](#features)
  * [Admin Functionalities](#administrator)
  * [Instructor Functinalities](#instructor)
  * [Corporate Trainee Functinalities](#corporatetrainee)
  * [Individual Trainee Functinalities](#individualtrainee)
  * [guest Functionalities](#guest)
- [API References](#api-references)

## Project Description

### Course 
Advanced Computer Lab (CSEN 704), Winter 2022

### Theme
The theme of the project, is to create a complete Online Learning System. An Online
Learning System is a web application through which individuals can attend pre-recorded
courses online. Existing web applications include but are not limited to Coursera, Udemy,
LinkedIn Learning, Great Learning and Udacity.


### Overview 
This project followed the Agile Methodology; meaning it was splited into Sprints, with
each Sprint lasting a set amount of time and a fully functioning version of the project
with the specified System Requirements should be submitted and evaluated.

### Objectives
- Learn how to properly use the Agile Methodology to plan out a project and develop
the software.
- Learn the process of following a given set of System Requirements to develop a
software.
- Learn to research and master the use of the MERN Stack.
- Learn how to work together as a team on GitHub.

## Tools and Frameworks
![MERN_STACK](https://miro.medium.com/max/1400/1*FVtCyRdJ6KOr4YswTtwMeA.jpeg)

### What is the MERN Stack?
MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.

- MongoDB - document database
- Express(.js) - Node.js web framework
- React(.js) - a client-side JavaScript framework
- Node(.js) - the premier JavaScript web server

Express and Node make up the middle (application) tier. Express.js is a server-side web framework, and Node.js the popular and powerful JavaScript server platform. Regardless of which variant you choose, ME(RVA)N is the ideal approach to working with JavaScript and JSON, all the way through.

### How does the MERN stack work?
The MERN architecture allows you to easily construct a 3-tier architecture (frontend, backend, database) entirely using JavaScript and JSON.

![MERN_ARCH](https://webimages.mongodb.com/_com_assets/cms/mern-stack-b9q1kbudz0.png?auto=format%2Ccompress)

#### - React.js Front End
The top tier of the MERN stack is React.js, the declarative JavaScript framework for creating dynamic client-side applications in HTML. React lets you build up complex interfaces through simple Components, connect them to data on your backend server, and render them as HTML.

React’s strong suit is handling stateful, data-driven interfaces with minimal code and minimal pain, and it has all the bells and whistles you’d expect from a modern web framework: great support for forms, error handling, events, lists, and more.

#### - Express.js and Node.js Server Tier
The next level down is the Express.js server-side framework, running inside a Node.js server. Express.js bills itself as a “fast, unopinionated, minimalist web framework for Node.js,” and that is indeed exactly what it is. Express.js has powerful models for URL routing (matching an incoming URL with a server function), and handling HTTP requests and responses.

By making XML HTTP Requests (XHRs) or GETs or POSTs from your React.js front-end, you can connect to Express.js functions that power your application. Those functions in turn use MongoDB’s Node.js drivers, either via callbacks for using Promises, to access and update data in your MongoDB database.

#### - MongoDB Database Tier
If your application stores any data (user profiles, content, comments, uploads, events, etc.), then you’re going to want a database that’s just as easy to work with as React, Express, and Node.

That’s where MongoDB comes in: JSON documents created in your React.js front end can be sent to the Express.js server, where they can be processed and (assuming they’re valid) stored directly in MongoDB for later retrieval. Again, if you’re building in the cloud, you’ll want to look at Atlas. If you’re looking to set up your own MERN stack, read on!

## Features
We have four main users in our website: 

### Features common for all users except guest:

- Log in using his email and password.

![log in](https://user-images.githubusercontent.com/83594429/210078803-642f4a78-123c-4543-a33d-5b5c35b62417.PNG)  

- Log out from the website

### Administrator


- Add another admin to the website.

![add admin](https://user-images.githubusercontent.com/83594429/210079303-76a4faf6-3856-4dbf-9a06-ec79b78828d7.PNG)

- Add corporate trainee to the website.

![add corporate trainee](https://user-images.githubusercontent.com/83594429/210079759-09e97b3e-a1ac-4ff6-b375-fd67856b8ff5.PNG)

- Add instructor to the website.

![Add instructor](https://user-images.githubusercontent.com/83594429/210079794-65e12eb2-97a0-41f3-828c-9d5c4ba5f36a.PNG)

- View the reports and solve it.

![solve problems](https://user-images.githubusercontent.com/83594429/210080839-d4e492f1-ff01-42e1-8cea-19c0cb079bd4.PNG)

- View the courses enroll requests and all the details of the request

![Enroll request](https://user-images.githubusercontent.com/83594429/210083256-24ffe185-40ef-4200-b566-837bb5bc019f.PNG)

- View refund requests and approved them or not

![refund requests](https://user-images.githubusercontent.com/83594429/210082781-09110a9c-9d35-41ce-a467-a17622e210f8.PNG)

- Add promotions to any course in the website and specify the percent of discount and the end time of the discount

![add promotions](https://user-images.githubusercontent.com/83594429/210082874-4a58a5da-df01-457c-9257-3a8f154651fc.PNG)



 ![GitHub](https://img.shields.io/github/license/BEPb/README)
# Canadian Chamber Of Commerce
![landing page](https://user-images.githubusercontent.com/73742471/210173152-6090466b-6efb-4a63-a6bb-782a0c8cab3a.png)
## Table of Contents
- [Project Description](#project-description)
- [Motivation](#motivation)
- [Code Styles](#code-styles)
- [Tools and Frameworks](#tools-and-frameworks)
- [Features](#features)
  * [Admin Functionalities](#administrator)
  * [Instructor Functinalities](#instructor)
  * [Individual Trainee Functinalities](#individual-trainee)
  * [Corporate Trainee Functinalities](#corporate-trainee)
  * [guest Functionalities](#guest)
- [API References](#api-references)
  * [Guest (Course) router](#guest-router)
  * [Instructor router](#instructor-router)
  * [Trainee router](#trainee-router)
  * [Admin router](#admin-router)
  * [Authentication router](#authentication-router)
- [Contributing](#contributing)
- [Credits](#credits)
- [Installation](#installation)
- [How to use](#How-to-use)
- [Licence](#Licence)

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

## Motivation
This project is done as a simulation to real company working flow where all team members contribuite together for a final project. which motivated us to put our efforts on a project where we can learn new technologies along side with implementing them on a real application .We make an online courses website to encourage people
to develop their skills and make this process easy by learning from home. 
## Code Styles
The project follows the  [ MVC ](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)design pattern ,MVC is a software architectural pattern commonly used for developing user interfaces that divide the related program logic into three interconnected elements. This is done to separate internal representations of information from the ways information is presented to and accepted from the user , So the Files in the backend was divided into the M (models) where the schema of the models exist which represent the core of the database , the C (controller) where the functions needed for the routes exists and the V (views) the view in MERN stack is represented by the react frontend server. Also the routes in our project was abstracted from the controller function as shown in [ API References](#api-references)

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
<img width="290" alt="image" src="https://user-images.githubusercontent.com/57245606/210161314-5ac10024-c0b8-4577-817b-f9e033c32588.png">


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


### Guest
- Sign Up for the webiste
<img width="513" alt="image" src="https://user-images.githubusercontent.com/57245606/210162051-000427a9-7690-4ee3-b476-941e48ea9c73.png">


### Corporate Trainee

- request access to a specific course they do not have access to
<img width="1214" alt="image" src="https://user-images.githubusercontent.com/57245606/210162072-fdb0d8dd-694c-494f-b30a-bd5d76aaf87a.png">


### Instructor

- view the ratings and reviews on all his/her courses
![courseReviews](https://user-images.githubusercontent.com/73742471/210179275-b2f11343-7bbe-4754-be76-34269a443e44.png)

- view and accept the contract which includes all the rights to the posted videos and materials as well as the % taken by the company on each video per --- registered trainee
![terms](https://user-images.githubusercontent.com/73742471/210179160-053d4fac-a2e4-4a3b-bb12-13b6a2ed50cc.png)

- view all the titles of the courses given by him/her
<img width="1436" alt="image" src="https://user-images.githubusercontent.com/57245606/210162118-fbc1a0f0-4d3d-46f4-ad04-cff98d1f3779.png">

- filter the courses given by him/her based on a subject or price
<img width="683" alt="image" src="https://user-images.githubusercontent.com/57245606/210162151-c26e861d-2014-4452-96e6-663ceb149439.png">

- search for a course given by him/her based on course title or subject or instructor
<img width="645" alt="image" src="https://user-images.githubusercontent.com/57245606/210162158-6613ca16-c1f5-4760-8475-baf6d0d689cf.png">

- view the amount of money owed per month
<img width="682" alt="image" src="https://user-images.githubusercontent.com/57245606/210162140-f8e3c51b-44af-4005-9174-1df8ccc993e7.png">

- create a new course and fill in all its details inclding title, subtitles, price and short summary about the entire course
![createCourse](https://user-images.githubusercontent.com/73742471/210179199-c6a17f2e-762c-4042-bb86-df3e4cdc180d.png)
- upload a video link from YouTube under each subtitle and enter a short description of the video
![upload video](https://user-images.githubusercontent.com/73742471/210179239-250dcfba-fd3a-4486-8ae4-48de32916c74.png)
- upload a video link from YouTube as a preview to the course
![upload preview](https://user-images.githubusercontent.com/73742471/210179221-4c03f097-ca4a-4309-92e4-2a6533dccc89.png)

- create a multiple choice exam with 4 choices per question
<img width="797" alt="image" src="https://user-images.githubusercontent.com/57245606/210162174-a9e4ab94-048d-4f8a-9f46-dc9c4afd6f0a.png">

- set the answers (not visible for the trainee) for multiple choice exercises
<img width="775" alt="image" src="https://user-images.githubusercontent.com/57245606/210162185-cce2f182-db8e-466c-9372-80f1f3317201.png">

- view his/her rating and reviews as an instructor
- edit his/her mini biography or email
<img width="675" alt="image" src="https://user-images.githubusercontent.com/57245606/210162199-d28d588b-ddd4-4174-890d-15768371b9dc.png">
<img width="657" alt="image" src="https://user-images.githubusercontent.com/57245606/210162207-b5cb3ab6-181c-4b25-a2af-b032317e3595.png">
- define a promotion for the course (% discount) and for how long
<img width="602" alt="image" src="https://user-images.githubusercontent.com/57245606/210162219-5e09281b-80f7-4154-abe4-6ddc84473a94.png">


### Individual Trainee
- view the amount available in their wallet from refunded courses
![1](https://user-images.githubusercontent.com/83594429/210186283-b6989586-a131-409d-9830-0e3d27564b0d.PNG)
- enter their credit card details to pay for a course they want to register for
- pay for a course
![2](https://user-images.githubusercontent.com/83594429/210186298-9acbe610-9e9b-4387-ad51-66c0512c1aba.PNG)
- request a refund only if less than 50% of the course has been attended
![4](https://user-images.githubusercontent.com/83594429/210186313-126834f0-fc69-4f4e-bd74-1f336ec67ec4.PNG)



### Individual Trainee & Corporate Trainee

- open all the items inside a course he/she is registered for including videos and excercises
![5](https://user-images.githubusercontent.com/83594429/210186338-7ccccfda-d019-4e29-881a-70151b7e66ae.PNG)
![05](https://user-images.githubusercontent.com/83594429/210186323-07f5f60b-dc24-43b3-84ce-9f98967df638.PNG)
- rate an instructor 
![6](https://user-images.githubusercontent.com/83594429/210186351-b82f7012-57ca-42b8-8169-e2bc54056064.PNG)
- rate a course
![7](https://user-images.githubusercontent.com/83594429/210186362-0c639f49-ce20-4d2e-9c56-88a668009816.PNG)
- solve a multiple choice exercise by choosing the correct answer
![8](https://user-images.githubusercontent.com/83594429/210186378-0b0afeea-2638-4c77-8b32-45f3c90c25fc.PNG)
- submit the answers to the exercise after completing it
![sumbitExam](https://user-images.githubusercontent.com/73742471/210186407-2761ccae-a904-48a2-bced-10f57d8acda0.png)
- view his/her grade from the exercise
- view the questions with the correct solution to view the incorrect answers
![10](https://user-images.githubusercontent.com/83594429/210186379-3df74e1e-790a-46eb-a942-40fb2f20fc7b.PNG)
- watch a video from a course he/she is registered for
![11](https://user-images.githubusercontent.com/83594429/210186370-4f7f40c5-90cb-4824-8090-1b520d236038.PNG)
- see his/her progress in the course of how much of the course has been completed so far
![12](https://user-images.githubusercontent.com/83594429/210186371-eb809ca0-d23c-41ea-b8b1-f7d62464723f.PNG)
- receive a certificate as a PDF after completing the course via email
![13](https://user-images.githubusercontent.com/83594429/210186374-a06f92e0-9413-48d8-ba47-ef99ee5e6612.PNG)
- download the certificate as a PDF from the website
![013](https://user-images.githubusercontent.com/83594429/210186372-1dce4db1-ef92-431b-96c3-1977119ca5fc.PNG)
- download the notes as a PDF
- write notes while watching the video
![14](https://user-images.githubusercontent.com/83594429/210186376-f0067b14-5283-49f1-b86e-8f5af205ca98.PNG)
- see a list of all the courses he/she is enrolled in on their profile
![15](https://user-images.githubusercontent.com/83594429/210186377-10056baf-69d4-46f0-8607-779bfa07de81.PNG)




### Guest & instructor & individual trainee 

- view and accept the website/ company refund/ payment policy while signing up
![16](https://user-images.githubusercontent.com/83594429/210186647-e3a72dd6-43b9-414d-91b4-28b51eee958e.PNG)
- view the price of each course
![17](https://user-images.githubusercontent.com/83594429/210186648-64dd1508-dd00-41b6-8fa4-9b7a6e31f89d.PNG)
- filter the courses based on price (price can be FREE)
![18](https://user-images.githubusercontent.com/83594429/210186649-b0b7232a-34cd-4485-9a09-998c44624886.PNG)
- choose a course from the results and view (but not open) its details including course subtitles, excercises , total hours of each subtitle, total hours of the course and price (including % discount if applicable) according to the country selected
![19](https://user-images.githubusercontent.com/83594429/210186646-fce947d8-caa8-4e07-8cbd-dae4857facaa.PNG)
![019](https://user-images.githubusercontent.com/83594429/210186674-75921e39-4b17-4965-b676-d5f6da43a9b5.PNG)


### Guest  & instructor & individual trainee & corporate trainee

- select their country 
<img width="1041" alt="image" src="https://user-images.githubusercontent.com/57245606/210165011-d9c88eb2-de15-45fd-966b-b20563c8b7dd.png">

- filter the courses based on a subject and/or rating
<img width="1036" alt="image" src="https://user-images.githubusercontent.com/57245606/210165043-b18a8f5f-eaed-4b77-858c-3599119a4900.png">

- search for a course based on course title or subject or instructor
<img width="999" alt="image" src="https://user-images.githubusercontent.com/57245606/210165018-dc72fc57-342f-4d43-9830-4f6fd6488d87.png">

- view a preview video of the course and the course outline before registering for it
<img width="915" alt="image" src="https://user-images.githubusercontent.com/57245606/210165032-46b01163-1686-4aa7-9405-5077f7e3201a.png">

- view the most viewed/ most popular courses
<img width="1427" alt="image" src="https://user-images.githubusercontent.com/57245606/210165058-71678e3f-b556-46db-a5f0-b2d3dd2fcbf9.png">

- view all the titles of the courses available including the total hours of the course and course rating
<img width="1190" alt="image" src="https://user-images.githubusercontent.com/57245606/210165065-8ace7c5e-df1c-45b1-97e5-9bc65b734535.png">


### instructor & individual trainee & corporate trainee

- receive an email to change a forgotten password
![mail](https://user-images.githubusercontent.com/73742471/210178997-6dfcec95-fd39-4b1e-9795-435b5e43e346.png)
![verify](https://user-images.githubusercontent.com/73742471/210178942-78c5e415-ca65-47ee-9645-3018664a0d55.png)

- change his/her password
<img width="623" alt="image" src="https://user-images.githubusercontent.com/57245606/210165084-a834b749-e554-4586-b130-86d808673098.png">

- report a problem with a course. The problem can be "technical", "financial" or "other"
<img width="881" alt="image" src="https://user-images.githubusercontent.com/57245606/210165096-1dab93a4-a18f-4fe5-9e4a-72f9ad654bda.png">

- see all previously repoted problems and their statuses
![reportedProblems](https://user-images.githubusercontent.com/73742471/210179041-8dc5fab5-e45f-4434-ad20-d2fde193392f.png)

- follow up on an unresolved problem
![follow](https://user-images.githubusercontent.com/73742471/210179070-1553b661-9ff2-4c69-940b-450e8709100f.png)

## API References
Our APIs is divided into four APIs :
### Guest Router
#### Route : (`/course`)

#### GET Courses
 - Route : `/listCourses` 
 - Request type : `get`
#### GET Specefic course
 - Route : `/listCourses/:id` 
 - Request type : `get`
 - Request Header : {`id:'courseId`}
#### GET most popular courses
 - Route : `/mostpopular` 
 - Request type : `get`
#### Search for a course 
 - Route : `/listCourses/search` 
 - Request type : `get`
 - Request query : {`search:'search fields`}


### Instructor Router
#### Route : (`/instructor`)
#### Create Course
- Route : `/addCourse`
- Request type : `post`
- Request Body : 
 `{
  title: 'Full Mern Stack ',
  price: '180',
  description: 'MERN is one of several variations of the MEAN stack (MongoDB Express Angular Node),with React.js',
  subejct: 'programming',
  language: 'English',
  imgUrl: '[!imageLink]',
  coursePreviewUrl :[!CoursePreviewLink],
  subtitles :[Array(subtitle)]
}
`
#### Create Exam
- Route : `/setExam` `/setFinalExam`
- Request type : `post`
- Request Body : 
 `{
  subtitleId: 'mongoose.type.objectId()',
  courseId: 'mongoose.type.objectId()',
  questions: [Array(questions)]
}
`
#### Report problem
- Route : `/reportProblem` 
- Request type : `post`
- Request Body : 
 `{
  reportType: 'technical',
  problemTitle 'Video Quality',
  courseId: 'mongoose.type.objectId()',
  description: 'The video quality is very low'
}
`
#### viewReportedProblems
 - Route : `/viewReportedProblems` 
 - Request type : `get`
 - Request Header : `is handled using the middleWare of authentication session which contains logged user token`


#### Own Courses
 - Route : `/listCourseTitles` 
 - Request type : `get`
 - Request Header : `{courseId: 'mongoose.type.objectId()'}`
  
#### View profit 
 - Route : `/profit` 
 - Request type : `get`
 - Request Header : `is handled using the middleWare of authentication session which contains logged user token`

#### View questions on courses 
 - Route : `/getQuestions` 
 - Request type : `get`
 - Request Header : `{courseId :'mongoose.type.objectId()'}`

#### reply for a question 
- Route : `/addReply` 
- Request type : `patch`
- Request Body : 
 `{
  questionId: 'mongoose.type.objectId()',
  reply :'you can use typeScript'
}
`
#### update Subtitles
- Route : `/updateSubtitle` 
- Request type : `patch`
- Request Body : 
 `{
  courseId:'mongoose.type.objectId()', subId'mongoose.type.objectId()':, linkDesc:'What is MernStack', linkUrl:'[videoUrl]', allowed:true}`

#### delete Subtitles
- Route : `/deletSubtitle` 
- Request type : `delete`
- Request Body : 
 `{
  courseId:'mongoose.type.objectId()', subId:'mongoose.type.objectId()', linkId:'mongoose.type.objectId()}`
### Trainee Router
#### Route : (`/individualtrainee`)
#### Register for a course by using credit/debit card 
- Route : `/create-checkout-session` 
- Request type : `post`
- Request Body : 
 `{
  courseId: 'mongoose.type.objectId()',
}
`
#### Register for a course by using wallet
- Route : `/payWithWallet` 
- Request type : `post`
- Request Body : 
 `{
  courseId: 'mongoose.type.objectId()',
}
`
#### Request access for a course in case of corporate 
- Route : `/requestAccess` 
- Request type : `post`
- Request Body : 
 `{
  courseId: 'mongoose.type.objectId()',
}
`
#### rate course
- Route : `/setRating` 
- Request type : `post`
- Request Body : 
 `{
  courseId: 'mongoose.type.objectId()',
  rating : 5,
  review : 'wonderfull course'}
`
 #### rate instructor
- Route : `/setRating` 
- Request type : `post`
- Request Body : 
 `{
  instructor: 'mongoose.type.objectId()',
  rating : 5,
  review : 'wonderfull course'}
`
 #### delet  instructor rating
- Route : `/setRating` 
- Request type : `post`
- Request Body : 
 `{
  instructorId: 'mongoose.type.objectId()'}`


#### Report problem
- Route : `/reportProblem` 
- Request type : `post`
- Request Body : 
 `{
  reportType: 'technical',
  problemTitle 'Video Quality',
  courseId: 'mongoose.type.objectId()',
  description: 'The video quality is very low'
}
`
#### Request refund 
 - Route : `/requestRefund` 
 - Request type : `post`
 - Request body : `{courseId : 'mongoose.type.objectId()',reason : 'I did not find the course intersting'}`

#### write notes 
 - Route : `/addNotes` 
 - Request type : `post`
 - Request body : `{subId :'mongoose.type.objectId()' , note : "need to install express"}`

#### solve exam 
 - Route : `/submitExam` 
 - Request type : `post`
 - Request body : `{subId :'mongoose.type.objectId()' ,answers :'ArrayOfAnswers(mcq)'}`


#### View inprogress courses
 Route : `/inprogress` 
- Request type : `get`
- Request Header : `is handled using the middleWare of authentication session which contains logged user token`

#### View specific inprogress course
 Route : `/inprogress/:id` 
- Request type : `get`
- Request Header : `is handled using the middleWare of authentication session which contains logged user token`
- Request params : {courseId: 'mongoose.type.objectId()'}


#### delete course rating
- Route : `/deleteCourseRating` 
- Request type : `delete`
- Request Body : 
 `{
  courseId: 'mongoose.type.objectId()'}`
 
#### viewReportedProblems
 - Route : `/viewReportedProblems` 
 - Request type : `get`
 - Request Header : `is handled using the middleWare of authentication session which contains logged user token`

#### change password 
 - Route : `/changePassword` 
 - Request type : `patch`
 - Request body : `{password :'ahmed$1484' , email : 'ahmed@gmail.com'}`


#### forogot password 
 - Route : `/forgotpassword` 
 - Request type : `patch`
 - Request body : `{email : 'ahmed@gmail.com'}`




### Admin Router
#### Route : (`/admin`)

#### Add Admin
- Route : `/addAdmin`
- Request type : `post`
- Request Body : 
 `
  {
  username: 'Omar',
  password: '123'
 }
`

#### Add promotions
- Route : `/addPromotionMulti`
- Request type : `post`
- Request Body : 
 `
  {
     idArr: ['6361b2deef7816eb1d9eb915','6361b484c27988acb69dfb50'],
     promo: "25",
     enddate: "20/1/2023"
 }
`

#### Add Corporate Trainee
- Route : `/addCorporate`
- Request type : `post`
- Request Body : 
 `
  {
      firstname: "yehia",
      lastname: "eldib",
      username: "eldib",
      password: "pass%#$@123#4",
      email: "yehia@gmail.com",
      gender: "male"
 }
`
#### Add Instructor
- Route : `/addInstructor`
- Request type : `post`
- Request Body : 
 `
  {
      firstname: "yehia",
      lastname: "eldib",
      username: "eldib",
      password: "pass%#$@123#4",
      email: "yehia@gmail.com",
      gender: "male"
 }
`
#### View Report
- Route : `/viewReports`
- Request type : `get`

#### View enroll requests
- Route : `/accessRequests`
- Request type : `get`


#### View refund requests
- Route : `/refundRequests`
- Request type : `get`


### Authentication Router
#### Route : (`/login`)

- Request type : `post`
- Request Body : 
 `{username :'ahned' , password : 'Ahmed@123'}`

#### Route : (`/signUp`)

- Request type : `post`
- Request Body : 
 `{username :'ahned' , password : 'Ahmed@123' , email : 'ahmed@gmail.com' , firstname:'ahmed' , lastname:'mohmaed'}`
  
#### Route : (`/logOut`)
- Request type : `post`
-Request header : `is handled using the middleWare of authentication session which contains logged user token`



## Contributing
Anyone who would like to contribute in the project please send me an E-mail on [hossamelfarr@gmail.com](hossamelfarr@gmail.com)

## Credits
|Contributers|Github Account|
|---|---|
|Yehea Eldib | [yehea eldib](https://github.com/yehiaeldib)|
|Hossam El Far| [hossam elfar](https://github.com/Terror-1)|
|Ahmed Azooz|[ahmed azooz](https://github.com/A3zooz)|
|Adham Haggag|[adham hagag](https://github.com/Haggag23)|
|Abdullah Fouad|[abdullah fouad](https://github.com/Abdullah204)|

## Installation
 you can install the project using `git clone 'https://github.com/Advanced-Computer-Lab-2022/Agiles.git'`
 then run npm install to download all the needed packages\

## How to use
 After cloning the project or downloading the ZIP folder open the project using the integrated terminal or by using the CMD 
 then run the frontend / backend servers 
 - `nodemon app` to run the backend server on port :8000
 - `npm start` to run the frontend server on port :3000
 

### Licence 
 This project is licenced under [MIT LICENCE](/LICENSE.md)

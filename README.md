<!-- Live demo https://smartflix-app.vercel.app/ -->


# Smartflix - Video Streaming Web App

<p align="center">
   <img src="https://user-images.githubusercontent.com/79754424/170882180-f0ab627b-4032-4e30-839a-6d93d5a36dff.png" alt="Smartflix logo"/>
</p>

</p>
Problem Statement:

Demonstrate through your app the different kinds of algorithms that a web-streaming app (like Netflix) or an audio-streaming app (like Spotify) may use for their Recommendation Engine.



<br/>

## Submission for Microsoft engage '2022

![image001](https://user-images.githubusercontent.com/79754424/167501435-3fea72dd-0e81-4bc3-bb7a-1ca85a715d49.jpg)

<br/>


## Features and Interfaces

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ## 1. Beautiful Landing page inspired from the netflix ui
  
  ![image](https://user-images.githubusercontent.com/79754424/170871926-ad16e8cd-32db-45cb-ac95-27a3e9afb0a6.png)
  
  ## 2. Movie Recommendations Based on Linear Regression Algorithm
  
  CRLRM (Category based Recommendation using Linear Regression Model) which is based on linear regression model that improves the prediction accuracy and speed up the calculations. Performance of proposed method is evaluated on the basis of MAE (Mean Absolute Error) comparison, and result obtained is far much better than ERPM and shows improvement in 30-40% of user ratings

  ![Screenshot 2022-05-29 191527](https://user-images.githubusercontent.com/79754424/170872741-a2acbd7e-9ad1-4b7e-9d15-2e8e1cbb6eff.png)
  
  ## 3. Movie Recommendations Based on Content Based "Pirates of the Caribbean: The Curse of the Black Pearl"
  
  It uses attributes such as genre, director, description, actors, etc. for movies, to make suggestions for the users. The intuition behind this sort of recommendation system is that if a user liked a particular movie or show, he/she might like a movie or a show similar to it.
  
![Screenshot 2022-05-29 191433](https://user-images.githubusercontent.com/79754424/170872833-f96dccbf-1f58-43aa-a82c-cf1a4e142b1f.png)

  ## 4. Movie Recommendations Based on user and item based collabrative algorithm
  
  It matches users with same interests and gives recommendations based on their likes. Eg: There are two users Sam and Robin, Sam likes movies A,B,C,D and Robin likes movies C,D. Since movies C,D are common to both Sam and Robin, thus movies A and B would be recommended to Robin. Collaborative filtering does not make use of metadata to give recommendations.
  
  ![Screenshot 2022-05-29 191627](https://user-images.githubusercontent.com/79754424/170872902-e2091f95-459e-41e6-9d5f-16d1db0ff850.png)

![Screenshot 2022-05-29 191613](https://user-images.githubusercontent.com/79754424/170872925-77b1a865-0ce2-4c25-bdf1-7a915b5ec39c.png)


  ## 5. Content Based recommendations from the user search input
  
  ![Screenshot 2022-05-29 191946](https://user-images.githubusercontent.com/79754424/170873011-73050cfa-fdff-406d-925c-3303cccd3577.png)
  
  ## 6. Search movies with keywords autocompletion
  
  ![Screenshot 2022-05-29 191833](https://user-images.githubusercontent.com/79754424/170872960-66a8a8a2-f1f1-44e5-b8de-f4dd94e9d4b1.png)

  ## 7. Movie comments and reviews feature 
  
  ![Screenshot 2022-05-29 221507](https://user-images.githubusercontent.com/79754424/170881596-ace56c1c-6dcd-40dd-87a1-ef40993c9986.png)

 

<br/>

## Instructions for running this project

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  1.`git clone https://github.com/priyank003/Smartflix.git`<br/>
  <br/>
  2. cd ./client & npm install & npm start  <br/>
  <br/>
  3.  cd ./rec-engine & npm install & npm start  <br/>
  <br/>
  4. cd ./server & npm install & npm run watch  <br/>
  <br/>
  5. The App is now running at `http://localhost:3000/`, 
  <br/>
  6. Server Runnin at `http://localhost:8000/`
  <br/>
  8. Recommendation engine running at `http://localhost:9000/`


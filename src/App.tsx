import React, {useState} from 'react';
import './App.css';
import Quizservice, {OfflineQuizEasy,OfflineQuizMedium,OfflineQuizHard} from './services/quizServices';
import {quizDataType} from "./types/QuizTypes";
import Questioncard from './components/questioncard';
// import { initNotification } from './services/firebaseService';
// import firebase from 'firebase';
//new


function App() {


 let [questions,setQuestions] = useState<quizDataType[]>([]);
 let [index,setIndex] = useState<number>(0);
 let [score,setScore] = useState<number>(0);
 let [showResult,setShowResult] = useState<boolean>(false);
 let [fetchAgain,setFetchAgain] = useState<boolean>(false);

 let [homeScreen,setHomeScreen] = useState<boolean>(true);
 let [amount,setAmount] = useState<number>(5);
 let [level,setLevel] = useState<string>("0");
 let [type,setType] = useState<string>("0");
 let [category,setCategory] = useState<string>("0");
 let [connected,setConnected] = useState<boolean>(true);

 let [OfflineEasyQuiz, setOfflineEasyQuiz] = useState<quizDataType[]>([]);

 let [OfflineMediumQuiz, setOfflineMediumQuiz] = useState<quizDataType[]>([]);
 
 let [OfflineHardQuiz, setOfflineHardQuiz] = useState<quizDataType[]>([]);

 const [notificationPerm,setNotificationPerm] = React.useState("");


//  const messaging = firebase.messaging();
//  initNotification().then((perm)=>{

    
//    if(perm === "granted"){ 

//      setNotificationPerm("enabled");
//      messaging.getToken().then((currentToken) => {
//          if (currentToken) {
//              console.log("TOKEN")
//              console.log(currentToken);
//          } else {
//            console.log('No Instance ID token available. Request permission to generate one.');

//          }
//        }).catch((err) => {
//          console.log('An error occurred while retrieving token. ', err);
//        });

       
//  }
//    if(perm === "denied"){ 

//      setNotificationPerm("disabled");
//    }


//  })








React.useEffect( () => {

  
  async function fetchData() {

    if (homeScreen === false){
      await Quizservice(amount,level,type,category).then((resp) => {

        setQuestions(resp)
      
    

    }).catch(()=> {console.log("not connected to internet")})


  }
  }
  fetchData();


  async function OfflineData(){

   if (connected){
  

    await OfflineQuizEasy().then((resp) => {
      setConnected(true);
      localStorage.setItem("quizEasy",JSON.stringify(resp));

    }).catch (()=> {

  
      
    setConnected(false)
  
    let collection = localStorage.getItem('quizEasy');
    
    if (collection !== null){
    let jsonData = JSON.parse(collection);  
    setOfflineEasyQuiz(jsonData);
 
  }
   
  
  })

  await OfflineQuizMedium().then((resp) => {
    setConnected(true);
    localStorage.setItem("quizMedium",JSON.stringify(resp));

  }).catch (()=> {
    
  setConnected(false)

  let collection1 = localStorage.getItem('quizMedium');
  if (collection1 !== null){
  let jsonData = JSON.parse(collection1); 
  setOfflineMediumQuiz(jsonData);
 
}
 

})


await OfflineQuizHard().then((resp) => {
  setConnected(true);
  localStorage.setItem("quizHard",JSON.stringify(resp));

}).catch (()=> {
  
setConnected(false)

let collection2 = localStorage.getItem('quizHard');
if (collection2 !== null){
let jsonData = JSON.parse(collection2); 
setOfflineHardQuiz(jsonData);

}


})


}



  }

OfflineData();


console.log(window.navigator.onLine);
  
}, [fetchAgain,homeScreen,level,amount,category,type,connected]);






const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
  e.preventDefault();
  
  if (userAns === questions[index].answer){
    setScore(score+1);
    
  }

  if (index !== questions.length-1 ){
  setIndex(index+1);
}
else{
  setShowResult(true);
}

}

function resetQuiz (): void{
setScore(0);
setIndex(0);
setShowResult(false);
setFetchAgain(!fetchAgain);
setQuestions([]);
setHomeScreen(true)


}


function handleOptions(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
 // setHomeScreen(false);

  if (connected === true && window.navigator.onLine === true){
    
    console.log("connected");
    setHomeScreen(false);
    
  }

  if (connected === true && window.navigator.onLine === false){
    
    alert("internet disconnected, you can only choose limited features");
    setConnected(false);
  }


  if (connected === false && window.navigator.onLine === true){
    alert("internet Connected, now you can use all the options")
    setConnected(true);
  }


  if (connected === false && window.navigator.onLine === false){ 

    setHomeScreen(false);

    const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)

    if (level === "easy"){

      const array =shuffleArray(OfflineEasyQuiz)
      const array1 = array.splice(amount-1, 50-amount);
     setQuestions(array);
    
    }

    if (level === "medium"){

      const array =shuffleArray(OfflineMediumQuiz)
      const array1 = array.splice(amount-1, 50-amount);
     setQuestions(array);

    }

    if (level === "hard"){

      const array =shuffleArray(OfflineHardQuiz)
      const array1 = array.splice(amount-1, 50-amount);
     setQuestions(array);

    }

    
    if (level === "0"){

      const array0 =OfflineEasyQuiz.concat(OfflineMediumQuiz).concat(OfflineHardQuiz);
      const array = shuffleArray(array0);
      const array1 = array.splice(amount-1, 150-amount);
     setQuestions(array);

    }

  }

}

if (connected === false && homeScreen === true){

  return (
  
  
    <div id = "wrapper">
    <div  className = "formContainer">
    <p className = "notifications"> {notificationPerm ? 'Notifications: ' + notificationPerm : ""}</p>
    <h1 className = "heading">Select Options to generate the quiz</h1>
   
    <h2 id = "note"> Please Connect to internet to enable all the options </h2>
    <div>
      <form id = "form" onSubmit = {(e)=>handleOptions(e)}>
      <label className = "formSubHeadings" > Enter No. of Questions: </label>
      <input className = "formEntries"  value = {amount} name = "amount" type = "number" max = "50" min = "1" required onChange= {(e)=> {setAmount(parseInt(e.target.value))}} ></input>
      
      

      <label className = "formSubHeadings">Select Level of Difficulty:   </label>
      <select className = "formEntries" name="level" id="level" onChange = {(e)=>setLevel(e.target.value)}>
      <option value="0">Any</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>

  </select>

     
     

  <label className = "formSubHeadings">Select Type:   </label>
      <select className = "formEntries" name="type" id="type" disabled >

      <option value="0">Any</option>
  
  </select>



  
  <label className = "formSubHeadings">Select Category:   </label>
      <select className = "formEntries" name="category" id="category"  disabled>
      <option value="0">Any</option>
      
  </select>


  <input className = "submit" type = "submit"/>

      </form>
    </div>

  </div>
  </div>
  
  
  
  
  
  
  
  
  
  
  

  
  
  
    )
}

if (connected === true && homeScreen === true){

  return (

    <div id = "wrapper">
    <div  className = "formContainer">
    
    <p className = "notifications"> {notificationPerm ? 'Notifications: ' + notificationPerm : ""}</p>
      <h1 className = "heading">Select Options to generate the quiz</h1>
      
           <div>
        <form id = "form" onSubmit = {(e)=>handleOptions(e)}>
        <label className = "formSubHeadings" > Enter No. of Questions: </label>
        <input className = "formEntries"  value = {amount} name = "amount" type = "number" max = "50" min = "1" required onChange= {(e)=> {setAmount(parseInt(e.target.value))}} ></input>
        
        

        <label className = "formSubHeadings">Select Level of Difficulty:   </label>
        <select className = "formEntries" name="level" id="level" onChange = {(e)=>setLevel(e.target.value)}>
        <option value="0">Any</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>

    </select>

       
        

    <label className = "formSubHeadings">Select Type:   </label>
        <select className = "formEntries" name="type" id="type" onChange = {(e)=>setType(e.target.value)} >

        <option value="0">Any</option>
        <option value="boolean">True/False</option>
        <option value="multiple">Multiple Choice Questions</option>
      
       
    </select>



    
    <label className = "formSubHeadings">Select Category:   </label>
        <select className = "formEntries" name="category" id="category"  onChange = {(e)=>setCategory(e.target.value)}>
        <option value="0">Any</option>
        <option value="9">General Knowledge</option>
        <option value="10">Books</option>
        <option value="11">Film</option>
        <option value="12">Music</option>
        <option value="13">Musicals and Theatres</option>
        <option value="14">Television</option>
        <option value="15">Video Games</option>
        <option value="16">Board Games</option>
        <option value="17">Science and Nature</option>
        <option value="18">Computers</option>
        <option value="19">Mathematics</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
        <option value="25">Art</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
        <option value="29">Comics</option>
        <option value="30">Gadgets</option>
        <option value="31">Japanese Anime and Manga</option>
        <option value="32">Cartoon and Animations</option>


       
    </select>


    <input className = "submit" type = "submit"/>
   
        </form>
      </div>

    </div>

    </div>
  )
}


if(showResult === true){
  return(
    
    <div id = "wrapper">
    <div className = "formContainer">
    <h1 className = "heading" >Result</h1>
    <p className = "result">You have scored <b>{score}</b> out of <b>{questions.length}</b></p>
    <button className = "submit" onClick = {()=>{resetQuiz()}}>Reset Quiz</button>
    </div>
     </div>
    )
  }
    


if(!questions.length){

  return ( <div id = "wrapper"> <h1 className = "formContainer">Loading</h1> </div>)

}
  
  return (
    <div id = "wrapper">
    <div className="formContainer">
     <h1 className = "heading">QUIZ APP</h1>
     <Questioncard  question = {questions[index].question} options = {questions[index].options} callback = {handleSubmit}></Questioncard>
    </div>
    </div>

  );

}
export default App;
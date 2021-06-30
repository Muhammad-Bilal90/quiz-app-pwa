import { incomingDataType } from "../types/QuizTypes"
import {quizDataType} from "../types/QuizTypes"
async function Quizservice( totalQuestions: number, level: string, type:string, category:string) : Promise<quizDataType[]>  {

    const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)



const incoming = await fetch (`https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=${type}&category=${category}`);
const {results} = await incoming.json();


return (

    results.map((result:incomingDataType) => {
        return{
    question: result.question,
    answer: result.correct_answer,
    options: shuffleArray(result.incorrect_answers.concat(result.correct_answer))
}

    }
)
)

}

export default Quizservice;


export async function OfflineQuizEasy (): Promise<quizDataType[]> {


    const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)


    const easyIncoming = await fetch (`https://opentdb.com/api.php?amount=50&difficulty=easy`);
   

    const easyData = await easyIncoming.json();


    return (

    easyData.results.map((result:incomingDataType) => {
        return{
    question: result.question,
    answer: result.correct_answer,
    options: shuffleArray(result.incorrect_answers.concat(result.correct_answer))
}

    }
)
)

}


export async function OfflineQuizMedium(): Promise<quizDataType[]> {


    const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)


    const mediumIncoming = await fetch (`https://opentdb.com/api.php?amount=50&difficulty=medium`);
   


    const mediumData = await mediumIncoming.json();
   




    return (

    mediumData.results.map((result:incomingDataType) => {
        return{
    question: result.question,
    answer: result.correct_answer,
    options: shuffleArray(result.incorrect_answers.concat(result.correct_answer))
}

    }
)
)

}



export async function OfflineQuizHard(): Promise<quizDataType[]> {


    const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)

    const hardIncoming = await fetch (`https://opentdb.com/api.php?amount=50&difficulty=hard`);


    const hardData = await hardIncoming.json();




    return (

    hardData.results.map((result:incomingDataType) => {
        return{
    question: result.question,
    answer: result.correct_answer,
    options: shuffleArray(result.incorrect_answers.concat(result.correct_answer))
}

    }
)
)

}
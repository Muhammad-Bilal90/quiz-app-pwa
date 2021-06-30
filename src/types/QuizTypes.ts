  
export type incomingDataType ={

    category: string
    correct_answer:string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string

}

export type quizDataType ={

    question: string
    answer: string
    options: string[]
}

export type questionPropsType = {
    question: string
    options: string[]
    callback: (e:React.FormEvent<EventTarget>, ans:string) => void
}
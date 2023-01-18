import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then( res=> res.json())
    .then(questionArray => {setQuestions(questionArray)})
    .then(console.log("all questions loaded again"))
  }, [])

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => (
      <QuestionItem 
      question={question} 
      key={question.id}
      onDeleteQuestion={handleDeleteClick}
      />))}</ul>
    </section>
  );
}

export default QuestionList;

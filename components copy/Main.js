"use client";

import React, { useState, useEffect } from "react";
import { getDefinition } from "./utils/definition";

function Main() {
  const [language, setLanguage] = useState("no");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [definition, setDefinition] = useState(null);

  useEffect(() => {
    async function getConfig() {
      try {
        var id = JSON.parse(getCookie("location")).token;

        const gql = `
        query getById($id: ID!) {
          config_by_pk(id: $id) {
            title
            logo
            questions {
              questionId
              questionText {
                no
                en
              }
              intervalMin
              intervalMax
              dependent
              answers {
                key
                value {
                  no
                  en
                }
              }
            }
          }
        }
        
        `;

        const query = {
          query: gql,
          variables: {
            id: id,
          },
        };

        const endpoint = "/data-api/graphql";
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(query),
        });
        const result = await response.json();
        console.table(result.data.config_by_pk);
        if (!result?.data?.config_by_pk) {
          document.cookie =
            "location =; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          location.reload(true);
          throw Error(result.errors[0].message);
        }
        return result.data.config_by_pk;
      } catch (error) {
        console.error("An error occurred:", error.toString());
        // Display error message to the user
        displayErrorMessage(error.message);
      }
    }

    async function getConfig() {
      try {
        var id = "Ijjasdi";

        const gql = `
        query getById($id: ID!) {
          config_by_pk(id: $id) {
            title
            logo
            questions {
              questionId
              questionText {
                no
                en
              }
              intervalMin
              intervalMax
              dependent
              answers {
                key
                value {
                  no
                  en
                }
              }
            }
          }
        }
        
        `;

        const query = {
          query: gql,
          variables: {
            id: id,
          },
        };

        const endpoint = "/data-api/graphql";
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(query),
        });
        const result = await response.json();
        console.table(result.data.config_by_pk);

        return result.data.config_by_pk;
      } catch (error) {
        console.error("An error occurred:", error.toString());
      }
    }

    getConfig();

    async function fetchConfig() {
      // const config = await getConfig();
      setDefinition(getDefinition());
    }
    fetchConfig();
  }, []);

  const startQuestions = () => {
    setQuestionIndex(0);
  };

  const saveAnswer = (questionId, answerKey) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: definition.questions[questionIndex].answers.find(
        (ans) => ans.key === answerKey
      ).value[language],
    }));
    setQuestionIndex((prev) => prev + 1);
  };

  const reset = () => {
    setQuestionIndex(0);
    setAnswers({});
  };

  return (
    <div className="main-container">
      {questionIndex < definition?.questions.length ? (
        <div className="question-container">
          <h1>{definition?.questions[questionIndex].questionText[language]}</h1>
          <div>
            {definition?.questions[questionIndex].answers.map(
              ({ key, value }) => (
                <button
                  key={key}
                  onClick={() =>
                    saveAnswer(
                      definition.questions[questionIndex].questionId,
                      key
                    )
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                >
                  {value[language]}
                </button>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="thank-you">
          <p>{definition?.thankYouMessage[language]}</p>
          <button onClick={reset} className="btn btn-secondary">
            {definition?.resetButton[language]}
          </button>
        </div>
      )}
    </div>
  );
}

export default Main;

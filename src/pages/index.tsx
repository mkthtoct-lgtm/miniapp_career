import React, { useState } from "react";
import { Page } from "zmp-ui";

import { useQuizLogic } from "@/hooks/useQuizLogic";
import WelcomeScreen from "@/components/WelcomeScreen";
import FormScreen from "@/components/FormScreen";
import CharacterScreen from "@/components/CharacterScreen";
import Quiz from "@/components/Quiz";
import Result from "@/components/Result";

function HomePage() {
  const quizState = useQuizLogic();
  const [fetchedPhone, setFetchedPhone] = useState("");

  return (
    <Page className="font-['Montserrat'] text-white bg-[#0a1930]">
      <div className="relative w-full max-w-md min-h-screen mx-auto">
        {quizState.currentScreen === "welcome" && (
          <WelcomeScreen 
            onStart={(phone) => {
              setFetchedPhone(phone || "");
              quizState.navigate("form");
            }} 
          />
        )}

        {quizState.currentScreen === "form" && (
          <FormScreen
            initialPhone={fetchedPhone}
            onSubmit={quizState.saveUserData}
            onBack={() => quizState.navigate("welcome")}
          />
        )}

        {quizState.currentScreen === "char" && (
          <CharacterScreen
            onSelect={quizState.selectCharacter}
            selectedChar={quizState.character}
            onStart={() => quizState.navigate("game")}
          />
        )}

        {quizState.currentScreen === "game" && (
          <Quiz
            character={quizState.character}
            currentQIndex={quizState.currentQIndex}
            questions={quizState.questions}
            exp={quizState.totalExp}
            stats={quizState.stats}
            maxStat={quizState.maxStat}
            onAnswer={quizState.answerQuestion}
            onNext={quizState.nextQuestion}
          />
        )}

        {quizState.currentScreen === "result" && (
          <Result
            stats={quizState.stats}
            maxStat={quizState.maxStat}
            exp={quizState.totalExp}
            onReplay={quizState.resetGame}
          />
        )}
      </div>
    </Page>
  );
}

export default HomePage;
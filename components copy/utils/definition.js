export const generateQuestions = (title = "Vardesenteret") => [
    {
      questionId: "firstTime",
      questionText: {
        no: `Er dette ditt første besøk på ${title}?`,
        en: `Is this your first visit to ${title}?`,
      },
      answers: [
        { key: "yes", value: { no: "Ja", en: "Yes" } },
        { key: "no", value: { no: "Nei", en: "No" } },
      ],
    },
    {
      questionId: "type",
      questionText: {
        no: "Jeg er på besøk som:",
        en: "I am visiting as:",
      },
      answers: [
        { key: "patient", value: { no: "Pasient / tidligere pasient", en: "Patient / former patient" } },
        { key: "relative", value: { no: "Pårørende", en: "Relative" } },
        { key: "other", value: { no: "Annet", en: "Other" } },
      ],
    },
  ];
  
  export const getDefinition = (config) => ({
    logo: config?.logo,
    welcomePage: {
      no: {
        title: `Velkommen til ${config?.title || "Vardesenteret"}!`,
        description: "Klikk på startknappen for å registrer ditt besøk.",
        startButton: "Start",
      },
      en: {
        title: `Welcome to ${config?.title || "Vardesenteret"}!`,
        description: "Click the start button to register.",
        startButton: "Start",
      },
    },
    thankYouMessage: {
      no: "Tusen takk for at du registrerte deg!",
      en: "Thank you so much for your registration!",
    },
    countdownMessage: {
      no: "Avsluttes om",
      en: "Ending in",
    },
    secondsMessage: {
      no: "sekunder...",
      en: "seconds...",
    },
    resetButton: {
      no: "Avslutt",
      en: "End",
    },
    questions: config?.questions || generateQuestions(config?.title),
  });
  
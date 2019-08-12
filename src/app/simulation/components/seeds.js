let welcomeText = {
    title: "Welcome to the Personality Profiler",
    content:
        "Welcome to the Magickbricks Know your personlaity Challenge!<br><br> You are playing as an ed-tech entprepreneur who is looking to launch an app to teach the youth of today their mother-tongue.<br><br> M-Permutator is the most sought-after incubator in the country and you are looking to get in there to maximize your chances of being funded and growing into the next killer app!<br><br> Go through your pitch deck to better understand the business idea, so that you can more forward in this simulation. Best of luck!",
    buttonText: "Start the Simulation",
    link: "/simulation/1"
};
let resultText = {
    title: "Congratulations!",
    content:
        "You are at a stage that every entrepreneur aspires to be! You have sold your company and made returns for your investors and yourself. <br><br> Let us see how you did....",
    buttonText: "View Certificate"
};
let cutScenes = {
    1: {
        title: "Personality profile challenge",
        headline: "Know your personality ",
        content:
            "The wait is over! <br/><br/>Please click on the Play button. Answer all the questions honestly.<br/> We will process your application and announce the winners shortly. <br/><br/>Best of Luck!",
        buttonText: "Play",
        link: "/simulation_questions/1"
    }
};

let interviews = {
    1: {
        title: "Application Form",
        background:
            "/assets/images/configurable/simPics/blurred_application.jpg",
        presenter: "/assets/images/configurable/characters/hrlady.png",
        content:
            " The wait is over! Fill in the application form along with your business plan within the next 3 days. We will process your application and announce the winners shortly. Best of Luck!",
        buttonText: "Submit Application",
        link: "/result",
        questions: [
            {
                questionId: "A1",
                question: "Tell us your full name",
                options: []
            },
            {
                questionId: "A2",
                question: "Which college are you from?",
                options: []
            },
            {
                questionId: "A3",
                question: "Describe yourself in one sentence ",
                options: []
            },
            {
                questionId: "A4",
                question:
                    "Why do you think you would make a good entrepreneur?",
                options: [
                    ["I am persuasive", "Persuasive", 0],
                    ["I am unemotional", "Unemotional", 0],
                    ["I am self-confident", "Self-confident", 1],
                    ["I am energetic", "Energetic", 2]
                ]
            },
            {
                questionId: "A5",
                question: "What is your greatest weakness?",
                options: [
                    ["I am too stern", "Stern", 0],
                    ["I am too inhibited", "Inhibited", 0],
                    ["I am too restless", "Restless", 1],
                    ["I am too stubborn", "Stubborn", 2]
                ]
            },
            {
                questionId: "A6",
                question: "What is your biggest strength?",
                options: [
                    ["I am tactful", "Tactful", 0],
                    ["I am clear-thinking", "Clear-thinking", 0],
                    ["I am forward-looking", "Forward-looking", 1],
                    ["I am courageous", "Courageous", 2]
                ]
            }
        ]
    }
};

export {
    welcomeText,
    resultText,
    cutScenes,
    interviews,
};

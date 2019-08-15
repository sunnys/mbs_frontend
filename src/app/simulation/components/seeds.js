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
                questionId: "A4",
                question: "Why do you think you would make a good entrepreneur?",
                options: {
                    0:
                    {
                        option: "I am persuasive",
                        value: {
                            analytical: 0, 
                            creative: 1, 
                            methodical: 0, 
                            frugal: 1
                        },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1, 
                            balanced_approach: 0, 
                            time_management: 1, 
                            resourcefulness: 1
                        },
                        attributes: ["persuasive"]
                    },
                    1:
                    {
                        option: "I am unemotional",
                        value: {
                            analytical: 0, 
                            creative: 1, 
                            methodical: 0, 
                            frugal: 1
                        },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1, 
                            balanced_approach: 0, 
                            time_management: 1, 
                            resourcefulness: 1
                        },
                        attributes: ["unemotional"]
                    },
                    2:
                    {
                        option: "I am self-confident",
                        value: {
                            analytical: 0, 
                            creative: 1, 
                            methodical: 0, 
                            frugal: 1
                        },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1, 
                            balanced_approach: 0, 
                            time_management: 1, 
                            resourcefulness: 1
                        },
                        attributes: ["self-confident"]
                    },
                    3:
                    {
                        option: "I am energetic",
                        value: {
                            analytical: 0, 
                            creative: 1, 
                            methodical: 0, 
                            frugal: 1
                        },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1, 
                            balanced_approach: 0, 
                            time_management: 1, 
                            resourcefulness: 1
                        },
                        attributes: ["energetic"]
                    }
                }
            },
            {
                questionId: "A5",
                question: "What is your greatest weakness?",
                options: {
                    0:
                    {
                        option: "I am too stern",
                        value: {
                            analytical: 1, 
                            creative: 1, 
                            methodical: 1, 
                            frugal: 1
                        },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1, 
                            balanced_approach: 0, 
                            time_management: 1, 
                            resourcefulness: 1
                        },
                        attributes: ["Stern"]
                    },
                    1:
                    {
                        option: "I am too inhibited",
                        value: {
                            analytical: 0, 
                            creative: 1, 
                            methodical: 0, 
                            frugal: 1
                        },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1, 
                            balanced_approach: 0, 
                            time_management: 1, 
                            resourcefulness: 1
                        },
                        attributes: ["Inhibited"]
                    },
                    2:
                    {
                        option: "I am too restless",
                        value: {
                            analytical: 0, 
                            creative: 1, 
                            methodical: 0, 
                            frugal: 1
                        },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1, 
                            balanced_approach: 0, 
                            time_management: 1, 
                            resourcefulness: 1
                        },
                        attributes: ["Restless"]
                    },
                    3:
                    {
                        option: "I am too stubborn",
                        value: {
                            analytical: 0, 
                            creative: 1, 
                            methodical: 0, 
                            frugal: 1
                        },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1, 
                            balanced_approach: 0, 
                            time_management: 1, 
                            resourcefulness: 1
                        },
                        attributes: ["Stubborn"]
                    }
                }
            },
            {
                questionId: "A6",
                question: "What is your biggest strength?",
                options: {
                    0:
                    {
                        option: "I am tactful",
                        value: {
                            analytical: 1, 
                            creative: 1, 
                            methodical: 1, 
                            frugal: 1
                        },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1, 
                            balanced_approach: 0, 
                            time_management: 1, 
                            resourcefulness: 1
                        },
                        attributes: ["Tactful"]
                    },
                    1:
                    {
                        option: "I am clear-thinking",
                        value: {
                            analytical: 0, 
                            creative: 1, 
                            methodical: 0, 
                            frugal: 1
                        },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1, 
                            balanced_approach: 0, 
                            time_management: 1, 
                            resourcefulness: 1
                        },
                        attributes: ["Clear-thinking"]
                    },
                    2:
                    {
                        option: "I am forward-looking",
                        value: {
                            analytical: 0, 
                            creative: 1, 
                            methodical: 1, 
                            frugal: 1
                        },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1, 
                            balanced_approach: 0, 
                            time_management: 1, 
                            resourcefulness: 1
                        },
                        attributes: ["Forward-looking"]
                    },
                    3:
                    {
                        option: "I am courageous",
                        value: {
                            analytical: 0, 
                            creative: 1, 
                            methodical: 0, 
                            frugal: 1
                        },
                        competencies: {
                            problem_solving: 1, 
                            decision_making: 1, 
                            balanced_approach: 1, 
                            time_management: 1, 
                            resourcefulness: 1
                        },
                        attributes: ["Courageous"]
                    }
                }
            }
        ]
    }
};

let simulations = {
    1: {
        title: "Sparta Arena P&G Grid",
        headline: "Sparta Arena P&G Grid",
        content: "Download following excel sheet fill it in and re-upload it here",
        buttonText: "Download",
        link: "assets/samples/SpartaArenaPGGrid_Final_5Feb.xlsm",
        analytics: {
            endpoints: {
                1: {
                    name: "cprp",
                },
                2: {
                    name: "outlay",
                },
                3: {
                    name: "pt",
                },
                4: {
                    name: "grp",
                },
                5: {
                    name: "timeSlot",
                },
            },
            score: {
                name: "Score",
                cell: "G3"
            }
        }
    }
}

export {
    welcomeText,
    resultText,
    cutScenes,
    interviews,
    simulations
};

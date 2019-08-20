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
                questionId : "1",
                question: "Your are a part of a 10-member execution team. Your team lead is on leave due to a medical emergency. You have client deliverables and timelines. What will you do?",
                options: {
                    0: 
                    {
                        option: "I will take charge and make a plan of action",
                        value: {
                            ownership: 1,
                            passion_for_excellence: 0,
                            high_performance: 1, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 1, 
                            decision_making: 1,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Courageous","Leader","Dynamic","Authoritative","Enthusiastic","Energetic","Independent","Opportunistic","Self confident","Ambitious","Organized"]
                    },
                    1:
                    {
                        option: "I will wait for someone to take control of the team",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Individual Contributor"]
                    },
                    2:
                    {
                        option: "I will discuss with the client and push the timelines",
                        value: {
                            ownership: 1,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 1,
                            time_management: 1
                    },
                        attributes: ["Forward looking","Customer focused","Realistic","Practical"]
                    },
                    3:
                    {
                        option: "I will do my part of work only",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Individual contributor", "Realistic"]
                    },
                }
            }, 
            {
                questionId : "2",
                question: "You are a Sales Head for the company. The management has proposed to launch a sales campaign for one of the offerings to increase sales by 15%.  You have to achieve your targets. However, your Marketing Head has resigned. What will you do?",
                options: {
                    0: 
                    {
                        option: "I will lead and guide the marketing team to actively launch the campaign",
                        value: {
                            ownership: 1,
                            passion_for_excellence: 1,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 1, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Independent","Opportunistic","Leader","Authoritative","Ambitious","Forward looking","Dynamic"," Energetic","Courageous","Enthusiastic","Self-confident"]
                    },
                    1:
                    {
                        option: "I will discuss with the management team and try to postpone the launch",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 1
                    },
                        attributes: ["Influencer","Customer focused","Realistic","Persuasive"]
                    },
                    2:
                    {
                        option: "I will work without a marketing plan and let the management team figure out the marketing strategy",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Individual Contributor","StubbornIndividual Contributor","Stubborn"]
                    },
                    3:
                    {
                        option: "I will look up to the marketing team to help me with whatever is required for the campaign and device a sales strategy",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 1,
                            time_management: 0
                    },
                        attributes: ["Independent", "Persuasive"]
                    },
                }
            }, 
            {
                questionId : "3",
                question: "You have been promoted to become a Manager and you handle a team of 5 members now. One of your team mates who is a high perfomer has not done her job this time. You have to deliver to the client. What will you do?",
                options: {
                    0: 
                    {
                        option: "I will first complete the assignment myself and then speak to her about it.",
                        value: {
                            ownership: 1,
                            passion_for_excellence: 1,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1,
                            balanced_approach: 0,
                            time_management: 1
                    },
                        attributes: ["Leader","Customer focused","Team player","Efficient","Realistic","Forward looking","Self confident"]
                    },
                    1:
                    {
                        option: "I will speak to her about why the work is not done. I will tell her to complete the assignment all by herself.",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Stubborn", "Outspoken", "Practical"]
                    },
                    2:
                    {
                        option: "I will speak to her about why the work is not done. I will also help her complete the assignment to meet deadlines. ",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 1
                    },
                        competencies: {
                            problem_solving: 1, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Leader","Clear thinking","Customer focused","Team player","Practical"]
                    },
                    3:
                    {
                        option: "I will handle the situation for the time being but I will make sure that the same thing does not happen again. ",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 1
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 1,
                            time_management: 0
                    },
                        attributes: ["Leader","Realistic","Team player","Dynamic","Practical","Self confident"]
                    },
                }
            }, 
            {
                questionId : "4",
                question: "You have been working on a very important project and you have a devised a plan to achieve the targets. You happen to discuss the same with one of your colleagues. He points out an important point that you have missed and working on it helps you achieve your goal. You also get lots of appreciation from your boss. What will you do? ",
                options: {
                    0: 
                    {
                        option: "I will take all the credits for the project as I made the plan and executed it. ",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Opportunistic"]
                    },
                    1:
                    {
                        option: "I will speak to my boss about that colleague and share the credits with him.",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 1, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Clear thinking","Team player","Sociable","Outspoken","Self confident"]
                    },
                    2:
                    {
                        option: "I will speak to the colleague about not telling anyone of the discussion we had. ",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Opportunistic","Influencer","Authoritative","Individual contributor","Persuasive", "Outspoken"]
                    },
                    3:
                    {
                        option: "I will tell the team about the point I missed and how the colleague helped me realise it.",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 1, 
                            team_spirit: 1
                    },
                        competencies: {
                            problem_solving: 1, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Leader","Influencer","Clear thinking","Team player","Courageous"]
                    },
                }
            }, 
            {
                questionId : "5",
                question: "One of your regional managers has resigned and you have been given the responsibility of recommending a suitable person for the role. You have two people in mind - one, who is a really good acquaintance of yours and the other is a high performer. What will you do?",
                options: {
                    0: 
                    {
                        option: "I will give preference to the high performer as it is important for the role. ",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 1, 
                            meritocracy:  1, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Clear thinking","Customer focused","Practical","Realistic","Forward looking","Dynamic"]
                    },
                    1:
                    {
                        option: "I will give preference to my acquaintance as he will feel bad once he knows it.",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Sociable"]
                    },
                    2:
                    {
                        option: "I will look at the performance matrices of my acquaintance and then decide.",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 1, 
                            meritocracy: 1, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1,
                            balanced_approach: 1,
                            time_management: 0
                    },
                        attributes: ["Practical","Realistic","Forward looking"]
                    },
                    3:
                    {
                        option: "I will prefer not recommending anyone for the role and leave the decision with the HR Head.",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Clear thinking","Individual contributor","Practical","Stubborn"]
                    },
                }
            }, 
            {
                questionId : "6",
                question: "Your PM has jotted a framework within which the work has to be done. In the process, you find a key point which seems to be missed. It will help you and your team excel. Will you point it out? If yes, will you take the responsibility up? ",
                options: {
                    0: 
                    {
                        option: "Yes. I will point it out and take the responsibility up as it will help us excel as a team. ",
                        value: {
                            ownership: 1,
                            passion_for_excellence: 1,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Opportunistic","Ambitious","Clear thinking","Energetic"," Courageous"," Outspoken","Innovative"," Authoritative","Self Confident"]
                    },
                    1:
                    {
                        option: "No. I won't point it out.",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Stubborn", "Individual Contributor"]
                    },
                    2:
                    {
                        option: "Yes. I will point it out but I won’t be able to take the responsibility. ",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Clear thinking","Practical","Individual contributor","Outspoken","Innovative","Courageous"]
                    },
                    3:
                    {
                        option: "Yes. I will point it out but would prefer sticking to the plan. ",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 1,
                            time_management: 0
                    },
                        attributes: ["Clear thinking","Individual contributor","Practical","Innovative","Stubborn","Outspoken"]
                    },
                }
            }, 
            {
                questionId : "7",
                question: "You have a qualitative experience in client interaction and communication over your team mates. But this time, the client is somebody who you personally know as pricky. Given an option would you choose to handle him or let someone else handle it? ",
                options: {
                    0: 
                    {
                        option: "I would like to handle the client as I know him personally which will act as an added advantage.",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 1,
                            high_performance: 1, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 1,
                            time_management: 0
                    },
                        attributes: ["Opportunistic","Ambitious","Authoritative","Courageous","Enthusiastic","Customer focused","Forward Looking"]
                    },
                    1:
                    {
                        option: "I would like to handle the client as I have qualities for a smooth interactions. ",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 1,
                            high_performance: 1, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Opportunistic","Ambitious","Clear thinking","Realistic","Self Confident","Energetic","Efficient","Customer focused","Forward looking"]
                    },
                    2:
                    {
                        option: "No, I would let someone else do it as I feel I am already good at client interaction and don't find it challenging anymore. ",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Independent","Clear thinking","Realistic","Practical","Outspoken","Self confident"]
                    },
                    3:
                    {
                        option: "No, I would let someone else do it as I know the client personally and the hurdles that would arise in the project. ",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Clear thinking","Realistic","Practical","Outspoken"]
                    },                }
            }, 
            {
                questionId : "8",
                question: "You are assigned a team leader for a project and you have allocated work to your team mates. You know your team and their skills. Would you still prefer to micro-manage the team or trust them fully with the tasks?",
                options: {
                    0: 
                    {
                        option: "I would let the team perform according to their skills.",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 1, 
                            team_spirit: 1
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Leader","Team Player","Organized"]
                    },
                    1:
                    {
                        option: "I would prefer micro-managing the team for daily updates.",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 1
                    },
                        attributes: ["Authoritative","Persuasive","Stubborn"]
                    },
                    2:
                    {
                        option: "I would take a stock on a weekly basis only and guide them through.",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 1,
                            time_management: 1
                    },
                        attributes: ["Leader","Authoritative"," Team Player","Organized","Efficient"]
                    },
                    3:
                    {
                        option: "I would micro-manage basis the skills of each individual and lead accordingly. ",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 1,
                            time_management: 0
                    },
                        attributes: ["Leader","Authoritative","Clear Thinking","Team Player","Dynamic","Innovative","Organized","Efficient","Self confident"]
                    },
                }
            }, 
            {
                questionId : "9",
                question: "Your organisation has introduced a Rewards and Recognition program. You are now competing with different teams in the organisation. Would you keep doing your usual work or get into the race of winning rewards?",
                options: {
                    0: 
                    {
                        option: "I will strive for rewards as they will gain me monetary benefits and also recognition. ",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 1, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Ambitious","Forward Looking","Dynamic","Courageous","Practical","Enthusiastic","Self confident","Energetic"]
                    },
                    1:
                    {
                        option: "I would go for the program and change the style of working as it would elevate my status in the organisation. ",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 1,
                            high_performance: 1, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Opportunistic","Ambitious","Dynamic","Energetic","Courageous","Practical","Enthusiastic","Self confident","Forward Looking"]
                    },
                    2:
                    {
                        option: "I would keep doing my usual work consistently as I know I will be rewarded in any case. ",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Independent","Realistic","Stubborn","Individual contributor"]
                    },
                    3:
                    {
                        option: "I would keep doing my usual work no matter what programs are launched. ",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Stubborn", "Individual contributor"]
                    },
                }
            }, 
            {
                questionId : "10",
                question: "You are a sales team manager and your team has been performing consistently low. One of your team mates suggested an innovative way for the product demo. Would you try it?  ",
                options: {
                    0: 
                    {
                        option: "Yes I would like to try it and give credit to the team mate.",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 1,
                            high_performance: 0, 
                            meritocracy: 1, 
                            team_spirit: 1
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Leader","Team Player","Forward Looking","Innovative","Practical","Enthusiastic","Customer focused"]
                    },
                    1:
                    {
                        option: "Yes I would try it and if it is successful I will keep the credits to myself.",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Opportunistic", "Individual contributor"]
                    },
                    2:
                    {
                        option: "I will discard the idea in the meeting and try it later.",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 1, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Opportunistic", "Individual contributor", "Stubborn"]
                    },
                    3:
                    {
                        option: "No I won't try it as I feel it is not the way for product demos.",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Stubborn","Individual contributor","Organized"]
                    },
                }
            }, 
            {
                questionId : "11",
                question: "What best describes you?",
                options: {
                    0: 
                    {
                        option: "Leader",
                        value: {
                            ownership: 1,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 1, 
                            decision_making: 1,
                            balanced_approach: 0,
                            time_management: 1
                    },
                        attributes: ["Ambitious","Authoritative","Forward looking","Dynamic","Energetic","Enthusiastic","Efficient","Self confident"]
                    },
                    1:
                    {
                        option: "Achiever",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 1, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1,
                            balanced_approach: 0,
                            time_management: 1
                    },
                        attributes: ["Independent","Opportunistic","Influencer","Ambitious","Persuasive","Dynamic","Energetic","Stubborn","Courageous","Innovative","Outspoken","Efficient","Self confident"]
                    },
                    2:
                    {
                        option: "Follower",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 1
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Team player", "Sociable"]
                    },
                    3:
                    {
                        option: "Winner",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 1, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Independent","Ambitious","Forward Looking","Dynamic","Energetic","Courageous","Individual contributor","Enthusiastic","Self confident","Efficient"]
                    },
                }
            }, 
            {
                questionId : "12",
                question: "If you were climbing a mountain, and a member of your team couldn't go on, what would you do?",
                options: {
                    0: 
                    {
                        option: "Turn the whole team round and go back down",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 1,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 1
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 1,
                            time_management: 0
                    },
                        attributes: ["Leader","Authoritative","Persuasive","Team Player","Stubborn","Courageous","Sociable"]
                    },
                    1:
                    {
                        option: "Split the team up, some to go up and some to stay down",
                        value: {
                            ownership: 1,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 1
                    },
                        competencies: {
                            problem_solving: 1, 
                            decision_making: 0,
                            balanced_approach: 1,
                            time_management: 1
                    },
                        attributes: ["Influencer","Persuasive","Forward Looking","Team Player","Dynamic","Courageous","Innovative","Organized","Practical","Efficient","Self confident"]
                    },
                    2:
                    {
                        option: "Leave him with the team and carry on your own",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Independent","Authoritative","Stubborn","Individual contributor"]
                    },
                    3:
                    {
                        option: "Carry on with the rest of the team, you'll get him on the way back",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 1, 
                            decision_making: 1,
                            balanced_approach: 0,
                            time_management: 1
                    },
                        attributes: ["Influencer","Authoritative","Persuasive","Courageous","Individual Contributor","Practical","Outspoken"]
                    },
                }
            }, 
            {
                questionId : "13",
                question: "How do you think other people might describe you?",
                options: {
                    0: 
                    {
                        option: "A leader",
                        value: {
                            ownership: 1,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 1, 
                            decision_making: 1,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Independent","Leader","Influencer","Ambitious","Authoritative","Persuasive","Forward looking","Dynamic","Courageous","Innovative","Outspoken","Enthusiastic","Energetic","Efficient","Self confident"]
                    },
                    1:
                    {
                        option: "A hardworker",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 1, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 1, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Energetic", "Individual contributor", "Self confident"]
                    },
                    2:
                    {
                        option: "A performer",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 1, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 1, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 1
                    },
                        attributes: ["Independent","Ambitious","Dynamic","Energetic","Enthusiastic","Self confident"]
                    },
                    3:
                    {
                        option: "An energizer",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 1
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Influencer","Team Player","Dynamic","Energetic","Persuasive","Sociable","Enthusiastic","Self confident"]
                    },
                }
            }, 
            {
                questionId : "14",
                question: "As an individual, I always ______________. ",
                options: {
                    0: 
                    {
                        option: "Like to take a lead",
                        value: {
                            ownership: 1,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 1, 
                            decision_making: 1,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Independent","Opportunistic","Leader","Influencer","Ambitious","Authoritative","Persuasive","Forward looking","Dynamic","Courageous","Practical","Outspoken","Enthusiastic","Self confident"]
                    },
                    1:
                    {
                        option: "Like to excel",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 1,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Ambitious","Forward looking","Dynamic"," Energetic","Courageous","Innovative","Enthusiastic","Efficient","Self confident"]
                    },
                    2:
                    {
                        option: "Like to be approachable",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 1
                    },
                        competencies: {
                            problem_solving: 1, 
                            decision_making: 0,
                            balanced_approach: 1,
                            time_management: 0
                    },
                        attributes: ["Influencer","Realistic","Persuasive","Team Player","Sociable","Practical","Customer focused"]
                    },
                    3:
                    {
                        option: "Like to win",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 1, 
                            meritocracy: 1, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 1,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Independent","Ambitious","Clear thinking","Forward looking","Dynamic","Energetic","Courageous","Practical","Efficient","Self confident"]
                    },
                }
            }, 
            {
                questionId : "15",
                question: "Which of these sorts of car would you most likely choose?",
                options: {
                    0: 
                    {
                        option: "Single seater car",
                        value: {
                            ownership: 1,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Independent","Opportunistic","Authoritative","Realistic","Individual contributor","Practical","Self Confident"]
                    },
                    1:
                    {
                        option: "People carrier",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 1
                    },
                        competencies: {
                            problem_solving: 1, 
                            decision_making: 0,
                            balanced_approach: 1,
                            time_management: 0
                    },
                        attributes: ["Influencer","Customer focused","Persuasive","Team Player","Sociable","Organized"]
                    },
                    2:
                    {
                        option: "Sports car",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 0,
                            high_performance: 1, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 1
                    },
                        attributes: ["Leader","Ambitious","Forward looking","Dynamic","Energetic","Courageous","Enthusiastic"]
                    },
                    3:
                    {
                        option: "Luxury car",
                        value: {
                            ownership: 0,
                            passion_for_excellence: 1,
                            high_performance: 0, 
                            meritocracy: 0, 
                            team_spirit: 0
                    },
                        competencies: {
                            problem_solving: 0, 
                            decision_making: 0,
                            balanced_approach: 0,
                            time_management: 0
                    },
                        attributes: ["Clear thinking","Organized","Practical","Efficent","Self confident","Realistic","Dynamic","Innovative"]
                    },
                }
            }, 
            
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

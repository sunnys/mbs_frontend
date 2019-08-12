import _ from "lodash";
import {
    preprocessLoginDetails,
    validateLoginDetails,
    AuthenticationAction
} from "../../redux/Authentication.action.react";
import {
    AppConfig
} from "config/app.config";
import { getAppConfig } from "config/client.config";
describe("Authentication Action Test Cases", () =>{
    let promise = Promise.resolve(123);
    // const preprocessLoginDetails = jest.fn(() => promise);
    it("should downcase all the characters of Email / Username or any other model field before sending it to sever for authentication check.", () => {
        const inputDetailsTypes = [{
            email: "Ankit.gandhi@quodeck.com",
            password: "password123"
        }, {
            email: "Ankit.Gandhi@quodeck.com",
            password: "password123"
        }, {
            email: "Ankit.gandhi@quodeck.com ",
            password: "passwo rd123"
        }, {
            email: " Ankit.gandhi@quodeck.com",
            password: "password123 "
        }]

        const expectedOutput = {
            processedFirstField: "ankit.gandhi@quodeck.com",
            processedPasswordField: "password123"
        }

    
        expect(preprocessLoginDetails(inputDetailsTypes[0].email, inputDetailsTypes[0].password)).toEqual(
            expectedOutput
        )
        expect(preprocessLoginDetails(inputDetailsTypes[1].email, inputDetailsTypes[1].password)).toEqual(
            expectedOutput
        )
        expect(preprocessLoginDetails(inputDetailsTypes[2].email, inputDetailsTypes[2].password)).toEqual(
            expectedOutput
        )
        expect(preprocessLoginDetails(inputDetailsTypes[3].email, inputDetailsTypes[3].password)).toEqual(
            expectedOutput
        )

    })
    it("should trim(remove) trailing or preseding spaces Email / Username or any other model field before sending it to sever for authentication check.", () => {
        const inputDetailsTypes = [{
            email: "Ankit.gandhi@quodeck.com",
            password: "password123"
        }, {
            email: "Ankit.Gandhi@quodeck.com",
            password: "password123"
        }, {
            email: "Ankit.gandhi@quodeck.com ",
            password: "passwo rd123"
        }, {
            email: " Ankit.gandhi@quodeck.com",
            password: "password123 "
        }]

        const expectedOutput = {
            processedFirstField: "ankit.gandhi@quodeck.com",
            processedPasswordField: "password123"
        }


        expect(preprocessLoginDetails(inputDetailsTypes[0].email, inputDetailsTypes[0].password)).toEqual(
            expectedOutput
        )
        expect(preprocessLoginDetails(inputDetailsTypes[1].email, inputDetailsTypes[1].password)).toEqual(
            expectedOutput
        )
        expect(preprocessLoginDetails(inputDetailsTypes[2].email, inputDetailsTypes[2].password)).toEqual(
            expectedOutput
        )
        expect(preprocessLoginDetails(inputDetailsTypes[3].email, inputDetailsTypes[3].password)).toEqual(
            expectedOutput
        )
        // const preprocessLoginDetails = jest.fn(() => promise);
        // AuthenticationAction.login(inputDetailsTypes[0].email, inputDetailsTypes[0].password, getAppConfig().apiUrls.apiUrl)

        // expect(preprocessLoginDetails).toBeCalled()
    })
    it("should check for spaces in password filed and remove it before sending it to server. As password cannot contain space", () => {
        const inputDetailsTypes = [{
            email: "Ankit.gandhi@quodeck.com",
            password: "password123"
        }, {
            email: "Ankit.Gandhi@quodeck.com",
            password: "password123"
        }, {
            email: "Ankit.gandhi@quodeck.com ",
            password: "passwo rd123"
        }, {
            email: " Ankit.gandhi@quodeck.com",
            password: "password123 "
        }]

        const expectedOutput = {
            processedFirstField: "ankit.gandhi@quodeck.com",
            processedPasswordField: "password123"
        }


        expect(preprocessLoginDetails(inputDetailsTypes[0].email, inputDetailsTypes[0].password)).toEqual(
            expectedOutput
        )
        expect(preprocessLoginDetails(inputDetailsTypes[1].email, inputDetailsTypes[1].password)).toEqual(
            expectedOutput
        )
        expect(preprocessLoginDetails(inputDetailsTypes[2].email, inputDetailsTypes[2].password)).toEqual(
            expectedOutput
        )
        expect(preprocessLoginDetails(inputDetailsTypes[3].email, inputDetailsTypes[3].password)).toEqual(
            expectedOutput
        )
        // const preprocessLoginDetails = jest.fn(() => promise);
        // AuthenticationAction.login(inputDetailsTypes[0].email, inputDetailsTypes[0].password, getAppConfig().apiUrls.apiUrl)

        // expect(preprocessLoginDetails).toBeCalled()
    })
    it("should check for email validation, i.e if '@' present or not when the authentication mechanism is email based only", () => {
        const inputDetailsTypes = [{
            email: "Ankit.gandhi@quodeck.com",
            password: "password123"
        }, {
            email: "Ankit.Gandhi@quodeck.com",
            password: "password123"
        }, {
            email: "Ankit.gandhi@quodeck.com ",
            password: "passwo rd123"
        }, {
            email: " Ankit.gandhiquodeck.com",
            password: "password123 "
        }]

        const expectedOutputError = "Email is invalid format, please check the email you have entered."
        const expectedOutput = null


        expect(validateLoginDetails(inputDetailsTypes[0].email, "email")).toEqual(
            expectedOutput
        )
        expect(validateLoginDetails(inputDetailsTypes[1].email, "email")).toEqual(
            expectedOutput
        )
        expect(validateLoginDetails(inputDetailsTypes[2].email, "email")).toEqual(
            expectedOutput
        )
        expect(validateLoginDetails(inputDetailsTypes[3].email, "email")).toEqual(
            expectedOutputError
        )
        // const preprocessLoginDetails = jest.fn(() => promise);
        // AuthenticationAction.login(inputDetailsTypes[0].email, inputDetailsTypes[0].password, getAppConfig().apiUrls.apiUrl)

        // expect(preprocessLoginDetails).toBeCalled()
    })
})
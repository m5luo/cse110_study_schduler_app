import { API_BASE_URL } from "../constants";
import { User, UserCredentials } from "../types/types";

// Function to create an user in the backend. Method: POST
export const createUser = async (user: User): Promise<UserCredentials> => {
    // console.log(expense)
    console.log(JSON.stringify(user))
	const response = await fetch(`${API_BASE_URL}/register`, {
    	method: "POST",
    	headers: {
        	"Content-Type": "application/json",
    	},
    	body: JSON.stringify(user),
	});
	if (!response.ok) {
    	throw new Error("Failed to register user");
	}
	return response.json();
};

export const updateUser = async (token: string, password: string): Promise<UserCredentials> => {
    // console.log(expense)
    console.log(JSON.stringify(password))
	const response = await fetch(`${API_BASE_URL}/reset-password`, {
    	method: "POST",
    	headers: {
        	"Content-Type": "application/json",
    	},
    	body: JSON.stringify({ "token": token, "newPassword": password }),
	});
	if (!response.ok) {
    	throw new Error("Failed to register user");
	}
	return response.json();
};

export const sendEmail = async (email: string): Promise<UserCredentials> => {
    // console.log(expense)
    console.log(JSON.stringify(email))
	const response = await fetch(`${API_BASE_URL}/forgot-password`, {
    	method: "POST",
    	headers: {
        	"Content-Type": "application/json",
    	},
    	body: JSON.stringify({"email": email}),
	});
	if (!response.ok) {
    	throw new Error("Failed to send email");
	}
	return response.json();
};

export const loginUser = async (user: User): Promise<UserCredentials> => {
    console.log(JSON.stringify(user))
    const response = await fetch(`${API_BASE_URL}/login`, {
    	method: "POST",
    	headers: {
        	"Content-Type": "application/json",
    	},
    	body: JSON.stringify(user),
	});
	if (!response.ok) {
    	throw new Error("Failed to login user");
	}
	return response.json();
}
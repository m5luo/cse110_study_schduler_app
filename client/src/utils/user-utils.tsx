import { API_BASE_URL } from "../constants";
import { User, UserCredentials } from "../types/types";

// Function to create an user in the backend. Method: POST
export const createUser = async (user: User): Promise<User> => {
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
import axios from "axios";
import { HoldingItem, Transaction, AuthData } from "../common/modelTypes";

const API = axios.create({baseURL: process.env.REACT_APP_API /* "http://localhost:8000" */   })

//Holdings
export const fetchHoldings = (userId: string) =>
  API.get("/holdings", { params: { userId: userId } });

export const addHolding = (newHolding: HoldingItem) =>
  API.post("/holdings", newHolding);

export const updateHolding = (name: string, updatedHolding: HoldingItem) =>
  API.patch(`${"/holdings"}/${name}`, updatedHolding);


export const deleteHolding = (formData: Object) =>
  API.post(`${"/holdings"}/delete`, formData);

//Transactions history
export const fetchTransactions = (userId: string) =>
  API.get("/transactions", { params: { userId: userId } });

export const addTransaction = (newTransaction: Transaction) =>
  API.post("/transactions", newTransaction);

//Auth
export const registerUser = (userData: AuthData) =>
  API.post("/register", userData);

export const loginUser = (userData: AuthData) => API.post("/login", userData);

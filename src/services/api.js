import axios from "../utils/axios";
import { backendAPI } from "../components/General";
import api from "./constants";

class Api {
    constructor() {
        this.baseUrl = process.env.API_URL ?? backendAPI;
        this.headers = {
            "Content-type": "application/json",
        };
    }
    config() {
        const token = localStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            "x-auth-token": token,
        };
        return { headers };
    }

    async getUserBillAbs() {
        try {
            const config = this.config();
            let res = await axios.get(this.baseUrl + api.GET_USER_BILL_ABSTRACT, config);

            return res;
        } catch (err) {
            return err.response;
        }
    }

    async getCustomers() {
        try {
            const config = this.config();
            let res = await axios.get(this.baseUrl + api.GET_CUSTOMERS, config);

            return res;
        } catch (err) {
            return err.response;
        }
    }

    async getInventory() {
        try {
            const config = this.config();
            console.log(config);
            let res = await axios.get(this.baseUrl + api.GET_INVENTORIES, config);
            return res;
        } catch (err) {
            return err.response;
        }
    }

    async getWorkflow() {
        try {
            const config = this.config();
            let res = await axios.get(this.baseUrl + api.GET_WORKFLOW, config);
            return res;
        } catch (err) {
            return err.response;
        }
    }
    async login(credentials) {
        try {
            let res = await axios.post(this.baseUrl + api.LOGIN, credentials);
            return res;
        } catch (err) {
            return err.response;
        }
    }
}

const API = new Api();

export default API;

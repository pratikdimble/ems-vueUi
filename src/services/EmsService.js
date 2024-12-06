import axios from "axios";
import { EmsModel} from "./EmsModel";

const API_BASE_URL = "http://localhost:8080/ems";

export const EmsService = {
  async getEmployees() {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch employees");
    }
  },

  async addEmployee(emp) {
    const validationErrors = EmsModel.validate(emp);
    if (Object.keys(validationErrors).length > 0) {
      throw validationErrors;
    }
    try {
      const response = await axios.post(API_BASE_URL, emp);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add employee");
    }
  },

  async updateEmployee(emp) {
    const validationErrors = EmsModel.validate(emp);
    if (Object.keys(validationErrors).length > 0) {
      throw validationErrors;
    }
    try {
      const response = await axios.put(`${API_BASE_URL}/${emp.employeeId}`, emp);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update employee");
    }
  },

  async deleteEmployee(id) {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      throw new Error("Failed to delete employee");
    }
  },
}
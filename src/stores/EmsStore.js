import { defineStore } from 'pinia';
import { EmsModel } from "../services/EmsModel";
import { EmsService } from "../services/EmsService";
export const useEmsStore = defineStore('emsStore', {
    state: () => ({
        empList: [],
        loading: false,
        error: null,
        validationErrors: {},
    }),
    actions: {
        async fetchEmps() {
            this.loading = true;
            try {
                this.empList = await EmsService.getEmployees()
            } catch (err) {
                this.error = 'Failed to fetch employees';
            } finally {
                this.loading = false;
            }
        },
        async addEmployee(newEmp) {
            const errors = EmsModel.validate(newEmp);
            if (Object.keys(errors).length > 0) {
                this.validationErrors = errors;
            }

            // Add Service.addTodo()


        },
        async updateEmployee(updatedEmp) {
            const index = this.empList.findIndex((emp) => emp.employeeId === updatedEmp.employeeId);
            if (index !== -1) {
                this.empList[index] = { ...updatedEmp };
            } else {
                this.error = 'Employee not found';
            }

            // Add Service.updateTodo()


        },
        async deleteEmployee(id) {
            this.empList = this.empList.filter((emp) => emp.employeeId !== id);

            // Add Service.deleteTodo()
        },
    },
});

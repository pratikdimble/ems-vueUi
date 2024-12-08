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
            this.loading = true;
            const errors = EmsModel.validate(newEmp);
            if (Object.keys(errors).length > 0) {
                this.validationErrors = errors;
            }else{
                try {
                    await EmsService.addEmployee(newEmp)
                } catch (err) {
                    this.error = 'Failed to add employee';
                } finally {
                    this.loading = false;
                }
            }
        },
        async updateEmployee(updatedEmp) {
            const index = this.empList.findIndex((emp) => emp.employeeId === updatedEmp.employeeId);
            const errors = EmsModel.validate(updatedEmp);
            if (Object.keys(errors).length > 0) {
                this.validationErrors = errors;
            }else{
                if (index !== -1) {
                    await EmsService.updateEmployee(updatedEmp)
                } else {
                    this.error = 'Employee not found';
                }
            }
        },
        async deleteEmployee(id) {
            const index = this.empList.findIndex((emp) => emp.employeeId === id);
            if (index !== -1) {
                await EmsService.deleteEmployee(id)
            } else {
                this.error = 'Employee not found';
            }    
        },
        
        async getEmployeeByDepartment(dept) {
            this.loading = true;
            try {
                this.empList = await EmsService.getEmployeeByDepartment(dept)
            } catch (err) {
                this.error = 'Failed to fetch employees';
            } finally {
                this.loading = false;
            }   
        },
        
        async sortEmployeeByJoiningDate(order) {
            this.loading = true;
            try {
                this.empList = await EmsService.sortEmployeeByJoiningDate(order)
            } catch (err) {
                this.error = 'Failed to fetch employees';
            } finally {
                this.loading = false;
            }   
        },
    },
});

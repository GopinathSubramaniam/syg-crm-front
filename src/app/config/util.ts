
export class Util {
    static URL = {
        BASE: 'http://localhost:8080'
        // BASE: 'http://13.127.165.227:8080/sygcrm'
    }

    static PERMISSIONS = {
        IS_SUPER_ADMIN: () => {
            return localStorage.getItem('userType') == 'SA';
        },
        IS_ADMIN: () => {
            return localStorage.getItem('userType') == 'A';
        },
        IS_EMPLOYEE: () => {
            return localStorage.getItem('userType') == 'E';
        }
    }

    static PAGE = {
        FIRST_PAGE: 0,
        PER_PAGE: 10,
        PAGES: [10, 25, 100, 500],
    }

    static MSG = {
        ERROR_MSG: "Something Went wrong. Please logout and logback in"
    }

    static getHeaders() {
        const userName: any = localStorage.getItem('userName');
        const companyId: any = localStorage.getItem('companyId');
        const branchId: any = localStorage.getItem('branchId');
        const userDetailId: any = localStorage.getItem('userDetailId');
        const token: any = localStorage.getItem('token');

        const auth = `${companyId}~${branchId}~${userDetailId}~${token}~${userName}`;

        const headers = { headers: { auth: btoa(auth) } };

        return headers;
    }

    static getStatusObj(val: any) {
        let statusObj = { label: '', className: '' };
        switch (val) {
            case 'TD':
                statusObj = { label: 'To Do', className: 'text-secondary' };
                break;
            case 'IP':
                statusObj = { label: 'In Progress', className: 'text-primary' };
                break;
            case 'C':
                statusObj = { label: 'Complete', className: 'text-success' };
                break;
        }
        return statusObj;
    }

    static getPriorityObj(val: any) {
        let priorityObj = { label: '', className: '' };
        switch (val) {
            case '0':
                priorityObj = { label: 'Low', className: 'text-secondary' };
                break;
            case '1':
                priorityObj = { label: 'Medium', className: 'text-primary' };
                break;
            case '2':
                priorityObj = { label: 'High', className: 'text-danger' };
                break;
            case '3':
                priorityObj = { label: 'Immediate', className: 'text-warning' };
                break;

        }
        return priorityObj;
    }
}
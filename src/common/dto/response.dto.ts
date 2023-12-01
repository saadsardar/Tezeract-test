export class ApiResponse<T = any> {
    constructor(
        public success: boolean = true,
        public message?: string,
        public data?: T
    ) { }
}

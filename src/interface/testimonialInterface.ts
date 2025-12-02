export interface ITestimonial {
    comment: string;
    file: string;
    name: string;
    designation: string;
    company: string;
    isDeleted: boolean;
    deletedAt: Date;
}

export interface ITestimonialResponse {
    message: string;
    success: boolean;
    result?: ITestimonial;
}

export interface ITestimonialPaginationResponse {
    message: string;
    success: boolean;
    results?: ITestimonial[];
    page: number;
    totalPages: number;
    totalCount: number;
}

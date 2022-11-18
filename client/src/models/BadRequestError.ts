export default interface BadRequestError {
    messages: { property: string; errors: string[] }[];
    statusCode: 400;
}

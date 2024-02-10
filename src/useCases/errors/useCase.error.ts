export interface UseCaseError extends Error {
  HTTPStatusCode: number;
}

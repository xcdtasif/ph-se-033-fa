import { getErrorMessage } from "@/lib/utils";

export function useApiError() {
  return (error: unknown): string => {
    const message = getErrorMessage(error);
    console.error("API Error:", message);
    return message;
  };
}

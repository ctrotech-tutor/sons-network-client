// lib/queryClient.ts
import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Type guard to check if an error is a Supabase PostgrestError.
 * These errors have properties like `code`, `details`, `hint`, `message`.
 */
const isPostgrestError = (error: unknown): error is PostgrestError => {
  return typeof error === 'object' && error !== null && 'code' in error && 'message' in error;
};

/**
 * Global query error handler
 */
const handleQueryError = (error: unknown) => {
  console.error(`[Query Error]:`, error);
  const message = isPostgrestError(error) ? error.message : "An error occurred while fetching data.";
  toast.error(message);
};

/**
 * Global mutation error handler
 */
const handleMutationError = (error: unknown) => {
  console.error(`[Mutation Error]:`, error);
  const message = isPostgrestError(error) ? error.message : "An error occurred while performing the action.";
  toast.error(message);
};

/**
 * Main QueryClient instance for the app
 */
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleQueryError,
  }),
  mutationCache: new MutationCache({
    onError: handleMutationError,
  }),
  defaultOptions: {
    queries: {
      // We can keep refetchOnWindowFocus, it's good for data freshness
      refetchOnWindowFocus: true,
      // Stale time of 5 minutes
      staleTime: 1000 * 60 * 5,
      // Garbage collection time of 30 minutes
      gcTime: 1000 * 60 * 30,
      // Retry logic
      retry: (failureCount, error) => {
        // Don't retry on Supabase auth errors or specific data errors (e.g., 4xx)
        if (isPostgrestError(error)) {
          const errorCode = parseInt(error.code, 10);
          if (errorCode >= 400 && errorCode < 500) {
            return false;
          }
        }
        // For other errors, retry up to 2 times
        return failureCount < 2;
      },
    },
  },
});

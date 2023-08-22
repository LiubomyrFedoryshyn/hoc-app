import { useEffect, useState } from "react";
import type { AllCharacters } from "./api-client";
import { getAllCharacters } from "./api-client";

/*
Your task is to implement a custom React hook called `useAllCharactersQuery`,
which will be used by other React components or hooks to retrieve all the characters
from the Rick and Morty API.

Your implementation should satisfy the following requirements:

  - Your hook should use the provided `getAllCharacters` function (already implemented)
  to fetch the data from the API endpoint

  - Your hook should return an object with the following fields:
 */

type AllCharactersQuery = {
  // status: a string indicating the current status of the query.
  // This should be one of "loading", "error", or "success".
  status: "loading" | "error" | "success";
  // isLoading: a boolean indicating whether the query is currently loading or not.
  isLoading: boolean;
  // isError: a boolean indicating whether an error occurred during the query or not.
  isError: boolean;
  // isSuccess: a boolean indicating whether the query was successful or not.
  isSuccess: boolean;
  // data: the fetched data from the API, of type AllCharacters.
  //  This field should be undefined unless the query is successful.
  data?: AllCharacters;
  // error: the error object that occurred during the query.
  // This field should be undefined unless the query resulted in an error.
  error?: unknown;
};

export function useAllCharactersQuery(): AllCharactersQuery {
  const [queryState, setQueryState] = useState<AllCharactersQuery>({
    status: "loading",
    isLoading: true,
    isError: false,
    isSuccess: true,
    data: undefined,
    error: undefined,
  });

  useEffect(() => {
    const receiveAllCharacters = async () => {
      try {
        const data = await getAllCharacters();
        setQueryState((queryState) => ({
          ...queryState,
          data,
          isSuccess: true,
          isLoading: false,
          status: "success",
        }));
      } catch (error) {
        setQueryState((queryState) => ({
          ...queryState,
          error,
          isError: true,
          isLoading: false,
          status: "error",
        }));
      }
    };

    receiveAllCharacters();
  }, []);

  return queryState;
}

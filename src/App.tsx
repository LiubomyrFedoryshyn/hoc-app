import { useState } from "react";
import { useAllCharactersQuery } from "./use-all-characters-query";
import { useCharacterQuery } from "./use-character-query";

/*
Your task is to create a React app that displays a list of all characters
and character detail view using `useAllCharactersQuery` and `useCharacterQuery` hooks.

Your implementation should satisfy the following requirements:

- Your app should use the provided `useAllCharactersQuery` hook
  to retrieve the list of all characters.

- Each list item should display the name of a character.

- When a user clicks on a character's name, they should be taken to a detail view
  where they can see all of the character's information retrieved by using the `useCharacterQuery` hook.

- The detail view should have a back button that allows the user to navigate back
  to the list view and select a different character to view.

IMPORTANT:
If you need to create a separate component to achieve this, feel free to do so.
There are no restrictions on the number of components you can create
as long as they follow React best practices.

ADDITIONAL TASK:
Your task is to update your existing React app to style the list of characters using a card layout.
Each card should display a photo of the character and some basic information (the character name for simplicity).
The list should have a maximum width of 1920px and display two cards per row (2 columns).
There should be a 15px gap between each card.
The card layout should be as follows:

-------------------------------------------------
| Photo (2/5 width) |         Info (3/5 width) |
-------------------------------------------------

You can use CSS to style the list and cards to match this layout.
You can start with the given app code and build upon it to add this functionality.
*/

type IList = {
  setId: (arg: number) => void;
};

type IDetail = {
  setId: (arg: number) => void;
  id: number;
};

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

const Detail = ({ id, setId }: IDetail) => {
  const { data, isLoading } = useCharacterQuery(id);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="list-card">
      <img src={data?.image} alt="face" />
      <div className="info">
        <p>Name: {data?.name}</p>
        <p>Status: {data?.status}</p>
        <p>Species: {data?.species}</p>
        <p>Gender: {data?.gender}</p>
        <button onClick={() => setId(0)}>Go back</button>
      </div>
    </div>
  );
};

const List = ({ setId }: IList) => {
  const { data, isLoading } = useAllCharactersQuery();

  return isLoading ? (
    <Loader />
  ) : (
    <div className="list">
      {data?.results.map((el) => {
        return (
          <div onClick={() => setId(el.id)} className="list-card" key={el.id}>
            <img src={el.image} alt="face" />
            <p>{el.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default function App() {
  const [id, setId] = useState(0);

  return (
    <div className="App">
      {id ? <Detail setId={setId} id={id} /> : <List setId={setId} />}
    </div>
  );
}

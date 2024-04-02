import { createSlice } from "@reduxjs/toolkit";

interface Show {
  id: number;
    title: string;
    image: string;
    summary: string;
    avgRuntime: number;
    status: string;
    language: string;
    premiered: string;
    rating: number;
  }
  
  interface InitialState {
    shows: Show[];
  }

const initialState: InitialState = {
    shows: [
        {
          id: 169,
          title: "Breaking Bad",
          image: "images/breaking_bad.jpg",
          summary:
            "A high school chemistry teacher turned meth producer partners with a former student to secure his family's future.",
            avgRuntime: 60,
            status: 'Ended',
            language: "English",
            premiered: "2018-01-20",
            rating: 8.8,
        },
        {
          id: 82,
          title: "Game of Thrones",
          image: "images/game_of_thrones.jpg",
          summary:
            "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
            avgRuntime: 60,
            status: 'Ended',
            language: "English",
            premiered: "2018-01-20",
            rating: 8.8,
        },
        {
          id: 172,
          title: "Suits",
          image: "images/suits.jpg",
          summary:
            "On the run from a drug deal gone bad, brilliant college dropout Mike Ross finds himself working with Harvey Specter, one of New York City's best lawyers.",
            avgRuntime: 60,
            status: 'Ended',
            language: "English",
            premiered: "2018-01-20",
            rating: 8.8,
        },
        {
          id: 526,
          title: "The Office",
          image: "images/the_office.jpg",
          summary:
            "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
            avgRuntime: 60,
            status: 'Ended',
            language: "English",
            premiered: "2018-01-20",
            rating: 8.8,
        },
        {
          id: 66,
          title: "The Big Bang Theory",
          image: "images/the_big_bang_theory.jpg",
          summary:
            "The Big Bang Theory is a comedy about brilliant physicists, Leonard and Sheldon, who are the kind of beautiful minds that understand how the universe works. But none of that genius helps them interact with people, especially women.",
            avgRuntime: 60,
            status: 'Ended',
            language: "English",
            premiered: "2018-01-20",
            rating: 8.8,
        },
        {
          id: 11,
          title: "Gotham",
          image: "images/gotham.jpg",
          summary:
            "The story behind Detective James Gordon's rise to prominence in Gotham City in the years before Batman's arrival.",
            avgRuntime: 60,
            status: 'Ended',
            language: "English",
            premiered: "2018-01-20",
            rating: 8.8,
        },
        {
          id: 44778,
          title: "House of the Dragon",
          image: "images/house_of_the_dragon.jpg",
          summary:
            "House of the Dragon is Game of Thrones prequel series that is set to premiere on HBO in 2022. It is based on George R.R. Martin's Fire & Blood, a history of House Targaryen set 300 years before the events of Game of Thrones.",
            avgRuntime: 60,
            status: 'Ended',
            language: "English",
            premiered: "2018-01-20",
            rating: 8.8,
        },
        {
          id: 175,
          title: "House of Cards",
          image: "images/house_of_cards.jpg",
          summary:
            "A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.",
            avgRuntime: 60,
            status: 'Ended',
            language: "English",
            premiered: "2018-01-20",
            rating: 8.8,
        }
        
      ]
  };


const showSlice = createSlice({
    name: "shows",
    initialState,
    reducers: {
        setShows: (state, action) => {
            state.shows = action.payload;
        }
    }
});

export const { setShows } = showSlice.actions;
export default showSlice.reducer;
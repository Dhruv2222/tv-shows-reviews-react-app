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

const allShows: Show[] = [
  {
    id: 169,
    title: "Breaking Bad",
    image: "images/breaking_bad.jpg",
    summary:
      "A high school chemistry teacher turned meth producer partners with a former student to secure his family's future.",
    avgRuntime: 60,
    status: "Ended",
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
    status: "Ended",
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
    status: "Ended",
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
    status: "Ended",
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
    status: "Ended",
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
    status: "Ended",
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
    status: "Ended",
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
    status: "Ended",
    language: "English",
    premiered: "2018-01-20",
    rating: 8.8,
  },
  {
    id: 73,
    title: "The Walking Dead",
    image: "images/the_walking_dead.jpg",
    summary:
      "Sheriff Deputy Rick Grimes wakes up from a coma to learn the world is in ruins and must lead a group of survivors to stay alive.",
    avgRuntime: 60,
    status: "Ended",
    language: "English",
    premiered: "2018-01-20",
    rating: 8.8,
  },
  {
    id: 83,
    title: "The Simpsons",
    image: "images/the_simpsons.jpg",
    summary:
      "The satiric adventures of a working-class family in the misfit city of Springfield.",
    avgRuntime: 60,
    status: "Ended",
    language: "English",
    premiered: "2018-01-20",
    rating: 8.8,
  },
  {
    id: 143,
    title: "The Flash",
    image: "images/the_flash.jpg",
    summary:
      "After being struck by lightning, Barry Allen wakes up from his coma to discover he's been given the power of super speed, becoming the Flash, fighting crime in Central City.",
    avgRuntime: 60,
    status: "Ended",
    language: "English",
    premiered: "2018-01-20",
    rating: 8.8,
  },
  {
    id: 4,
    title: "Arrow",
    image: "images/arrow.jpg",
    summary:
      "After a violent shipwreck, billionaire playboy Oliver Queen was missing and presumed dead for five years before being discovered alive on a remote island in the Pacific. He returned home to Starling City, welcomed by his devoted mother Moira, beloved sister Thea and former flame Laurel Lance.",
    avgRuntime: 60,
    status: "Ended",
    language: "English",
    premiered: "2018-01-20",
    rating: 8.8,
  },
  {
    id: 29,
    title: "Vikings",
    image: "images/vikings.jpg",
    summary:
      "Vikings transports us to the brutal and mysterious world of Ragnar Lothbrok, a Viking warrior and farmer who yearns to explore - and raid - the distant shores across the ocean.",
    avgRuntime: 60,
    status: "Ended",
    language: "English",
    premiered: "2018-01-20",
    rating: 8.8,
  },
  {
    id: 26020,
    title: "Young Sheldon",
    image: "images/young_sheldon.jpg",
    summary:
      "For young Sheldon Cooper, it isn't easy growing up in East Texas. Being a once-in-a-generation mind capable of advanced mathematics and science isn't always helpful in a land where church and football are king. And while the vulnerable, gifted and somewhat naïve Sheldon deals with the world, his very normal family must find a way to deal with him.",
    avgRuntime: 60,
    status: "Ended",
    language: "English",
    premiered: "2018-01-20",
    rating: 8.8,
  },
  {
    id: 116,
    title: "The Mentalist",
    image: "images/the_mentalist.jpg",
    summary:
      "Patrick Jane, a former celebrity psychic medium, uses his razor-sharp skills of observation and expertise at reading people to solve serious crimes with the California Bureau of Investigation.",
    avgRuntime: 60,
    status: "Ended",
    language: "English",
    premiered: "2018-01-20",
    rating: 8.8,
  },
  {
    id: 63,
    title: "The Vampire Diaries",
    image: "images/the_vampire_diaries.jpg",
    summary:
      "Patrick Jane, a former celebrity psychic medium, uses his razor-sharp skills of observation and expertise at reading people to solve serious crimes with the California Bureau of Investigation.",
    avgRuntime: 60,
    status: "Ended",
    language: "English",
    premiered: "2018-01-20",
    rating: 8.8,
  },
  {
    id: 62,
    title: "The Originals",
    image: "images/the_originals.jpg",
    summary:
      "A family of power-hungry thousand-year-old vampires look to take back the city that they built and dominate all those who have done them wrong.",
    avgRuntime: 60,
    status: "Ended",
    language: "English",
    premiered: "2018-01-20",
    rating: 8.8,
  },
  {
    id: 60,
    title: "NCIS",
    image: "images/ncis.jpg",
    summary:
      "The cases of the Naval Criminal Investigative Service's Washington, D.C. Major Case Response Team, led by Special Agent Leroy Jethro Gibbs.",
    avgRuntime: 60,
    status: "Ended",
    language: "English",
    premiered: "2018-01-20",
    rating: 8.8,
  },
  {
    id: 60090,
    title: "Monarch: Legacy of Monsters",
    image: "images/monarch_legacy_of_onsters.jpg",
    summary:
      "After surviving Godzilla's attack on San Francisco, Cate is shaken yet again by a shocking secret. Amid monstrous threats, she embarks on a globetrotting adventure to learn the truth about her family—and the mysterious organization known as Monarch.",
    avgRuntime: 60,
    status: "Ended",
    language: "English",
    premiered: "2018-01-20",
    rating: 8.8,
  },
  {
    id: 2759,
    title: "The Last Kingdom",
    image: "images/the_last_kingdom.jpg",
    summary:
      "The Last Kingdom is a show of heroic deeds and epic battles but with a thematic depth that embraces politics, religion, warfare, courage, love, loyalty and our universal search for identity.",
    avgRuntime: 60,
    status: "Ended",
    language: "English",
    premiered: "2018-01-20",
    rating: 8.8,
  },
];

const getRandomShows = (array: any[], count: number) => {
  const shuffled = array.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const shows = getRandomShows(allShows, 10);

const initialState: InitialState = {
  shows: shows,
};

const showSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    setShows: (state, action) => {
      state.shows = action.payload;
    },
  },
});

export const { setShows } = showSlice.actions;
export default showSlice.reducer;

import { getAllData } from "./httpService";

export async function apiGetAllFlashCards() {
  const allFlashCards = await getAllData("/flashcards");
  return [...allFlashCards];
}

export async function getAllCities() {
  const allCities = await getAllData("/cities");

  return [...allCities].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAllElections() {
  const allElections = await getAllData("/election");

  return [...allElections];
}

export async function getAllCandidates() {
  const allCandidates = await getAllData("/candidates");

  return [...allCandidates].map((c) => {
    return {
      ...c,
      image: `${c.username}.png`,
    };
  });
}

export async function getElectionByCity(cityId) {
  const electionByCity = await getAllData(`/election?cityId=${cityId}`);
  const candidates = await getAllCandidates();
  const city = await getAllCities();

  return [...electionByCity]
    .sort((a, b) => (a.votes > b.votes ? -1 : a.votes < b.votes ? 1 : 0))
    .map((election) => {
      return {
        ...election,
        candidates: candidates.filter((candidate) => {
          return election.candidateId === candidate.id;
        }),
        porcentage: city
          .filter((city) => {
            return city.id.includes(election.cityId);
          })
          .map(({ presence }) => {
            return (election.votes / presence) * 100;
          }),
      };
    });
}

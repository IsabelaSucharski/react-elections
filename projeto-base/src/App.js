import { useEffect, useState, useCallback } from "react";
import { Election } from "./Components/Election";
import Header from "./Components/Header";
import {
  getAllCandidates,
  getAllCities,
  getAllElections,
  getElectionByCity,
} from "./Services/apiService";

import { formatNumbers } from "./helpers";

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [cities, setCities] = useState([]);
  const [election, setElection] = useState([]);
  const [cityName, setCityName] = useState("");
  const [abstencao, setAbstencao] = useState("");
  const [presenca, setPresenca] = useState("");
  const [totalEleitor, setTotalEleitores] = useState("");
  const [electionsFilter, setElectionsFilter] = useState(null);

  useEffect(() => {
    getAllCandidates().then((allCandidates) => {
      setCandidates(allCandidates);
    });
  }, []);

  useEffect(() => {
    getAllCities().then((allCities) => {
      setCities(allCities);
    });
  }, []);

  useEffect(() => {
    getAllElections().then((allElections) => {
      setElection(allElections);
    });
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleElection = useCallback(async (values) => {
    let id = values.split(",")[0];
    let filterElections = await getElectionByCity(id);

    console.log(filterElections);
    setElectionsFilter(filterElections);
    setCityName(values.split(",")[1]);
  });

  useEffect(() => {
    cities
      .filter(({ name }) => {
        return name.includes(cityName);
      })
      .map((c) => {
        return [
          setAbstencao(c.absence),
          setPresenca(c.presence),
          setTotalEleitores(c.votingPopulation),
        ];
      });
  }, [cities, cityName, handleElection]);

  return (
    <div>
      <Header />

      <main className="container mx-auto p-4 flex flex-col items-center">
        <div>
          <span className="bold text-2xl">Escolha o município</span>
        </div>
        <select
          className="align-center mb-12"
          onChange={(val) => handleElection(val.target.value)}
        >
          {cities.map((c) => {
            return (
              <option key={c.id} value={[c.id, c.name]}>
                {c.name}
              </option>
            );
          })}
        </select>
        {electionsFilter && (
          <div className="border text-center space-y-6">
            <span className="bold text-xl">Eleição em {cityName}</span>
            <div className="space-x-4">
              <span>Total de eleitores: {formatNumbers(totalEleitor)}</span>
              <span>Abstenção: {formatNumbers(abstencao)}</span>
              <span>Comparecimento: {formatNumbers(presenca)}</span>
            </div>
            <span>{electionsFilter.length} candidatos</span>
            <div className="flex flex-wrap">
              {electionsFilter.map((e, index) => {
                return <Election key={e.id} data={e} index={index} />;
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

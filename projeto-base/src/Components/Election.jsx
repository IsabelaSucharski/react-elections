import batman from "../assets/batman.png";

import { ResultValue } from "./ResultValue";
import { formatNumbers } from "../helpers";

export function Election({ data, index }) {
  return (
    <>
      <div className="border w-44 h-44 m-2">
        <div className="flex flex-row justify-between">
          <img
            src={batman}
            className="w-12 h-12 rounded-full p-1"
            alt="img"
          ></img>
          <div className="flex flex-col">
            <span>{formatNumbers(data.votes)}</span>
            <span>{parseFloat(data.porcentage).toFixed(2)}%</span>
          </div>
        </div>
        <div className="flex flex-col ">
          <span className="text-2xl mt-4">{data.candidates[0].name}</span>
          <ResultValue value={index}></ResultValue>
        </div>
      </div>
    </>
  );
}

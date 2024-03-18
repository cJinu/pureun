import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import chevronUpDown from "../../asset/chevron-up-down.svg";

export default function SpeciesSelector({
  plantList,
  onSelect,
}) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (plantList.length > 0) {
      setSelected(plantList[0]);
    }
  }, [plantList]);

  const [query, setQuery] = useState("");

  // 검색어
  const filteredPlant =
    query === ""
      ? plantList
      : plantList.filter((plant) =>
          plant.speciesName
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  const existsPlant = plantList.some((plant) => plant.speciesName === query);

  const handleSelectChange = (value) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <Combobox value={selected} onChange={handleSelectChange}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default rounded-lg bg-white text-left">
          {/* 입력창 */}
          <Combobox.Input
            className="w-full rounded-lg border-gray-100 py-3 pl-3 pr-10 leading-5 text-gray-900 shadow-sm 
              focus:border-amber-100 focus:shadow-md focus:ring focus:ring-amber-200 focus:ring-opacity-50"
            displayValue={(plant) => plant?.speciesName}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <img
              src={chevronUpDown}
              alt="chevron-up-down"
              className="h-6 w-5"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>

        {/* 옵션 목록 */}
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {/* 사용자 직접입력 */}
            {query.length > 0 && !existsPlant && (
              <Combobox.Option
                value={{
                  speciesId: null,
                  speciesName: query,
                  minTemperature: "",
                  maxTemperature: "",
                  minMoisture: "",
                  maxMoisture: "",
                }}
                className="relative cursor-default select-none px-4 py-2 text-gray-700"
              >
                "{query}" 직접 입력
              </Combobox.Option>
            )}

            {/* 저장된 품종 목록 옵션 */}
            {filteredPlant.map((plant) => (
              <Combobox.Option
                key={plant.speciesId}
                className={({ active }) =>
                  `relative cursor-default select-none px-4 py-2 ${
                    active ? "bg-amber-50 text-slate-800" : "text-slate-800"
                  }`
                }
                value={plant}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {plant.speciesName}
                    </span>
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}

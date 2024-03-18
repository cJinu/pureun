import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import axios from "axios";

import PotKidsModeCard from "../components/Pots/PotKidsModeCard";
import PotCalander from "../components/Pots/PotCalander";
import { API_URL } from "../config/config";

export default function KidsModePotPage() {
  const { userId } = useParams();

  const [potList, setPotList] = useState([]);

  useEffect(() => {
    const getPotList = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `${API_URL}/user/${userId}`,
        });

        // console.log(res.data);
        const potList = res.data.pots.map((item) => ({
          potId: item.pot_id,
          potName: item.pot_name,
        }));
        setPotList(potList);
      } catch (err) {
        console.log(err);
      }
    };
    getPotList();
  }, [userId]);

  return (
    <>
      {potList.length > 0 ? (
        <Tab.Group>
          {/* 화분 리스트 */}
          <div className="flex justify-center">
            <Tab.List className="mb-4 flex flex-wrap justify-evenly gap-4 rounded-lg bg-green-700/25 p-1">
              {potList.map((pot) => (
                <Tab
                  key={pot.potId}
                  className={({ selected }) =>
                    `${selected ? "bg-slate-50 font-semibold text-green-900 shadow-md outline-none ring-4 ring-green-100 ring-offset-2 ring-offset-green-300" : "text-gray-50"}  rounded-lg p-2 text-lg`
                  }
                >
                  {pot.potName}
                </Tab>
              ))}
            </Tab.List>
          </div>

          {/* 화분 상세 정보 */}
          <Tab.Panels>
            {potList.map((pot) => (
              <Tab.Panel key={pot.potId}>
                {/* 화분 상세 */}
                <PotKidsModeCard potId={pot.potId} />

                {/* 캘린더 */}
                <section>
                  <h2 className="mx-2 mb-2 mt-6 text-section">함께 한 기록</h2>
                  <div className="max-w-[30rem] overflow-hidden rounded-xl border bg-white shadow-md">
                    <PotCalander potId={pot.potId} />
                  </div>
                </section>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <div className="mx-4 mt-6 rounded-xl bg-emerald-50 p-6 text-center text-emerald-900 shadow-md">
          <p className="text-lg font-semibold">아직 성장 중인 식물이 없어요.</p>
          <p>식물을 키우고 컬렉션을 모아보세요!</p>
        </div>
      )}
    </>
  );
}

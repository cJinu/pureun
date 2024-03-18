import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import BaseSimpleCard from "../UI/BaseSimpleCard";
import PotProfileImage from "./PotProfileImage";
import { API_URL } from "../../config/config";

export default function PotCollection() {
  const { userId } = useParams();

  const [collectionList, setCollectionList] = useState([]);
  useEffect(() => {
    const getCollectionList = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `${API_URL}/pot/collection/${userId}`,
        });

        const collectionList = res.data.pots.map((item) => ({
          potId: item.pot_id,
          potName: item.pot_name,
          potImg: item.pot_img_url,
          togetherDay: item.together_day,
          happyCnt: item.happy_cnt,
        }));
        setCollectionList(collectionList);
      } catch (err) {
        console.log(err);
      }
    };
    getCollectionList();
  }, [userId]);

  return (
    <div>
      {collectionList.length > 0 ? (
        <div className="grid grid-cols-2 rounded-lg border border-emerald-100/70 bg-emerald-50 p-0.5 shadow-sm">
          {collectionList &&
            collectionList.map((pot) => (
              <BaseSimpleCard key={pot.potId} className="w-[9.5rem]">
                <div className="overflow-hidden rounded-lg">
                  <PotProfileImage imgUrl={pot.potImg} />
                </div>
                <ul className="mt-2">
                  <li>
                    <p className="font-semibold">{pot.potName}</p>
                  </li>
                  <li>
                    <span className="me-2">함께한 날:</span>
                    <span className="me-0.5 text-xl font-bold text-emerald-600">
                      {pot.togetherDay ? pot.togetherDay + 1 : 1}
                    </span>
                    <span>일</span>
                  </li>
                  <li>
                    <span className="me-2">행복한 날:</span>
                    <span className="me-0.5 text-xl font-bold text-emerald-600">
                      {pot.happyCnt}
                    </span>
                    <span>일</span>
                  </li>
                </ul>
              </BaseSimpleCard>
            ))}
        </div>
      ) : (
        <div className="mx-4 mt-6 rounded-xl bg-emerald-50 p-6 text-center text-emerald-900 shadow-md">
          <p>아직 성장을 완료한 식물이 없네요.</p>
          <p className="text-lg font-semibold">
            식물을 키우고 컬렉션을 모아보세요!
          </p>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { RadioGroup } from "@headlessui/react";
import "swiper/css";

import DeviceCard from "./DeviceCard";
import DeviceBaseCard from "./DeviceBaseCard";
import DeviceAddCard from "./DeviceAddCard";
import DeviceAddModal from "./DeviceAddModal";
import radioOff from "../../asset/radio_off.svg";
import radioOn from "../../asset/radio_on.svg";
import { uiActions } from "../../store/ui-slice";

export default function DeviceChoice({ deviceList, onSelect }) {
  const dispatch = useDispatch();

  // 선택된 기기
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (deviceList.length > 0) {
      setSelected(deviceList[0]);
    }
  }, [deviceList]);

  const handleChange = function (value) {
    setSelected(value);
    onSelect(value);
  };

  // 기기 등록 모달열기
  const openDeviceAddModal = () => {
    dispatch(uiActions.deviceModalOpen());
  };

  return (
    <RadioGroup value={selected} onChange={handleChange}>
      <Swiper slidesPerView={"auto"}>
        {/* 기기 목록 */}
        {deviceList.map((device) => (
          <SwiperSlide key={device.diviceId} className="me-4 w-auto-important">
            <RadioGroup.Option
              key={device.diviceId}
              value={device}
              className="outline-none"
            >
              {({ active, checked }) => (
                <DeviceBaseCard>
                  <div className="flex items-center gap-2">
                    <img
                      src={checked ? radioOn : radioOff}
                      alt="radio"
                      className="w-6"
                    />
                    <DeviceCard {...device} />
                  </div>
                </DeviceBaseCard>
              )}
            </RadioGroup.Option>
          </SwiperSlide>
        ))}

        {/* 기기 추가 */}
        <SwiperSlide key="deviceAdd" className="me-2 w-auto-important">
          <div onClick={openDeviceAddModal} className="cursor-pointer">
            <DeviceAddCard />
          </div>
          <DeviceAddModal />
        </SwiperSlide>
      </Swiper>
    </RadioGroup>
  );
}

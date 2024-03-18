import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import DeviceChoice from "../components/Devices/DeviceChoice";
import SpeciesSelector from "../components/Pots/SpeciesSelector";
import PotProfileImage from "../components/Pots/PotProfileImage";
import Filter from "../components/UI/Filter";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import defaultImg from "../asset/no_pot_img.png";
import { API_URL } from "../config/config";

export default function PotCreatePage() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isOpen = useSelector((state) => state.ui.deviceModalIsOpen);

  // 저장된 디바이스 목록 가져오기
  const [deviceList, setDeviceList] = useState([]);
  useEffect(() => {
    const getDeviceList = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `${API_URL}/device/unMapping/${userInfo.userId}`,
        });

        const deviceList = res.data.map((item) => ({
          deviceId: item.device_id,
          deviceName: item.device_name,
          serialNum: item.serial_number,
        }));

        const firstDevice = deviceList[0];
        setDeviceList(deviceList);
        setSelectedDevice(firstDevice);
      } catch (err) {
        console.log(err);
      }
    };
    getDeviceList();
  }, [isOpen, userInfo.userId]);

  // 유저 목록 가져오기
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const getUserList = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `${API_URL}/user/child/${userInfo.userId}`,
        });

        const userList = res.data.map((item) => ({
          userId: item.user_id,
          userName: item.nickname,
          userImgUrl: item.profile_img_url,
        }));

        setUserList(userList);
      } catch (err) {
        console.log(err);
      }
    };
    getUserList();
  }, [userInfo.userId]);

  // 식물 목록 가져오기
  const [plantList, setPlantList] = useState([]);
  useEffect(() => {
    const getPlantList = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `${API_URL}/species`,
        });

        const plantList = res.data.map((item) => ({
          speciesId: item.species_id,
          speciesName: item.species_name,
          minTemperature: item.min_temperature,
          maxTemperature: item.max_temperature,
          minMoisture: item.min_moisture,
          maxMoisture: item.max_moisture,
        }));

        const firstPlant = plantList[0];
        setPlantList(plantList);
        setSelectedPlant(firstPlant);
        setMinTemperature(firstPlant.minTemperature);
        setMaxTemperature(firstPlant.maxTemperature);
        setMinMoisture(firstPlant.minMoisture);
        setMaxMoisture(firstPlant.maxMoisture);
      } catch (err) {
        console.log(err);
      }
    };
    getPlantList();
  }, []);

  // 기기
  const [selectedDevice, setSelectedDevice] = useState(deviceList[0]);
  const handleSelectedDevice = (value) => {
    setSelectedDevice(value);
  };

  // 이미지
  const [preview, setPreview] = useState(defaultImg);
  const [inputImg, setInputImg] = useState(null);
  const handleInputImg = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      setInputImg(file);
      // console.log(file);
      const reader = new FileReader();
      // console.log(reader)
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 주인
  const [selectedUser, setSelectedUser] = useState("");
  const handleSelectedUser = (value) => {
    setSelectedUser(value);
  };

  // 화분 애칭
  const [potName, setPotName] = useState("");
  const handlePotNameInput = (event) => {
    setPotName(event.target.value);
  };

  // 선택된 품종
  const [selectedPlant, setSelectedPlant] = useState(plantList[0]);

  // 세부 정보
  const [minTemperature, setMinTemperature] = useState(0);
  const [maxTemperature, setMaxTemperature] = useState(0);
  const [minMoisture, setMinMoisture] = useState(0);
  const [maxMoisture, setMaxMoisture] = useState(0);

  const handleSelectChange = (value) => {
    setSelectedPlant(value);
    setMinTemperature(value.minTemperature);
    setMaxTemperature(value.maxTemperature);
    setMinMoisture(value.minMoisture);
    setMaxMoisture(value.maxMoisture);
  };

  const handleMinTemperatureChange = (event) => {
    setMinTemperature(event.target.value);
  };
  const handleMaxTemperatureChange = (event) => {
    setMaxTemperature(event.target.value);
  };
  const handleMinMoistureChange = (event) => {
    setMinMoisture(event.target.value);
  };
  const handleMaxMoistureChange = (event) => {
    setMaxMoisture(event.target.value);
  };

  // 심은 날 (default = 오늘)
  const today = new Date().toISOString().split("T")[0];
  const [plantingDate, setPlantingDate] = useState(today);
  const handleDateChange = (event) => {
    setPlantingDate(event.target.value);
  };

  // 화분 등록
  const createHandler = async () => {
    const isConfirmed = window.confirm(`${potName}을 심으시겠습니까?`);

    if (isConfirmed) {
      const formData = new FormData(); // 파일 전송을 위해 FormData객체 사용
      formData.append("device_id", selectedDevice.deviceId); // 임시로 지정
      formData.append("user", selectedUser);
      formData.append("pot_name", potName);
      formData.append("pot_img", inputImg);
      formData.append("pot_species", selectedPlant.speciesName);
      formData.append("min_temperature", minTemperature);
      formData.append("max_temperature", maxTemperature);
      formData.append("min_moisture", minMoisture);
      formData.append("max_moisture", maxMoisture);
      formData.append("planting_day", plantingDate);

      try {
        const res = await axios({
          method: "post",
          url: `${API_URL}/pot`,
          data: formData,
          headers: {
            // 요청 헤더에 Content-Type을 multipart/form-data로 설정
            "Content-Type": "multipart/form-data",
          },
        });

        navigate("/pot");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="px-6">
      <h1 className="mx-2 my-4 text-title">식물 심기</h1>

      <div className="mt-6 flex flex-col gap-4">
        {/* 기기 선택 */}
        <section>
          <label className="text-section">화분 선택</label>
          <div className=" my-2 rounded-md bg-white p-6 shadow-md">
            <DeviceChoice
              deviceList={deviceList}
              onSelect={handleSelectedDevice}
            />
          </div>
        </section>

        <div className="grid grid-flow-row-dense grid-cols-8 gap-4">
          {/* 프로필 이미지 */}
          <div className="col-span-4 space-y-2">
            <div className="self-center border border-amber-400">
              <PotProfileImage imgUrl={preview} />
            </div>
            <input type="file" accept=".png, .jpg" onChange={handleInputImg} />
          </div>
          <div className="col-span-4 flex flex-col gap-4">
            {/* 주인 선택 */}
            <section>
              <label className="text-section">주인 선택</label>
              <div>
                <Filter
                  targetList={userList}
                  filterKey="userId"
                  filterValue="userId"
                  option="userName"
                  onFilterChange={handleSelectedUser}
                  allTarget={false}
                />
              </div>
            </section>

            {/* 애칭 입력 */}
            <section>
              <label className="text-section">식물 애칭</label>
              <Input
                type="text"
                onChange={handlePotNameInput}
                className="w-full"
                required
              />
            </section>
          </div>
        </div>

        {/* 품종 선택 */}
        <section>
          <label className="text-section">품종</label>
          <div className="mt-2">
            <SpeciesSelector
              plantList={plantList}
              onSelect={handleSelectChange}
            />
          </div>
        </section>

        {/* 온,습도 정보 */}
        <section>
          <p className="text-section">세부 정보</p>

          <label className="mb-2 flex items-center gap-4">
            <span className="mt-2">온도: </span>
            <Input
              type="number"
              value={minTemperature}
              onChange={handleMinTemperatureChange}
              className="w-20 text-center"
              required
            />
            <span className="mt-2">~</span>
            <Input
              type="number"
              value={maxTemperature}
              onChange={handleMaxTemperatureChange}
              className="w-20 text-center"
              required
            />
          </label>
          <label className="flex items-center gap-4">
            <span className="mt-2">습도: </span>
            <Input
              type="number"
              value={minMoisture}
              onChange={handleMinMoistureChange}
              className="w-20 text-center"
              required
              max={100}
            />
            <span className="mt-2">~</span>
            <Input
              type="number"
              value={maxMoisture}
              onChange={handleMaxMoistureChange}
              className="w-20 text-center"
              required
              max={100}
            />
          </label>
        </section>

        {/* 심은 날 */}
        <section>
          <span className="text-section">심은 날</span>
          <Input
            type="date"
            value={plantingDate}
            onChange={handleDateChange}
            className="block"
            required
          />
        </section>
      </div>

      {/* 등록 버튼 */}
      <div className="mt-6 grid place-content-center">
        <Button
          onClick={createHandler}
          className="w-40 bg-amber-300 text-white hover:bg-amber-400"
          isDisabled={false}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}

import { ChangeEvent, useState } from 'react';

// 分辨率
export const ResolutionComp = () => {
  const RESOLUTIONS = ['1920 * 1080', '1280 * 720 ', '1024 * 768 '];
  const FRAMERATES = ['15', '30', '60'];
  const SCENE = ['场景一', '场景二', '场景三'];
  const SETTING_ITEMS = {
    清晰度: RESOLUTIONS,
    '帧率/FPS': FRAMERATES,
    场景: SCENE,
  };

  return (
    <div className="fcr-text-white">
      <div className="fcr-flex fcr-justify-around fcr-items-center ">
        {Object.entries(SETTING_ITEMS).map(([key, value]) => {
          return <SettingItem key={key} title={key} itemsArr={value}></SettingItem>;
        })}
      </div>
    </div>
  );
};
// 设置
const SettingItem = (props: { title: string; itemsArr: string[] }) => {
  // 默认
  const [currentChecked, setCurrentChecked] = useState(props.itemsArr[0]);
  const handleItemChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentChecked(e.target.value);
  };
  return (
    <div>
      <div className="fcr-mb-6 ">{props.title}</div>
      {props.itemsArr.map((item) => {
        return (
          <div key={item} className="fcr-text-left">
            <input
              type="radio"
              id={item}
              name={props.title}
              value={item}
              onChange={handleItemChange}
              checked={item == currentChecked}
            />
            <label htmlFor={item} className="fcr-pl-2">
              {item}
            </label>
          </div>
        );
      })}
    </div>
  );
};

import { fetchRecordList } from '@app/api/classhome';
import { useEffect, useState } from 'react';
import { Archeron, LeftIcon, RightIcon } from '@app/utils/classicons';
import { useCanvasStream } from '@app/hooks/classtalkhooks/useCanvasStream';
import { aMessage } from '@app/components/message';
interface RecordListItem {
  cover: string;
  name: string;
  fileUrl: string;
  id: number;
}
export const RecordArea = () => {
  const [recordList, setRecordList] = useState<RecordListItem[]>();
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 5;

  const initRecord = async (controller: AbortController) => {
    const res = await fetchRecordList({ pageNum, pageSize, controller });
    const filterArr = res.rows.map((row: any) => {
      return {
        name: row.name || 'default',
        cover: row.cover,
        fileUrl: row.fileUrl,
        id: row.id,
      };
    });
    setRecordList(filterArr);
  };

  // 新增
  const triggerPage = async (type: boolean) => {
    if (type && recordList && recordList.length == 5) {
      setPageNum(pageNum + 1);
    } else if (!type && pageNum > 1) {
      setPageNum(pageNum - 1);
    } else {
      aMessage.warning('no more.');
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    initRecord(controller);
    return () => controller.abort();
  }, [pageNum]);
  return (
    <div>
      <div className="fcr-text-white fcr-text-lg fcr-font-bold fcr-pl-6">远端录制件</div>
      <div className="fcr-flex fcr-justify-items-center fcr-items-center fcr-mt-2">
        <div className="fcr-w-1/6 fcr-flex fcr-justify-end fcr-mr-8">
          <img
            src={LeftIcon}
            alt="icon"
            className="fcr-w-12 fcr-cursor-pointer"
            onClick={() => {
              triggerPage(false);
            }}
          />
        </div>
        <div
          className="fcr-grid fcr-grid-cols-5 fcr-gap-3 fcr-flex-1"
          style={{ minWidth: '1100px', minHeight: '150px' }}>
          {recordList &&
            recordList.map((item) => (
              <GridItem
                key={item.id}
                name={item.name}
                fileUrl={item.fileUrl}
                cover={item.cover}></GridItem>
            ))}
        </div>
        <div className="fcr-w-1/6 fcr-text-left fcr-ml-8">
          <img
            src={RightIcon}
            alt="icon"
            className="fcr-w-12 fcr-cursor-pointer"
            onClick={() => {
              triggerPage(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const GridItem = (props: { name: string; cover: string; fileUrl: string }) => {
  const { name, cover, fileUrl } = props;
  const { createProcess, stopProcess } = useCanvasStream();

  const handleRemoteRender = () => {
    try {
      stopProcess();
      createProcess({ isLocal: false, localURL: fileUrl });
    } catch (e) {
      console.log('error');
    }
  };
  return (
    <div className=" fcr-cursor-pointer fcr-bg-black" onClick={handleRemoteRender}>
      <img src={cover || Archeron} alt="cover" style={{ maxHeight: '130px', minHeight: '130px' }} />
      <div className="fcr-text-white fcr-text-center ">{`${name.substring(0, 8)}...`}</div>
    </div>
  );
};

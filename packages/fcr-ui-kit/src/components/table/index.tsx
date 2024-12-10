import './index.css';
import RCTable from 'rc-table';
import { TableProps } from 'rc-table/lib/Table';
import { DefaultRecordType } from 'rc-table/lib/interface';
import emptyPng from './assets/no-data.png';
import { CSSProperties, FC, PropsWithChildren } from 'react';
export type { ColumnsType } from 'rc-table/lib/interface';
export const Table = <R extends DefaultRecordType>(props: TableProps<R>) => {
  return <RCTable prefixCls="fcr-table" emptyText={<TableEmpty></TableEmpty>} {...props}></RCTable>;
};
export const TableEmpty: FC<PropsWithChildren & { style?: CSSProperties }> = (props) => {
  return (
    <div className="fcr-table-empty" style={props.style}>
      <img src={emptyPng}></img>
      {props.children || 'No data'}
    </div>
  );
};

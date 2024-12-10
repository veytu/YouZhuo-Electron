import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import classNames from 'classnames';
import { SvgIconEnum, SvgImg } from '../svg-img';
import './index.css';
import { ClickableIcon } from '../svg-img/clickable-icon';
import { ToolTip } from '../tooltip';

type PaginationProps = {
  current: number;
  total: number;
  onChange?: (current: number) => void;
};

const usePageCounter = (context: { current: number; total: number }) => {
  const [current, setCurrent] = useState(context.current);
  useEffect(() => {
    setCurrent(context.current);
  }, [context.current]);

  const handlePrev = () => {
    if (current <= 1) {
      return;
    }
    setCurrent(current - 1);
  };

  const handleNext = () => {
    if (current >= context.total) {
      return;
    }
    setCurrent(current + 1);
  };

  return {
    current,
    handlePrev,
    handleNext,
  };
};

export const Pagination: FC<PaginationProps & { size?: 'large' | 'small' }> = ({
  current,
  total,
  onChange = () => {},
  size = 'large',
}) => {
  const cls = classNames('fcr-pagination', { 'fcr-pagination-small': size === 'small' });

  const { handleNext, handlePrev, current: innerCurrent } = usePageCounter({ current, total });

  useEffect(() => {
    onChange(innerCurrent);
  }, [innerCurrent]);

  const prevCls = classNames(
    'fcr-pagination__btn',
    innerCurrent <= 1 ? 'fcr-pagination_btn--disabled' : 'fcr-btn-click-effect',
  );

  const nextCls = classNames(
    'fcr-pagination__btn',
    innerCurrent >= total ? 'fcr-pagination_btn--disabled' : 'fcr-btn-click-effect',
  );

  return (
    <div className={cls}>
      <div className="fcr-pagination__prev">
        <button className={prevCls} onClick={handlePrev}>
          <SvgImg type={SvgIconEnum.FCR_LEFT4} />
        </button>
      </div>
      <div className="fcr-divider" />
      <div className="fcr-pagination__page">
        {current ?? 0}/{total ?? 0}
      </div>
      <div className="fcr-divider" />
      <div className="fcr-pagination__next">
        <button className={nextCls} onClick={handleNext}>
          <SvgImg type={SvgIconEnum.FCR_RIGHT4} />
        </button>
      </div>
    </div>
  );
};

type HalfRoundedProps = PaginationProps & {
  onAdd?: () => void;
  addText: string;
  showText: string;
  hideText: string;
};

export const HalfRoundedPagination: FC<HalfRoundedProps> = ({
  current,
  total,
  onAdd = () => {},
  onChange = () => {},
  addText,
  showText,
  hideText,
}) => {
  const cls = classNames('fcr-pagination fcr-pagination-half-r', {});

  const [expansionVisible, setExpansionVisible] = useState(false);

  const [expanded, setExpanded] = useState(true);

  const { handleNext, handlePrev, current: innerCurrent } = usePageCounter({ current, total });

  useEffect(() => {
    onChange(innerCurrent);
  }, [innerCurrent]);

  const handleExpand = () => {
    setExpanded((expanded) => !expanded);
  };

  const prevCls = classNames(
    'fcr-pagination__btn',
    innerCurrent <= 1 ? 'fcr-pagination_btn--disabled' : 'fcr-btn-click-effect',
  );

  const nextCls = classNames(
    'fcr-pagination__btn',
    innerCurrent >= total ? 'fcr-pagination_btn--disabled' : 'fcr-btn-click-effect',
  );

  const expansionCls = classNames('fcr-pagination__expansion', {
    'fcr-pagination__expansion--expanded': !expanded || expansionVisible,
  });

  const maskCls = classNames('fcr-pagination-mask', {
    'fcr-pagination-mask--expanded': expanded,
  });

  const handleHover = (visible: boolean) => () => {
    setExpansionVisible(visible);
  };

  return (
    <div
      className="fcr-pagination-half-r-wrapper"
      onMouseEnter={handleHover(true)}
      onMouseLeave={handleHover(false)}>
      <div className={cls}>
        <div className={maskCls}>
          <div className="fcr-pagination__extra">
            <ToolTip content={addText} placement="top">
              <ClickableIcon icon={SvgIconEnum.FCR_V2_PHONE_MORE1} onClick={onAdd} />
            </ToolTip>
          </div>
          <div className="fcr-divider" />
          <div className="fcr-pagination__prev">
            <button className={prevCls} onClick={handlePrev}>
              <SvgImg type={SvgIconEnum.FCR_LEFT4} size={24} />
            </button>
          </div>
          <div className="fcr-pagination__page">
            {current ?? 0}/{total ?? 0}
          </div>
          <div className="fcr-pagination__next">
            <button className={nextCls} onClick={handleNext}>
              <SvgImg type={SvgIconEnum.FCR_RIGHT4} size={24} />
            </button>
          </div>
        </div>
        <ToolTip content={expanded ? hideText : showText} placement={!expanded ? 'right' : 'top'}>
          <div className={expansionCls} onClick={handleExpand}>
            <SvgImg
              type={SvgIconEnum.FCR_V2_CHEVRON_LEFT2}
              size={16}
              style={{
                transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)',
              }}
            />
          </div>
        </ToolTip>
      </div>
    </div>
  );
};
interface FloatPaginationProps extends PaginationProps {
  wrapperCls?: string;
}
export const FloatPagination: FC<FloatPaginationProps> = ({
  wrapperCls,
  current,
  total,
  onChange = () => {},
}) => {
  const { current: innerCurrent, handleNext, handlePrev } = usePageCounter({ current, total });

  useEffect(() => {
    onChange(innerCurrent);
  }, [innerCurrent]);
  const prevBtnDisabled = innerCurrent <= 1;
  const prevCls = classNames(
    'fcr-pagination-float__btn',
    prevBtnDisabled ? 'fcr-pagination_btn--disabled' : 'fcr-btn-click-effect',
  );
  const nextBtnDisabled = innerCurrent >= total;

  const nextCls = classNames(
    'fcr-pagination-float__btn',
    nextBtnDisabled ? 'fcr-pagination_btn--disabled' : 'fcr-btn-click-effect',
  );

  return (
    <div className={classNames('fcr-pagination-float', wrapperCls)}>
      {!prevBtnDisabled && (
        <div className="fcr-pagination-float__prev">
          <button className={prevCls} onClick={handlePrev}>
            <SvgImg type={SvgIconEnum.FCR_LEFT3} />
          </button>
          <div className="fcr-pagination-float__page">
            {current ?? 0}/{total ?? 0}
          </div>
        </div>
      )}
      {!nextBtnDisabled && (
        <div className="fcr-pagination-float__next">
          <button className={nextCls} onClick={handleNext}>
            <SvgImg type={SvgIconEnum.FCR_RIGHT3} />
          </button>
          <div className="fcr-pagination-float__page">
            {current ?? 0}/{total ?? 0}
          </div>
        </div>
      )}
    </div>
  );
};

interface ListViewPaginationProps extends PaginationProps {
  wrapperCls?: string;
  direction?: 'row' | 'col';
}
export const ListViewPagination: FC<PropsWithChildren<ListViewPaginationProps>> = ({
  wrapperCls,
  current,
  total,
  onChange = () => {},
  direction = 'row',
  children,
}) => {
  const { current: innerCurrent, handleNext, handlePrev } = usePageCounter({ current, total });

  useEffect(() => {
    onChange(innerCurrent);
  }, [innerCurrent]);
  const prevBtnDisabled = innerCurrent <= 1;
  const prevCls = classNames(
    'fcr-pagination-float__btn',
    prevBtnDisabled ? 'fcr-pagination_btn--disabled' : 'fcr-btn-click-effect',
  );
  const nextBtnDisabled = innerCurrent >= total;
  const nextCls = classNames(
    'fcr-pagination-float__btn',
    nextBtnDisabled ? 'fcr-pagination_btn--disabled' : 'fcr-btn-click-effect',
  );

  return (
    <div
      className={classNames(
        'fcr-pagination-list-view',
        `fcr-pagination-list-view-${direction}`,
        wrapperCls,
      )}>
      {!prevBtnDisabled && (
        <div className="fcr-pagination-list-view__prev">
          <button className={prevCls} onClick={handlePrev}>
            <SvgImg type={SvgIconEnum.FCR_LEFT1} size={40} />
          </button>
        </div>
      )}
      {children}
      {!nextBtnDisabled && (
        <div className="fcr-pagination-list-view__next">
          <button className={nextCls} onClick={handleNext}>
            <SvgImg type={SvgIconEnum.FCR_LEFT1} size={40} />
          </button>
        </div>
      )}
    </div>
  );
};

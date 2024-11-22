import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import FilterIcon from '@/assets/feed/filter.svg?react';
import AgricultureIcon from '@/assets/feed/filter_agriculture.svg?react';
import ConstructionIcon from '@/assets/feed/filter_construction.svg?react';
import FisheriesIcon from '@/assets/feed/filter_fisheries.svg?react';
import HousecareIcon from '@/assets/feed/filter_housecare.svg?react';
import LikeDescIcon from '@/assets/feed/filter_like.svg?react';
import LogisticsIcon from '@/assets/feed/filter_logistics.svg?react';
import ManufacturingIcon from '@/assets/feed/filter_manufacturing.svg?react';
import ProfessionalIcon from '@/assets/feed/filter_professional.svg?react';
import ServiceIcon from '@/assets/feed/filter_service.svg?react';
import CreatedAtDescIcon from '@/assets/feed/filter_time.svg?react';
import FilterCloseIcon from '@/assets/feed/filterClose.svg?react';
import { FilterType } from '@/types/filterType';

const FILTER_TYPE: { filter: FilterType; icon: React.ReactNode }[] = [
  { filter: 'CREATED_AT_DESC', icon: <CreatedAtDescIcon /> },
  { filter: 'LIKE_DESC', icon: <LikeDescIcon /> },
  { filter: 'MANUFACTURING', icon: <ManufacturingIcon /> },
  { filter: 'CONSTRUCTION', icon: <ConstructionIcon /> },
  { filter: 'LOGISTICS', icon: <LogisticsIcon /> },
  { filter: 'SERVICE', icon: <ServiceIcon /> },
  { filter: 'AGRICULTURE', icon: <AgricultureIcon /> },
  { filter: 'FISHERIES', icon: <FisheriesIcon /> },
  { filter: 'HOUSECARE', icon: <HousecareIcon /> },
  { filter: 'PROFESSIONAL', icon: <ProfessionalIcon /> },
];

export const Filter = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortType = searchParams.get('sortType') || 'CREATED_AT_DESC';

  const handleIsFilterVisible = () => {
    setIsFilterVisible((prev) => !prev);
  };

  useEffect(() => {
    if (!searchParams.get('sortType')) {
      setSearchParams({ sortType: 'CREATED_AT_DESC' });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="flex min-h-8 items-center justify-end">
      {isFilterVisible ? (
        <div className="flex items-center">
          <FilterCloseIcon onClick={handleIsFilterVisible} />
          <div className="ml-1 flex gap-[7px] rounded-full bg-[#F7F7F7] px-2 py-1">
            {FILTER_TYPE.map(({ filter, icon }) => (
              <div
                key={filter}
                onClick={() => setSearchParams({ sortType: filter })}
                className={currentSortType === filter ? 'text-primary' : 'text-[#979797]'}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-8 w-10 items-center justify-center rounded-full bg-[#F7F7F7]">
          <FilterIcon onClick={handleIsFilterVisible} />
        </div>
      )}
    </div>
  );
};

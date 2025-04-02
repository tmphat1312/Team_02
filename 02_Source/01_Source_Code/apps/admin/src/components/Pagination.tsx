import { Pagination as HRPagination } from '@heroui/react';
import { useQueryState, parseAsInteger } from 'nuqs';

type PaginationProps = {
  totalPages: number;
  pageSize: number;
  totalItems: number;
};

export function Pagination(props: PaginationProps) {
  const { totalPages, pageSize, totalItems } = props;

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || page == newPage) return;
    setPage(newPage);
  };

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);
  const total = totalItems;

  return (
    <div className="my-2 flex w-full items-center justify-center gap-4">
      <HRPagination
        showControls
        page={page}
        total={totalPages}
        onChange={handlePageChange}
      />
      <span className="text-sm text-gray-500">
        ({start} - {end} of {total})
      </span>
    </div>
  );
}

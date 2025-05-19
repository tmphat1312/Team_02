export function calculateOffset({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  const offset = (page - 1) * pageSize;
  return offset < 0 ? 0 : offset;
}

export function calculateTotalPages({
  totalItems,
  pageSize,
}: {
  totalItems: number;
  pageSize: number;
}) {
  return Math.ceil(totalItems / pageSize);
}

export function calculateCurrentPage({
  offset,
  pageSize,
}: {
  offset: number;
  pageSize: number;
}) {
  return Math.floor(Math.max(offset, 0) / Math.max(pageSize, 0)) + 1;
}

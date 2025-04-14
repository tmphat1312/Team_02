import {
  calculateOffset,
  calculateTotalPages,
  calculateCurrentPage,
} from "./pagination-calculators";

describe("Pagination Calculators", () => {
  describe("calculateOffset", () => {
    it("should return the correct offset for valid page and pageSize", () => {
      expect(calculateOffset({ page: 2, pageSize: 10 })).toBe(10);
      expect(calculateOffset({ page: 3, pageSize: 5 })).toBe(10);
    });

    it("should return 0 if the calculated offset is negative", () => {
      expect(calculateOffset({ page: 0, pageSize: 10 })).toBe(0);
      expect(calculateOffset({ page: -1, pageSize: 10 })).toBe(0);
    });
  });

  describe("calculateTotalPages", () => {
    it("should return the correct total pages for valid totalItems and pageSize", () => {
      expect(calculateTotalPages({ totalItems: 50, pageSize: 10 })).toBe(5);
      expect(calculateTotalPages({ totalItems: 45, pageSize: 10 })).toBe(5);
    });

    it("should return 1 if totalItems is less than or equal to pageSize", () => {
      expect(calculateTotalPages({ totalItems: 5, pageSize: 10 })).toBe(1);
      expect(calculateTotalPages({ totalItems: 10, pageSize: 10 })).toBe(1);
    });

    it("should handle edge cases with zero or negative totalItems or pageSize", () => {
      expect(calculateTotalPages({ totalItems: 0, pageSize: 10 })).toBe(0);
      expect(calculateTotalPages({ totalItems: 50, pageSize: 0 })).toBe(
        Infinity
      );
    });
  });

  describe("calculateCurrentPage", () => {
    it("should return the correct current page for valid offset and pageSize", () => {
      expect(calculateCurrentPage({ offset: 10, pageSize: 10 })).toBe(2);
      expect(calculateCurrentPage({ offset: 20, pageSize: 5 })).toBe(5);
    });

    it("should return 1 if offset is 0", () => {
      expect(calculateCurrentPage({ offset: 0, pageSize: 10 })).toBe(1);
    });

    it("should handle edge cases with zero or negative offset or pageSize", () => {
      expect(calculateCurrentPage({ offset: -10, pageSize: 10 })).toBe(1);
      expect(calculateCurrentPage({ offset: 10, pageSize: 0 })).toBe(Infinity);
    });
  });
});

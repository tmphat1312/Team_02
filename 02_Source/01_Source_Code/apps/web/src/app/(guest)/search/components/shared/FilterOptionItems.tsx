import React from "react";
import { OptionItem } from "../../hooks/usePaginatedOptions";

interface FilterOptionItemsProps {
  options: OptionItem[];
  selectedNames: string[];
  onToggle: (name: string) => void;
  loading?: boolean;
  error?: string | null;
  fetchedAll?: boolean;
  onShowAll?: () => void;
  showAllThreshold?: number;
  label?: string;
}

export const FilterOptionItems: React.FC<FilterOptionItemsProps> = ({
  options,
  selectedNames,
  onToggle,
  loading,
  error,
  fetchedAll,
  onShowAll,
  showAllThreshold = 8,
  label = "Show all",
}) => (
  <div className="flex flex-wrap gap-2">
    {loading && <span>Loading...</span>}
    {error && <span className="text-red-500">{error}</span>}
    {!loading &&
      !error &&
      options.map((item) => {
        const selected = selectedNames.includes(item.name);
        return (
          <button
            type="button"
            key={item.id}
            onClick={() => onToggle(item.name)}
            className={`flex items-center gap-1 border rounded px-2 py-1 cursor-pointer transition-colors duration-150 focus:outline-none ${
              selected
                ? "border-orange-500 ring-1 ring-orange-400 bg-orange-50"
                : "border-gray-300 bg-white hover:border-orange-300"
            }`}
            style={{ borderWidth: 2 }}
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-6 h-6 object-cover rounded"
              />
            )}
            <span>{item.name}</span>
          </button>
        );
      })}
    {!fetchedAll && options.length <= showAllThreshold && onShowAll && (
      <button
        type="button"
        onClick={onShowAll}
        className="ml-2 px-2 py-1 text-md bg-gray-300 rounded border"
      >
        {label} &rarr;
      </button>
    )}
  </div>
);

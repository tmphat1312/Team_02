import useSWR from "swr";
import { getGeoTextSuggestions } from "@/features/map/data/get-geo-text-suggestions";
import { retrieveCoordinates } from "@/features/map/data/retrieve-coordinates";

type Props = {
  query: string;
  onAddressChange: (coordinates: [number, number], address: string) => void;
};

export function SearchResults({ query, onAddressChange }: Props) {
  const { isLoading, data: suggestions } = useSWR(
    query,
    async (query) => {
      return await getGeoTextSuggestions(query);
    },
    { revalidateOnFocus: false }
  );

  const handleClick = async (mapboxId: string) => {
    const { coordinates, full_address } = await retrieveCoordinates(mapboxId);
    onAddressChange(coordinates, full_address);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="p-4">Loading...</div>
      </Layout>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return (
      <Layout>
        <div className="p-4">No results found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ul className="divide-y text-sm">
        {suggestions.map((suggestion) => (
          <li key={suggestion.mapbox_id}>
            <button
              className="block cursor-pointer hover:bg-accent/50 px-4 py-2.5 font-medium text-start w-full"
              onClick={() => handleClick(suggestion.mapbox_id)}
            >
              <div>{suggestion.name}</div>
              <div className="text-muted-foreground text-xs">
                {suggestion.full_address}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute bg-background border rounded-md shadow top-[115%] inset-x-0">
      {children}
    </div>
  );
}

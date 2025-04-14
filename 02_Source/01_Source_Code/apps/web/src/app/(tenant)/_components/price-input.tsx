export function PriceInput() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2 items-center">
        <label htmlFor="minimum" className="text-xs font-medium">
          Minimum
        </label>
        <input
          type="text"
          name="minimum"
          id="minimum"
          defaultValue="đ260000"
          className="border max-w-[14ch] rounded-full text-center h-12 px-4"
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <label htmlFor="maximum" className="text-xs font-medium">
          Maximum
        </label>
        <input
          type="text"
          name="maximum"
          id="maximum"
          defaultValue="đ2600000"
          className="border max-w-[14ch] rounded-full text-center h-12 px-4"
        />
      </div>
    </div>
  );
}

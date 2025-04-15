const mockRules = [
  {
    id: 6,
    name: "Check-in time is after 3 PM",
  },
  {
    id: 7,
    name: "Check-out time is before 11 AM",
  },
  {
    id: 8,
    name: "No loud music",
  },
  {
    id: 9,
    name: "No illegal activities",
  },
  {
    id: 10,
    name: "Respect neighbors",
  },
  {
    id: 11,
    name: "No extra guests without prior approval",
  },
  {
    id: 12,
    name: "Dispose of trash properly",
  },
  {
    id: 13,
    name: "Use appliances responsibly",
  },
  {
    id: 14,
    name: "Report any damages immediately",
  },
  {
    id: 15,
    name: "Follow check-in and check-out procedures",
  },
  {
    id: 16,
    name: "Keep the property clean and tidy",
  },
  {
    id: 17,
    name: "Do not rearrange furniture",
  },
  {
    id: 18,
    name: "Use common areas respectfully",
  },
  {
    id: 19,
    name: "No food or drinks in the bedrooms",
  },
  {
    id: 20,
    name: "No unauthorized guests",
  },
  {
    id: 21,
    name: "No pets allowed without prior approval",
  },
  {
    id: 22,
    name: "No smoking inside the property",
  },
  {
    id: 23,
    name: "No parties or events without prior approval",
  },
];

export function PropertyRules() {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">Things to know</h3>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {mockRules.map((rule) => (
          <span key={rule.id} className="">
            {rule.name}
          </span>
        ))}
      </div>

      <button className="underline flex mx-auto">show more</button>
    </div>
  );
}

export const typeDefs = `#graphql
type Numbers {
  total: Int!
  newThisMonth: Int!
  newThisWeek: Int!
  newToday: Int!
}

type ReservationNumbers {
  total: Int!
  newThisMonth: Int!
  newThisWeek: Int!
  newToday: Int!
}

type UserNumbers {
  total: Int!
  newThisMonth: Int!
  newThisWeek: Int!
  newToday: Int!
}

type PropertyNumbers {
  total: Int!
  newThisMonth: Int!
  newThisWeek: Int!
  newToday: Int!
}

type NumbersResult {
  user: UserNumbers!
  property: PropertyNumbers!
  reservation: ReservationNumbers!
}

type ChartRow {
  month: String!
  value: Int!
}

type ChartData {
  user: [ChartRow!]!
  property: [ChartRow!]!
  reservation: [ChartRow!]!
}

type Query {
  numbers: NumbersResult!
  chart: ChartData!
}
`;

import Emittery from "emittery";

export const eventBus = new Emittery();

export const LISTING_EVENTS = {
  LISTING_CREATED: Symbol("LISTING_CREATED"),
  LISTING_UPDATED: Symbol("LISTING_UPDATED"),
  LISTING_DELETED: Symbol("LISTING_DELETED"),
};

export const makeEvent = ({ type, payload }) => ({
  type,
  payload,
  timestamp: new Date().toISOString(),
});

import { eventBus, LISTING_EVENTS, makeEvent } from "../eventBus.js";
import { saveEvent } from "./event-store.js";

export const createListing = async ({ title, pricePerNight }) => {
  const event = makeEvent({
    type: LISTING_EVENTS.LISTING_CREATED,
    payload: { title, pricePerNight },
  });
  eventBus.emit(event.type, event);
  await saveEvent(event);
};

export const updateListing = async ({ id, title, pricePerNight }) => {
  const event = makeEvent({
    type: LISTING_EVENTS.LISTING_UPDATED,
    payload: { id, title, pricePerNight },
  });
  eventBus.emit(event.type, event);
  await saveEvent(event);
};

export const deleteListing = async ({ id }) => {
  const event = makeEvent({
    type: LISTING_EVENTS.LISTING_DELETED,
    payload: { id },
  });
  eventBus.emit(event.type, event);
  await saveEvent(event);
};

import { JSONFilePreset as LowDB } from "lowdb/node";
import { projectConfig } from "../project.config.js";

const DEFAULT_EVENTS = {
  events: [],
};

const eventStore = await LowDB(projectConfig.eventsStorePath, DEFAULT_EVENTS);

export const saveEvent = async (event) => {
  eventStore.data.events.push(event);
  await eventStore.write();
};

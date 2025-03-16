import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  listings: ["read", "create", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  ...adminAc.statements,
  listings: ["read", "create", "update", "delete"],
});
export const tenant = ac.newRole({
  listings: ["read"],
});
export const host = ac.newRole({
  listings: ["read", "create"],
});
export const guest = ac.newRole({
  listings: ["read"],
});

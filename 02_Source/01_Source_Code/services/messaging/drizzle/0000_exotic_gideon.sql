CREATE TABLE "conversations" (
	"id" integer PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"tenantId" varchar(255) NOT NULL,
	"hostId" varchar(255) NOT NULL,
	"propertyId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" integer PRIMARY KEY NOT NULL,
	"conversationId" integer NOT NULL,
	"senderId" varchar(255) NOT NULL,
	"receiverId" varchar(255) NOT NULL,
	"content" text,
	"sendAt" timestamp DEFAULT now() NOT NULL,
	"isReadByReceiver" boolean DEFAULT false
);

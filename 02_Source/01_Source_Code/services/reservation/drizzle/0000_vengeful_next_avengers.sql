CREATE TYPE "public"."status" AS ENUM('Pending', 'Confirmed', 'Paid', 'Canceled');--> statement-breakpoint
CREATE TABLE "reservations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "reservations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"tenantId" text NOT NULL,
	"hostId" text NOT NULL,
	"propertyId" integer NOT NULL,
	"checkInDate" timestamp NOT NULL,
	"checkOutDate" timestamp NOT NULL,
	"numberOfAdults" integer NOT NULL,
	"numberOfChildren" integer,
	"numberOfInfants" integer,
	"totalPrice" numeric(10, 2) NOT NULL,
	"status" "status" DEFAULT 'Pending' NOT NULL,
	"note" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);

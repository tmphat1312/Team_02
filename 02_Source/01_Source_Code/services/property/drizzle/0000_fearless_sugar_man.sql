CREATE TYPE "public"."type" AS ENUM('common', 'custom');--> statement-breakpoint
CREATE TABLE "amenities" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "amenities_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"imageUrl" varchar(255) NOT NULL,
	CONSTRAINT "amenities_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"imageUrl" varchar(255) NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "properties_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"hostId" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"address" varchar(255) NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"pricePerNight" numeric(15, 2) NOT NULL,
	"numberOfGuests" integer NOT NULL,
	"numberOfBedrooms" integer NOT NULL,
	"numberOfBeds" integer NOT NULL,
	"numberOfBathrooms" integer NOT NULL,
	"isAvailable" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property_amenities" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "property_amenities_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"propertyId" integer NOT NULL,
	"amenityId" integer NOT NULL,
	CONSTRAINT "property_amenities_propertyId_amenityId_unique" UNIQUE("propertyId","amenityId")
);
--> statement-breakpoint
CREATE TABLE "property_categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "property_categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"propertyId" integer NOT NULL,
	"categoryId" integer NOT NULL,
	CONSTRAINT "property_categories_propertyId_categoryId_unique" UNIQUE("propertyId","categoryId")
);
--> statement-breakpoint
CREATE TABLE "property_images" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "property_images_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"propertyId" integer NOT NULL,
	"imageUrl" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property_rules" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "property_rules_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"propertyId" integer NOT NULL,
	"ruleId" integer NOT NULL,
	CONSTRAINT "property_rules_propertyId_ruleId_unique" UNIQUE("propertyId","ruleId")
);
--> statement-breakpoint
CREATE TABLE "rules" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "rules_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"type" "type" DEFAULT 'custom',
	CONSTRAINT "rules_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "wishlists" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "wishlists_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"tenantId" varchar(255) NOT NULL,
	"propertyId" integer NOT NULL,
	CONSTRAINT "wishlists_tenantId_propertyId_unique" UNIQUE("tenantId","propertyId")
);
--> statement-breakpoint
ALTER TABLE "property_amenities" ADD CONSTRAINT "property_amenities_propertyId_properties_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_amenities" ADD CONSTRAINT "property_amenities_amenityId_amenities_id_fk" FOREIGN KEY ("amenityId") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_categories" ADD CONSTRAINT "property_categories_propertyId_properties_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_categories" ADD CONSTRAINT "property_categories_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_images" ADD CONSTRAINT "property_images_propertyId_properties_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_rules" ADD CONSTRAINT "property_rules_propertyId_properties_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_rules" ADD CONSTRAINT "property_rules_ruleId_rules_id_fk" FOREIGN KEY ("ruleId") REFERENCES "public"."rules"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_propertyId_properties_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE VIEW "public"."properties_with_images" AS (select "properties"."id", "properties"."createdAt", "properties"."updatedAt", "properties"."hostId", "properties"."title", "properties"."description", "properties"."address", "properties"."latitude", "properties"."longitude", "properties"."pricePerNight", "properties"."numberOfGuests", "properties"."numberOfBedrooms", "properties"."numberOfBeds", "properties"."numberOfBathrooms", "properties"."isAvailable", array_agg("property_images"."imageUrl") as "imageUrls" from "properties" left join "property_images" on "property_images"."propertyId" = "properties"."id" group by "properties"."id");
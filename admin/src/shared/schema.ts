// import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
// import { createInsertSchema } from "drizzle-zod";
// import { z } from "zod";

// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   username: text("username").notNull().unique(),
//   password: text("password").notNull(),
// });

// export const claims = pgTable("claims", {
//   id: serial("id").primaryKey(),
//   claimId: text("claim_id").notNull().unique(),
//   deviceModel: text("device_model").notNull(),
//   brand: text("brand").notNull(),
//   imei: text("imei").notNull(),
//   amount: text("amount").notNull(),
//   status: text("status").notNull(),
//   insurer: text("insurer").notNull(),
//   date: text("date").notNull(),
//   category: text("category").notNull(), // 'all', 'pending', 'uncategorized', 'approved', 'completed', 'rejected'
//   createdAt: timestamp("created_at").defaultNow(),
// });

// export const devices = pgTable("devices", {
//   id: serial("id").primaryKey(),
//   deviceId: text("device_id").notNull().unique(),
//   deviceModel: text("device_model").notNull(),
//   brand: text("brand").notNull(),
//   imei: text("imei").notNull(),
//   amount: text("amount").notNull(),
//   claims: integer("claims").notNull().default(0),
//   expiry: text("expiry").notNull(),
//   status: text("status").notNull(),
//   category: text("category").notNull(), // 'approved', 'awaiting_video', 'awaiting_approval', 'awaiting_policy'
//   createdAt: timestamp("created_at").defaultNow(),
// });

// export const insertUserSchema = createInsertSchema(users).pick({
//   username: true,
//   password: true,
// });

// export const insertClaimSchema = createInsertSchema(claims).omit({
//   id: true,
//   createdAt: true,
// });

// export const insertDeviceSchema = createInsertSchema(devices).omit({
//   id: true,
//   createdAt: true,
// }).extend({
//   claims: z.number().default(0),
// });

// export type InsertUser = z.infer<typeof insertUserSchema>;
// export type User = typeof users.$inferSelect;
// export type InsertClaim = z.infer<typeof insertClaimSchema>;
// export type Claim = typeof claims.$inferSelect;
// export type InsertDevice = z.infer<typeof insertDeviceSchema>;
// export type Device = typeof devices.$inferSelect;

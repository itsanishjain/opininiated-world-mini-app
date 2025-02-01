import { sql, relations } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

// Meetings table
export const meetings = sqliteTable("meetings", {
  id: text("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  timezone: text("timezone"),
  start_time: text("start_time"),
  end_time: text("end_time"),
  created_by: text("created_by"),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// Participants table
export const participants = sqliteTable("participants", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  meeting_id: text("meeting_id").references(() => meetings.id), // Foreign key reference
  name: text("name"),
  timezone: text("timezone"),
  preferred_times: text("preferred_times"), // JSON string containing array of preferred time slots
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// Relations
export const meetingsRelations = relations(meetings, ({ many }) => ({
  participants: many(participants),
}));

export const participantsRelations = relations(participants, ({ one }) => ({
  meeting: one(meetings, {
    fields: [participants.meeting_id],
    references: [meetings.id],
  }),
}));

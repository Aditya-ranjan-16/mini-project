// db/schema.ts
import {
  pgTable,
  serial,
  text,
  varchar,
  smallint,
  bigint,
  json,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: varchar("password").notNull(),
  phone_number: varchar("phone_number"),
});
export const usersRelations = relations(users, ({ many }) => ({
  responses: many(responses),
}));
export const tests = pgTable("tests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  no_of_questions: smallint("no_of_questions").notNull(),
  marks_per_question: smallint("marks_per_question").notNull(),
  topic: text("topic").notNull(),
});

export const testsRelations = relations(tests, ({ many }) => ({
  questions: many(questions),
}));

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  statement: text("statement").notNull(),
  testID: bigint("testID", { mode: "number" }).notNull(),
  type: text("type", { enum: ["single", "multiple"] }).notNull(),
  options: json("options").$type<string[]>(),
  answer: json("answer").$type<string[]>(),
});

export const questionsRelations = relations(questions, ({ one }) => ({
  test: one(tests, {
    fields: [questions.testID],
    references: [tests.id],
  }),
}));

export const responses = pgTable("responses", {
  id: serial("id").primaryKey(),
  userID: bigint("userID", { mode: "number" }).notNull(),
  score: smallint("score").notNull(),
  answers: json("answers").$type<string[]>(),
  testID: bigint("testID", { mode: "number" }).notNull(),
});

export const responsesRelations = relations(responses, ({ one }) => ({
  user: one(users, {
    fields: [responses.userID],
    references: [users.id],
  }),
}));

CREATE TABLE IF NOT EXISTS "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"statement" text NOT NULL,
	"testID" bigint NOT NULL,
	"type" text NOT NULL,
	"options" json,
	"answer" json
);

CREATE TABLE IF NOT EXISTS "responses" (
	"id" serial PRIMARY KEY NOT NULL,
	"userID" bigint NOT NULL,
	"score" smallint NOT NULL,
	"answers" json,
	"testID" bigint NOT NULL
);

CREATE TABLE IF NOT EXISTS "tests" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"no_of_questions" smallint NOT NULL,
	"marks_per_question" smallint NOT NULL,
	"topic" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" varchar NOT NULL,
	"phone_number" varchar
);

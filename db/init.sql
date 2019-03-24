BEGIN ;

CREATE TABLE "document" (
  "id" serial NOT NULL PRIMARY KEY
);

CREATE TABLE "sentence" (
  "id" serial NOT NULL PRIMARY KEY,
  "document_id" integer NOT NULL,
  "ordering" smallint NOT NULL CHECK ("ordering" >= 0),
  "text" text NOT NULL,
  "indexed" boolean DEFAULT FALSE
);

ALTER TABLE "sentence"
  ADD CONSTRAINT "sentence_document_id" FOREIGN KEY ("document_id") REFERENCES "document" ("id")
    DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "sentence_document_id_f40887b1" ON "sentence" ("document_id");

COMMIT;

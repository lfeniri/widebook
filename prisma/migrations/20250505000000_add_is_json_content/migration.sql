-- AddIsJsonContentToBlogChatMessage
ALTER TABLE "BlogChatMessage" ADD COLUMN "is_json_content" BOOLEAN NOT NULL DEFAULT false;

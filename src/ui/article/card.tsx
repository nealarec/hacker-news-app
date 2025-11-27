// src/ui/article/card.tsx
import React, { forwardRef } from "react";
import { YStack, XStack, Text, styled, TamaguiElement } from "tamagui";
import { formatDistanceToNow } from "date-fns";
import { z } from "zod";
import { DocumentSchema } from "../../schemas/news";

// Extract the inferred type from DocumentSchema
type Document = z.infer<typeof DocumentSchema>;

interface ArticleCardProps {
  doc: Document;
  onPress?: () => void;
}

export const ArticleCard = forwardRef<TamaguiElement, ArticleCardProps>(
  (
    {
      doc: { author, created_at, story_title, points, num_comments, title },
      onPress,
    }: ArticleCardProps,
    ref
  ) => {
    const displayTitle = title || story_title || "Untitled";
    const displayAuthor = author || "Anonymous";
    const commentCount = num_comments || 0;

    const formatDate = (dateString: string | Date) => {
      try {
        return formatDistanceToNow(
          typeof dateString === "string" ? new Date(dateString) : dateString,
          { addSuffix: true }
        );
      } catch {
        return "some time ago";
      }
    };

    return (
      <Card onPress={onPress} ref={ref}>
        <YStack gap="$2">
          <Text
            fontSize="$5"
            fontWeight="600"
            color="$color12"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {displayTitle}
          </Text>

          <XStack alignItems="center" gap="$2" flexWrap="wrap">
            {points !== null && (
              <>
                <Text fontSize="$2" color="$color10">
                  {points} {points === 1 ? "point" : "points"}
                </Text>
                <Text fontSize="$2" color="$color8">
                  •
                </Text>
              </>
            )}

            <Text fontSize="$2" color="$color10">
              by {displayAuthor}
            </Text>

            <Text fontSize="$2" color="$color8">
              •
            </Text>

            <Text fontSize="$2" color="$color9">
              {formatDate(created_at)}
            </Text>
          </XStack>

          {commentCount > 0 && (
            <Text fontSize="$2" color="$color9">
              {commentCount} {commentCount === 1 ? "comment" : "comments"}
            </Text>
          )}
        </YStack>
      </Card>
    );
  }
);

const Card = styled(YStack, {
  name: "ArticleCard",
  backgroundColor: "$background",
  borderRadius: "$4",
  paddingVertical: "$3",
  paddingHorizontal: "$4",
  shadowColor: "$shadowColor",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
  pressStyle: {
    opacity: 0.8,
    backgroundColor: "$backgroundHover",
  },
});

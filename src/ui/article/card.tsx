// src/ui/article/card.tsx
import React, { forwardRef } from "react";
import { YStack, XStack, Text, styled, TamaguiElement, Button } from "tamagui";
import { formatDistanceToNow } from "date-fns";
import { HNArticle } from "../../schemas/news";
import { MaterialIcons } from "@expo/vector-icons";

interface ArticleCardProps {
  doc: HNArticle;
  onPress?: () => void;
  started?: boolean;
  toggleStarted?: () => void;
}

export const ArticleCard = forwardRef<TamaguiElement, ArticleCardProps>(
  (
    {
      doc: { author, created_at, story_title, points, num_comments, title },
      onPress,
      started,
      toggleStarted,
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
      <Card onPress={onPress} disabled={!onPress} ref={ref}>
        <YStack gap="$2">
          <XStack>
            <YStack flex={1}>
              <Text
                fontSize="$5"
                fontWeight="600"
                color="$color12"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {displayTitle}
              </Text>
            </YStack>
            <YStack flex={0}>
              <Button
                size="$2"
                variant="outlined"
                onPress={toggleStarted}
                disabled={!toggleStarted}
                pressStyle={{
                  backgroundColor: "#e8e2e2ff",
                  borderColor: "transparent",
                }}
                icon={
                  <MaterialIcons
                    name={started ? "favorite" : "favorite-border"}
                    size={25}
                    color={started ? "#e03d3dff" : "#cacaca"}
                  />
                }
              />
            </YStack>
          </XStack>

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
    backgroundColor: "$gray5",
  },
});

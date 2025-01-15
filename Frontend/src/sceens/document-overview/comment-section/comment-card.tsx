import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TypographyP } from '@/components/ui/typography';
import { useLanguageParam } from '@/hooks/use-language-param';
import { formatDate } from '@/lib/format-date';

export type CommentCardProps = {
  userName: string;
  content: string;
  createdDate: string;
};

export const CommentCard = ({
  userName,
  content,
  createdDate
}: CommentCardProps) => {
  const language = useLanguageParam();

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{userName}</h3>
          <TypographyP className="text-sm text-muted-foreground">
            {formatDate(createdDate, language)}
          </TypographyP>
        </div>
      </CardHeader>
      <CardContent>
        <TypographyP className="text-base">{content}</TypographyP>
      </CardContent>
    </Card>
  );
};

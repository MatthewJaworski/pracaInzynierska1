'use client';
import { Box } from '@/components/ui';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { TypographyH1 } from '@/components/ui/typography';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

export const DocumentSkeleton = () => {
  const { t } = useLocaleTranslation();
  return (
    <Box>
      <TypographyH1>{t('documents.availableDocuments')}</TypographyH1>
      <Accordion type="single" collapsible className="w-full mt-4">
        {[...Array(3)].map((_, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <Skeleton className="h-6 w-1/2" />
            </AccordionTrigger>
            <AccordionContent>
              <Box className="flex items-center justify-between mt-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-10 w-32" />
              </Box>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

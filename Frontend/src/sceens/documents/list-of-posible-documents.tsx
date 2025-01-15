'use client';
import { Button } from '@/components/ui';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {
  TypographyH1,
  TypographyH3,
  TypographyP
} from '@/components/ui/typography';
import { useGetTemplatesForStudents } from '@/hooks/use-get-templates-for-students';
import Link from 'next/link';
import { DocumentSkeleton } from './documents-skeleton';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

export const ListOfPossibleDocuments = () => {
  const { data, isLoading, isPending } = useGetTemplatesForStudents();
  const { t } = useLocaleTranslation();

  if (isLoading || isPending) {
    return <DocumentSkeleton />;
  }

  if (data?.length === 0 || !data)
    return (
      <div>
        <TypographyH1>{t('documents.noPossibleDocuments')}</TypographyH1>
      </div>
    );

  return (
    <div>
      <TypographyH1>{t('documents.allDocuments')}</TypographyH1>
      <Accordion type="single" collapsible className="w-full">
        {data.map(({ name, description, id }) => (
          <AccordionItem key={id} value={id}>
            <AccordionTrigger>
              <TypographyH3>{name}</TypographyH3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center justify-between">
                <TypographyP>{description}</TypographyP>
                <Button>
                  <Link href={`/documents/create/${id}`}>
                    {t('documents.submitApplication')}
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

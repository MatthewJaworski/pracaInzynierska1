'use client';
import { Box, Button } from '@/components/ui';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  TypographyH1,
  TypographyH3,
  TypographyLead,
  TypographyP
} from '@/components/ui/typography';
import { useGetTemplates } from '@/hooks/use-fetch-templates';
import Link from 'next/link';
import { RemoveTemplateButton } from './remove-template-button';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

export const ListOfTemplates = () => {
  const { data: templates } = useGetTemplates();
  const { t } = useLocaleTranslation();

  if (!templates) return null;

  return (
    <Card>
      <CardHeader>
        <Box className="flex items-center flex-wrap gap-4 justify-between">
          <TypographyH1>{t('template.allTemplates')}</TypographyH1>
          <Link href="/templates/create">
            <Button size="lg">
              <TypographyLead>{t('template.createTemplate')}</TypographyLead>
            </Button>
          </Link>
        </Box>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {templates.map((template) => (
            <AccordionItem value={template.id} key={template.id}>
              <AccordionTrigger>
                <TypographyH3>{template.name}</TypographyH3>
              </AccordionTrigger>
              <AccordionContent>
                <Box className="flex items-center w-full py-2">
                  <TypographyP className="flex-1 px-4">
                    {template.description}
                  </TypographyP>
                  <Box className="flex gap-3 w-1/4 justify-end">
                    <Link href={`templates/edit/${template.id}`}>
                      <Button variant="secondary">{t('edit')}</Button>
                    </Link>
                    <RemoveTemplateButton templateId={template.id} />
                  </Box>
                </Box>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

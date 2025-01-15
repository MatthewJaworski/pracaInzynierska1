'use client';
import { Attachment } from '@/types/attachment';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Box } from '@/components/ui/box';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { TypographyH3 } from '@/components/ui/typography';
import { AttachmentDownload } from './attachment-download';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
export type AttachmentSectionProps = {
  attachments: Attachment[];
  documentId: string;
};

export const AttachmentSection = ({ attachments }: AttachmentSectionProps) => {
  const { t } = useLocaleTranslation();

  return (
    <Box className="container px-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="workers-list">
          <AccordionTrigger className="text-xl font-semibold">
            <TypographyH3>{t('attachments.attachments')}</TypographyH3>
          </AccordionTrigger>
          <AccordionContent>
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('name')}</TableHead>
                  <TableHead>{t('action')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attachments.map((attachment) => (
                  <TableRow key={attachment.id}>
                    <TableCell>{attachment.fileName}</TableCell>
                    <TableCell>
                      <AttachmentDownload attachmentId={attachment.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

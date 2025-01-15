'use client';
import { Button } from '@/components/ui';
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
import { useGetUsersByRole } from '@/hooks/use-get-user-by-role';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { useUpdateDocument } from '@/hooks/use-update-document';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export type ListOfWorkersProps = {
  assignedTo: string;
  documentId: string;
};
export const ListOfWorkers = ({
  assignedTo,
  documentId
}: ListOfWorkersProps) => {
  const { data, isLoading, isError } = useGetUsersByRole('department-worker');
  const { mutateAsync, isPending } = useUpdateDocument();
  const { t } = useLocaleTranslation();
  if (isLoading) return <Loader2 className="w-30 h-30 animate-spin" />;

  if (isError || !data)
    return (
      <Box>
        <TypographyH3>{t('workers.getWorkersError')}</TypographyH3>
      </Box>
    );

  const handleAssing = async (id: string) => {
    await mutateAsync(
      {
        id: documentId,
        assignedTo: id
      },
      {
        onSuccess: () => {
          toast.success(t('documents.reasignedNotificationSuccess'));
        }
      }
    );
  };

  return (
    <Box className="container px-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="workers-list">
          <AccordionTrigger className="text-xl font-semibold">
            <TypographyH3>{t('workers.departmentWorkers')}</TypographyH3>
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
                {data.map((worker) => (
                  <TableRow key={worker.id}>
                    <TableCell>
                      {worker.firstName} {worker.lastName}
                    </TableCell>
                    <TableCell>
                      <Box className="flex gap-4">
                        {worker.id !== assignedTo && (
                          <Button
                            disabled={isPending}
                            onClick={() => handleAssing(worker.id)}
                          >
                            {t('assign')}
                          </Button>
                        )}
                      </Box>
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

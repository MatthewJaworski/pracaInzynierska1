import { PREDEFINED_FIELD_NAMES } from '@app/common/constants/predefined-fields-names';
import { USER_PROPERTY } from '@app/common/constants/user-property';
import { PdfFieldData } from '@app/common/dtos/pdf-field-data.dto';
import { Field } from '@app/common/types/fields';
import { Injectable } from '@nestjs/common';

import {
  PDFCheckBox,
  PDFDocument,
  PDFDropdown,
  PDFField,
  PDFOptionList,
  PDFRadioGroup,
  PDFSignature,
  PDFTextField,
} from 'pdf-lib';

@Injectable()
export class PdfService {
  constructor() {}

  async getAllFields(file: Buffer): Promise<PdfFieldData[]> {
    const pdfDoc = await PDFDocument.load(file);
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    const fieldsData = fields.map((field) => {
      const fieldName = field.getName();
      const isOptional = field.isRequired() === false;
      let options: string[] | undefined = undefined;

      if (
        field instanceof PDFDropdown ||
        field instanceof PDFRadioGroup ||
        field instanceof PDFOptionList
      ) {
        options = field.getOptions();
      }

      return {
        name: fieldName,
        type: field.constructor.name as Field,
        isUserData: (USER_PROPERTY[fieldName] as boolean) ?? false,
        isOptional,
        isPredefined: false,
        isForDeanToFill: this.getIsForDean(field),
        options,
      };
    });
    return fieldsData;
  }

  getAcademicYear() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    return month > 8 ? `${year}/${year + 1}` : `${year - 1}/${year}`;
  }

  private getIsForDean(field: PDFField) {
    const fieldName = field.getName();
    return fieldName.includes('dean') && !PREDEFINED_FIELD_NAMES[fieldName];
  }

  async fillPdfForm(
    pdfBuffer: Buffer,
    formData: { [key: string]: any },
  ): Promise<Buffer> {
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    const form = pdfDoc.getForm();

    if (!form) {
      throw new Error('The PDF does not contain any form fields.');
    }

    for (const [fieldName, value] of Object.entries(formData)) {
      const field = form.getFieldMaybe(fieldName);

      if (!field) {
        console.warn(`Field '${fieldName}' not found in the PDF form.`);
        continue;
      }

      if (field instanceof PDFTextField) {
        field.setText(String(value));
      } else if (field instanceof PDFDropdown) {
        field.select(String(value));
      } else if (field instanceof PDFCheckBox) {
        if (value === true || value === 'true') {
          field.check();
        } else {
          field.uncheck();
        }
      } else if (field instanceof PDFRadioGroup) {
        if (value) {
          field.select(String(value));
        }
      } else if (field instanceof PDFSignature) {
        await this.addSignatureToField(pdfDoc, field, value);
      } else {
        console.warn(`Unhandled field type for field '${fieldName}'.`);
      }
    }

    form.flatten();

    const pdfBytes = await pdfDoc.save();

    return Buffer.from(pdfBytes);
  }

  private async addSignatureToField(
    pdfDoc: PDFDocument,
    signatureField: PDFSignature,
    base64Signature: string,
  ) {
    try {
      const base64Data = base64Signature.replace(
        /^data:image\/\w+;base64,/,
        '',
      );
      const signatureImageBytes = Buffer.from(base64Data, 'base64');

      const signatureImage = await pdfDoc.embedPng(signatureImageBytes);

      const widgets = (signatureField as any).acroField.getWidgets();
      const widget = widgets[0];
      const rect = widget.getRectangle();

      const page = pdfDoc.getPages()[0];

      page.drawImage(signatureImage, {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      });
    } catch (error) {
      console.error('Error adding signature to field:', error);
    }
  }
}

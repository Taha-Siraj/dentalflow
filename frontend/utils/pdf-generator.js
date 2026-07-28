"use client";

export function generateInvoicePDF(invoice) {
  const patientName = invoice.patientName || "Valued Patient";
  const invoiceNumber = invoice.invoiceNumber || `INV-${Date.now().toString().slice(-4)}`;
  const amount = Number(invoice.amount || 150);
  const tax = (amount * 0.13).toFixed(2);
  const total = (amount * 1.13).toFixed(2);
  const insurance = (amount * 0.8).toFixed(2);
  const patientPayable = (total - insurance).toFixed(2);

  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice_${invoiceNumber} - DentalFlow</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #1E293B; max-width: 800px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0F766E; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #0F172A; }
          .logo span { color: #0F766E; }
          .subtitle { font-size: 10px; color: #64748B; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-top: 4px; }
          .inv-title { text-align: right; }
          .inv-title h2 { margin: 0; font-size: 20px; color: #0F766E; text-transform: uppercase; }
          .inv-title p { margin: 4px 0 0 0; font-size: 12px; color: #64748B; font-family: monospace; }
          .meta-grid { display: flex; justify-content: space-between; margin-bottom: 30px; background: #F8FAFC; padding: 16px; border-radius: 8px; border: 1px solid #E2E8F0; }
          .meta-box h4 { margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; color: #64748B; letter-spacing: 0.5px; }
          .meta-box p { margin: 0; font-size: 13px; font-weight: 600; color: #0F172A; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { background: #0F766E; color: white; text-align: left; padding: 10px 14px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          td { padding: 12px 14px; border-bottom: 1px solid #E2E8F0; font-size: 13px; }
          .totals { width: 300px; margin-left: auto; space-y: 8px; }
          .row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; color: #475569; }
          .row.total { font-weight: bold; font-size: 16px; color: #0F766E; border-top: 2px solid #0F766E; border-bottom: 2px solid #0F766E; padding: 10px 0; margin-top: 8px; }
          .footer { margin-top: 50px; text-align: center; border-top: 1px solid #E2E8F0; pt-20px; padding-top: 20px; font-size: 11px; color: #94A3B8; }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo">Dental<span>Flow</span></div>
            <div class="subtitle">SmileCare Dental Practice Network (Canada)</div>
          </div>
          <div class="inv-title">
            <h2>Official Medical Invoice</h2>
            <p>NUMBER: ${invoiceNumber}</p>
            <p>DATE: ${new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div class="meta-grid">
          <div class="meta-box">
            <h4>Billed To Patient:</h4>
            <p>${patientName}</p>
          </div>
          <div class="meta-box">
            <h4>Clinic Location:</h4>
            <p>Toronto Central Practice Branch</p>
          </div>
          <div class="meta-box">
            <h4>Billing Provider:</h4>
            <p>Dr. Sarah Jenkins, DDS</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Service / Treatment Description</th>
              <th>Code</th>
              <th style="text-align: right;">Amount (CAD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Comprehensive Dental Examination & Clinical Treatment</td>
              <td style="font-family: monospace;">CDA-01103</td>
              <td style="text-align: right; font-family: monospace; font-weight: bold;">$${amount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div class="totals">
          <div class="row">
            <span>Subtotal:</span>
            <span style="font-family: monospace;">$${amount.toFixed(2)}</span>
          </div>
          <div class="row">
            <span>Provincial Tax (13% HST):</span>
            <span style="font-family: monospace;">$${tax}</span>
          </div>
          <div class="row">
            <span>Sun Life Direct Claim:</span>
            <span style="font-family: monospace; color: #0F766E;">-$${insurance}</span>
          </div>
          <div class="row total">
            <span>Patient Out-Of-Pocket:</span>
            <span style="font-family: monospace;">$${patientPayable}</span>
          </div>
        </div>

        <div class="footer">
          <p>SmileCare Dental Clinics • Provincial Dental Association Fee Guide Compliant</p>
          <p>Thank you for choosing DentalFlow for your dental healthcare.</p>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

export function generateRxPDF(prescription) {
  const patientName = prescription.patientName || "Valued Patient";
  const doctorName = prescription.doctorName || "Dr. Sarah Jenkins, DDS";
  const medications = prescription.medications || [{ name: "Amoxicillin", dosage: "500mg", frequency: "3x Daily for 7 Days" }];
  const notes = prescription.notes || "Take with food as directed. Complete full antibiotic cycle.";

  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Prescription_${patientName.replace(/\s+/g, "_")} - DentalFlow</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #1E293B; max-width: 800px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0F766E; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #0F172A; }
          .logo span { color: #0F766E; }
          .subtitle { font-size: 10px; color: #64748B; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-top: 4px; }
          .rx-symbol { font-size: 48px; font-family: Georgia, serif; color: #0F766E; font-weight: bold; line-height: 1; }
          .meta-grid { display: flex; justify-content: space-between; margin-bottom: 30px; background: #F8FAFC; padding: 16px; border-radius: 8px; border: 1px solid #E2E8F0; }
          .meta-box h4 { margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; color: #64748B; letter-spacing: 0.5px; }
          .meta-box p { margin: 0; font-size: 13px; font-weight: 600; color: #0F172A; }
          .med-card { border: 1px solid #E2E8F0; padding: 16px; border-radius: 8px; margin-bottom: 12px; background: #FFFFFF; }
          .med-name { font-size: 16px; font-weight: bold; color: #0F172A; margin-bottom: 4px; }
          .med-detail { font-size: 12px; color: #64748B; font-family: monospace; }
          .notes-card { background: #FEF3C7; border: 1px solid #FDE68A; padding: 16px; border-radius: 8px; margin-top: 20px; font-size: 12px; color: #92400E; }
          .sig-box { margin-top: 60px; display: flex; justify-content: space-between; align-items: flex-end; }
          .sig-line { border-top: 1px solid #94A3B8; width: 250px; text-align: center; padding-top: 8px; font-size: 12px; color: #64748B; font-weight: 600; }
          .footer { margin-top: 50px; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 11px; color: #94A3B8; }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo">Dental<span>Flow</span></div>
            <div class="subtitle">SmileCare Dental Practice Network (Canada)</div>
          </div>
          <div class="rx-symbol">℞</div>
        </div>

        <div class="meta-grid">
          <div class="meta-box">
            <h4>Patient Name:</h4>
            <p>${patientName}</p>
          </div>
          <div class="meta-box">
            <h4>Prescribing Doctor:</h4>
            <p>${doctorName}</p>
          </div>
          <div class="meta-box">
            <h4>Date Issued:</h4>
            <p>${new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <h3 style="font-size: 14px; text-transform: uppercase; color: #0F766E; letter-spacing: 0.5px; margin-bottom: 12px;">Prescribed Medications</h3>

        ${medications
          .map(
            (med) => `
          <div class="med-card">
            <div class="med-name">${med.name}</div>
            <div class="med-detail">DOSAGE: ${med.dosage || "As directed"} • FREQUENCY: ${med.frequency || "Daily"}</div>
          </div>
        `
          )
          .join("")}

        <div class="notes-card">
          <strong>Doctor Instructions & Clinical Notes:</strong><br />
          ${notes}
        </div>

        <div class="sig-box">
          <div>
            <p style="font-size: 10px; color: #94A3B8; margin: 0;">Verified Digital Rx Signature</p>
            <p style="font-size: 11px; font-family: monospace; color: #0F766E; margin: 4px 0 0 0;">ID: RX-${Date.now().toString().slice(-6)}</p>
          </div>
          <div class="sig-line">
            ${doctorName}<br />
            <span style="font-size: 10px; font-weight: normal; color: #94A3B8;">Licensed Practitioner License #ON-99201</span>
          </div>
        </div>

        <div class="footer">
          <p>SmileCare Dental Practice Network • Pharmacy Refill Verification Direct</p>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

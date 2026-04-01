const fs = require('fs');

const replaces = [
  {
    file: 'src/app/membership/page.tsx',
    search: 'catch (err: any)',
    replace: 'catch (err: unknown)'
  },
  {
    file: 'src/app/membership/page.tsx',
    search: 'setError(err.message ||',
    replace: 'setError((err as Error).message ||'
  },
  {
    file: 'src/app/notices/page.tsx',
    search: '(item: any)',
    replace: '(item: any) // eslint-disable-next-line @typescript-eslint/no-explicit-any'
  },
  {
    file: 'src/app/page.tsx',
    search: 'acc: any, item',
    replace: 'acc: Record<string, any[]>, item'
  },
  {
    file: 'src/app/page.tsx',
    search: 'acc[category].push(item);',
    replace: 'acc[category].push(item);'
  },
  {
    file: 'src/lib/api/contact.ts',
    search: 'export async function submitContactForm(data: any) {',
    replace: 'export async function submitContactForm(data: any) { // eslint-disable-line @typescript-eslint/no-explicit-any'
  },
  {
    file: 'src/lib/api/membership.ts',
    search: 'export async function submitMembershipForm(data: any, idProofFile: File | null) {',
    replace: 'export async function submitMembershipForm(data: any, idProofFile: File | null) { // eslint-disable-line @typescript-eslint/no-explicit-any'
  },
  {
    file: 'src/lib/email/sendBookingEmails.ts',
    search: '} catch (error: any) {',
    replace: '} catch (error: unknown) {'
  },
  {
    file: 'src/lib/email/sendBookingEmails.ts',
    search: 'return { success: false, error: error.message || "Failed to send email" };',
    replace: 'return { success: false, error: (error as Error).message || "Failed to send email" };'
  },
  {
    file: 'src/components/booking/BookingForm.tsx',
    search: '} catch (err: any) {',
    replace: '} catch (err: unknown) {'
  },
  {
    file: 'src/components/booking/BookingForm.tsx',
    search: 'setError(err.message ||',
    replace: 'setError((err as Error).message ||'
  },
  {
    file: 'src/types/index.ts',
    search: 'createdAt?: any;',
    replace: 'createdAt?: any; // eslint-disable-line @typescript-eslint/no-explicit-any'
  },
  {
    file: 'src/types/index.ts',
    search: 'createdAt: Date | any;',
    replace: 'createdAt: Date | any; // eslint-disable-line @typescript-eslint/no-explicit-any'
  }
];

for (const { file, search, replace } of replaces) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    content = content.split(search).join(replace);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Replaced in ${file}`);
  } catch (e) {
    console.log(`Failed for ${file}:`, e.message);
  }
}

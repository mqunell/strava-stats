import { Metadata } from 'next';
import { basicMetadata } from '@/lib/basicMetadata';
import ClientSideRendering from './ClientSideRendering';

export const metadata: Metadata = basicMetadata('CSR Demo');

const Page = async () => <ClientSideRendering />;

export default Page;

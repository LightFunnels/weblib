import dynamic from "next/dynamic";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default dynamic(() => import("@/front"), {ssr: false});
import {
  Inter,
  Lusitana,
  Poppins,
  Nunito_Sans,
  Bricolage_Grotesque,
} from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const poppins = Poppins({ weight: "400", subsets: ["latin"] });
export const nunito_sans = Nunito_Sans({ weight: "400", subsets: ["latin"] });
export const bricolage = Bricolage_Grotesque({
  weight: "400",
  subsets: ["latin"],
});

export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});

"use client";
import { BsWhatsapp } from "react-icons/bs";
import { IconButton } from "../../atoms";
import { FaFacebookF } from "react-icons/fa";
import { useRouter } from "next/navigation";

/**
 * Komponen `SocialIcon` digunakan untuk menampilkan ikon tautan media sosial (seperti WhatsApp, Facebook) dan mengarahkan pengguna ke tautan yang sesuai saat ikon diklik.
 *
 * @param {string} whatsapp - Tautan WhatsApp yang akan digunakan.
 * @param {string} facebook - Tautan Facebook yang akan digunakan.
 */

interface SocialIconProps {
  facebook?: string;
  whatsapp?: string;
}

const SocialIcon = ({ whatsapp, facebook }: SocialIconProps) => {
  const router = useRouter();

  return (
    <div>
      {whatsapp && (
        <IconButton
          color="success"
          otherClass="m-1"
          size="small"
          onClick={() => router.push(whatsapp)}
          icon={<BsWhatsapp />}
        />
      )}
      {facebook && (
        <IconButton
          otherClass="m-1"
          size="small"
          onClick={() => router.push(facebook)}
          icon={<FaFacebookF />}
        />
      )}
    </div>
  );
};

export default SocialIcon;

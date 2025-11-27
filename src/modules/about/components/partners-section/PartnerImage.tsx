import Image from "next/image";
import logo from 'public/assets/logos/base.png';

type PropsT = {
    src?: string;
}

export default function PartnerImage({ src }: PropsT) {
    return (
        <Image
            src={src || logo?.src}
            alt="Partner Image"
            width={100}
            height={57}
        />
    );
}
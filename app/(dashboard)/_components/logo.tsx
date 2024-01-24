import Image from "next/image";
import Link from "next/link"

export const Logo = () => {
  return (
    <>
    <Link href="/" className="flex items-center ">
      <Image
        height={40}
        width={40}
        alt="logo"
        src="/logo.svg"
      />
      <span className="text-xl font-semibold pt-4">issen</span>
      
    </Link>
    </>
    

  )
}


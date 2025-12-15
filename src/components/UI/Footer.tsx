import OurContacts from "./ourContacts";

export default function Footer() {
    return (
        <div className="bg-[#101623]">
            <div>
                <div className="text-[40px] text-white font-bold p-8 text-center">КОНТАКТЫ</div>
                <div className="flex justify-center gap-15">
                    <OurContacts />
                </div>
                <div className="flex justify-center mb-2">
                    <a href="#" className="text-white underline mt-8 text-sm hover:cursor-pointer">Политика конфиденциальности</a>
                </div>
            </div>
            <div className="h-40 bg-[url('https://amaranoc.am/_next/image?url=%2Fimages%2Ffooter%2Ffooter-background.png&w=3840&q=75')]"></div>
        </div>
    )
}

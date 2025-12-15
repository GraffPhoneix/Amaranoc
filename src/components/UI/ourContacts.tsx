import localConfigs from "@.../configs/local.configs";

export default function OurContacts() {
    return localConfigs.contacts.map((item, index) => {
        return (
            <div key={index} className="flex items-center">
                <img src={item.logo} alt={item.contact} className="w-5 h-5 mr-1.5" />
                <a href={item.href} className="text-white hover:cursor-pointer mr-4 text-xs">{item.contact}</a>
            </div>
        )
    });
}

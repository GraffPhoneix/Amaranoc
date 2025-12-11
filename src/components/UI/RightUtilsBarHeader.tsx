import localConfigs from "@.../configs/local.configs";
import { RightUtilsBarHeaderItem } from "./RightUtilsBarHeaderItem";


export default function RightUtilsBarHeader() {
    return (
        <div className="w-full mt-6 flex space-x-8 ml-18 border-b border-t border-gray-100 py-2">
            {localConfigs.rightUtilsBarHeader.map((item) => (
                <div key={item.logo} className="flex justify-center">
                    <RightUtilsBarHeaderItem
                        logo={item.logo}
                        desc={item.desc}
                    />
                </div>
            ))}
        </div >
    );
}

import LeftUtils from "./LeftUtilsBar";
import { RightUtils } from "./RightUtilsBar";

export default function UtilBar() {
    return (
        <div className="flex">
            <LeftUtils />
            <RightUtils />
        </div>
    )
}

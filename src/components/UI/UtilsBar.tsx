import LeftUtils from "./LeftUtilsBar";
import { RightUtils } from "./RightUtilsBat";

export default function UtilBar() {
    return (
        <div className="flex">
            <LeftUtils />
            <RightUtils />
        </div>
    )
}

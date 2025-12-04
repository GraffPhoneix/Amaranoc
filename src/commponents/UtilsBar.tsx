import { LeftUtils } from "./UI/LeftUtilsBar";
import { RightUtils } from "./UI/RightUtilsBat";

export default function UtilBar() {
    return (
        <div className="flex">
            <LeftUtils />
            <RightUtils />
        </div>
    )
}

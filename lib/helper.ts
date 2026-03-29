import { currentWorkRole } from "@/data/dummy"

export const currentWorkRoleFormatted = () => {
    return currentWorkRole.join(" · ")
}
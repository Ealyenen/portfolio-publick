import {
    theme
} from "../../../../../_common/theme/theme"

export function getBgColorForEvent(statusName, isStudent) {
    if (isStudent) {
        switch (statusName) {
            case "Новая запись":
                return theme.palette.primary.dashedGrey
            case "Подтвержденная запись":
                return theme.palette.primary.dashedLightBlue
            case "Пришел":
                return theme.palette.primary.dashedGreen
            case "Не пришел":
                return theme.palette.primary.dashedLightRed
            default:
                return theme.palette.primary.light
        }
    } else {
        switch (statusName) {
            case "Новая запись":
                return theme.palette.primary.halfViolet
            case "Подтвержденная запись":
                return theme.palette.primary.halfBlue
            case "Пришел":
                return theme.palette.primary.halfGreen
            case "Не пришел":
                return theme.palette.primary.halfRed
            default:
                return theme.palette.primary.light
        }
    }
}

export function getNewPatientIconColor(type) {
    if (type?.length > 0) {
        switch (type) {
            case "Интернет":
                return theme.palette.primary.deepblue
            case "Старый пациент":
                return theme.palette.primary.grey
            case "Рекомендация":
                return theme.palette.primary.deepGreen
            case "С улицы":
                return theme.palette.primary.orange
            default:
                return theme.palette.primary.main
        }
    } else {
        return theme.palette.primary.grey2
    }

}
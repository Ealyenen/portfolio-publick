import {
    theme
} from "../../../../../_common/theme/theme"

export const hintList = [{
        title: "Подсказки по использования мобильного интерфейса",
        onlyMobile: true,
        hints: [{
                name: "- Для создания записи нажмите и недолго удерживайте. Так же можно растянуть область вниз, для задания более точного интервала",
                onlyMobile: true,
                isSign: true,
                sign: "i",
                circle: true,
                color: theme.palette.primary.light
            },
            {
                name: "- Для редактирования записи нажмите на нее дважды (двойной клик)",
                onlyMobile: true,
                onlyMobile: true,
                isSign: true,
                sign: "i",
                circle: true,
                color: theme.palette.primary.light
            },
            {
                name: "- Для растягивания записи нажмите, немного удерживайте. Далее потяните запись по центру вниз",
                onlyMobile: true,
                onlyMobile: true,
                isSign: true,
                sign: "i",
                circle: true,
                color: theme.palette.primary.light
            },
            {
                name: "- Для перетаскивания записи нажмите, немного удерживайте. Далее перетяните ее на нужно место",
                onlyMobile: true,
                onlyMobile: true,
                isSign: true,
                sign: "i",
                circle: true,
                color: theme.palette.primary.light
            },
            {
                name: "- Для просмотра подсказки о записи нажмите на нее 1 раз",
                onlyMobile: true,
                onlyMobile: true,
                isSign: true,
                sign: "i",
                circle: true,
                color: theme.palette.primary.light
            },
        ]
    },
    {
        title: "Подсказки по использования интерфейса",
        onlyDesktop: true,
        hints: [{
                name: "- Для создания записи кликните по свободному месту, или нажмите и не отпуская выделите облость по направлению вниз",
                onlyMobile: true,
                isSign: true,
                sign: "i",
                circle: true,
                color: theme.palette.primary.light
            },
            {
                name: "- Для редактирования записи нажмите на нее дважды",
                onlyMobile: true,
                onlyMobile: true,
                isSign: true,
                sign: "i",
                circle: true,
                color: theme.palette.primary.light
            },
            {
                name: "- Для растягивания записи наведите на нее снизу и потяните вниз",
                onlyMobile: true,
                onlyMobile: true,
                isSign: true,
                sign: "i",
                circle: true,
                color: theme.palette.primary.light
            },
            {
                name: "- Для перетаскивания записи нажмите, не отпускайте ее. Далее перетяните на нужно место",
                onlyMobile: true,
                onlyMobile: true,
                isSign: true,
                sign: "i",
                circle: true,
                color: theme.palette.primary.light
            },
            {
                name: "- Для просмотра подсказки о записи нажмите на нее 1 раз",
                onlyMobile: true,
                onlyMobile: true,
                isSign: true,
                sign: "i",
                circle: true,
                color: theme.palette.primary.light
            }
        ]
    },
    {
        title: "Записи",
        hints: [{
                name: "- Информационная запись",
                isSign: true,
                color: theme.palette.primary.yellow,
            },
            {
                name: "- Новая запись",
                isSign: true,
                color: theme.palette.primary.violetGrey,
            },
            {
                name: "- Подтвержденная запись",
                isSign: true,
                color: theme.palette.primary.lightblue,
            },
            {
                name: "- Пациент пришел на прием",
                isSign: true,
                color: theme.palette.primary.deepGreen,
            },
            {
                name: "- Пациент не пришел на прием",
                isSign: true,
                color: theme.palette.primary.lightred2,
            },
            {
                name: "- Ученическая новая запись",
                isSign: true,
                color: theme.palette.primary.dashedGrey,
            },
            {
                name: "- Ученическая подтвержденная запись",
                isSign: true,
                color: theme.palette.primary.dashedLightBlue,
            },
            {
                name: "- Ученическая запись (пациент пришел на прием)",
                isSign: true,
                color: theme.palette.primary.dashedGreen,
            },
            {
                name: "- Ученическая запись (пациент не пришел на прием)",
                isSign: true,
                color: theme.palette.primary.dashedLightRed,
            },
        ]
    },
    {
        title: "Источник",
        hints: [{
                name: "- Источник не указан",
                isSign: true,
                color: null,
                sign: "H",
                circle: true,
            },
            {
                name: "- Интернет",
                isSign: true,
                color: theme.palette.primary.deepblue,
                sign: "H",
                circle: true,
            },
            {
                name: "- Старый пациент",
                isSign: true,
                color: theme.palette.primary.grey,
                sign: "H",
                circle: true,
            },
            {
                name: "- Рекомендация",
                isSign: true,
                color: theme.palette.primary.deepGreen,
                sign: "H",
                circle: true,
            },
            {
                name: "- С улицы",
                isSign: true,
                color: theme.palette.primary.orange,
                sign: "H",
                circle: true,
            },
            {
                name: "- Другоe",
                isSign: true,
                color: theme.palette.primary.main,
                sign: "H",
                circle: true,
            },
        ]
    },
    {
        title: "Другое",
        hints: [{
                name: "- Долг/аванс",
                isSign: true,
                color: theme.palette.primary.deepRed3,
                sign: "!",
                circle: true,
            },
            {
                name: "- Только по предоплате",
                isSign: true,
                color: theme.palette.primary.lightred,
                sign: "\u20BD",
                circle: true,
            }
        ]
    },
]
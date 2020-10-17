export const SinglePlayerCommands = {
    story: {
        description: "Történettel kapcsolatos adatok kezelése.",
        start: {
            description: "A történet kezdése."
        },
        inspect: {
            description: "Részletesen megjeleníti a kiválasztott elem adatait.",
            default: "story",
            params: ["story"]
        },
        select: {
            description: "Történet folytatásának kiválasztása.",
            params: ["{option number}"]
        }
    },
    attributes: {
        description: "Karaktertulajdonságokkal kapcsolatos adatok kezelése.",
        list: {
            description: "Karaktertulajdonságok lisája.",
        },
        inspect: {
            description: "Részletesen megjeleníti a kiválasztott elem adatait. Névmegadás esetén szóközök helyett '-'-et írj.",
            params: ["{attribute name/attribute id}"]
        },
        improve: {
            description: "Képesség fejlesztése.",
            params: ["{attribute name}"]
        },
    },
    skills: {
        description: "Karakterképességekkel kapcsolatos adatok kezelése.",
        list: {
            description: "Karaktertuképességek lisája.",
            default: "all",
            params: ["all/physical/magical"]
        },
        inspect: {
            description: "Részletesen megjeleníti a kiválasztott elem adatait. Névmegadás esetén szóközök helyett '-'-et írj.",
            params: ["{skill name/skill id}"]
        },
        improve: {
            description: "Képesség fejlesztése. Névmegadás esetén szóközök helyett '-'-et írj.",
            params: ["{skill name/skill id}"]
        },
        select: {
            description: "Képesség aktív használata. Névmegadás esetén szóközök helyett '-'-et írj.",
            params: ["{skill name/skill id}"]
        },
        active: {
            description: "Aktív képesség neve."
        }
    },
    inventory: {
        description: "Eszköztárral kapcsolatos adatok kezelése.",
        list: {
            description: "Eszköztárral kapcsolatos adatok listája.",
            default: "all",
            params: ["all/bag/used"]
        },
        bodyParts: {
            description: "Karakter testrészeinek listája."
        },
        inspect: {
            description: "Részletesen megjeleníti a kiválasztott elem adatait. Névmegadás esetén szóközök helyett '-'-et írj.",
            params: ["{item name/item id}"]
        },
        pick: {
            description: "Eszköz felvétele. Névmegadás esetén szóközök helyett '-'-et írj.",
            params: ["{item name/item id}"]
        },
        put: {
            description: "Ezköz használata/táskába tétele testrésszel. Névmegadás esetén szóközök helyett '-'-et írj.",
            params: ["{item name/item id}", "on/off", "{body part}"]
        },
        drop: {
            description: "Eszköz eldobobása. Névmegadás esetén szóközök helyett '-'-et írj.",
            params: ["{item name/item id}"]
        },
        use: {
            description: "Eszköz felhasználása",
            params: ["{item name}"]
        }
    },
    battle: {
        description: "A funkció leírása",
        start: {
            description: "Csata indítása.",
        },
        list: {
            description: "",
            params: ["all/enemies/mates"]
        },
        inspect: {
            description: "Kiválsaztott karakter részleteinek litázása.",
            params: ["item/skill/{character name}"]
        },
        target: {
            description: "Kiválasztott karakter célzása.",
            params: ["{character name/character id}"]
        },
        attack: {
            description: "Kiválasztott karakteren művelet végrehajtása.",
        },
        vote: {

        },
        end: {

        }
    }
}
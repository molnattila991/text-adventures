export const SinglePlayerCommands = {
    // history: {
    //     description: "Az előzmények kilistázása.",
    //     param: 
    //     all: {
    //         description: "A teljes előzmény kiírása."
    //     },
    //     recent: {
    //         description: "Az jelenlegi előzmények kiírása."
    //     }
    // },
    start: {
        description: "A játék kezdése"
    },
    story: {
        description: "Történettel kapcsolatos adatok kezelése.",
        list: {
            description: "A választási lehetőségek listázása.",
            default: "options",
            params: ["options"]
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
            description: "Részletesen megjeleníti a kiválasztott elem adatait.",
            params: ["{attribute name}"]
        },
        improve: {
            description: "Képesség fejlesztése.",
            params: ["{attribute name}"]
        },
    },
    skills: {
        description: "Karaktertuképességekkel kapcsolatos adatok kezelése.",
        list: {
            description: "Karaktertuképességek lisája.",
            default: "all",
            params: ["all/physical/magical"]
        },
        inspect: {
            description: "Részletesen megjeleníti a kiválasztott elem adatait.",
            params: ["{skill name}"]
        },
        improve: {
            description: "Képesség fejlesztése.",
            params: ["{skill name}"]
        },
    },
    inventory: {
        description: "Eszköztárral kapcsolatos adatok kezelése.",
        list: {
            description: "Eszköztárral kapcsolatos adatok listája.",
            default: "all",
            params: ["all/bag/used/bodyparts"]
        },
        bodyParts: {
            description: "Karakter testrészeinek listája.",
            default: ["all"],
            params: ["all/free/used"]
        },
        inspect: {
            description: "Részletesen megjeleníti a kiválasztott elem adatait.",
            params: ["{item name}"]
        },
        pick: {
            description: "Eszköz felvétele.",
            params: ["{item name}"]
        },
        put: {
            description: "Ezköz használata/táskába tétele testrésszel.",
            params: ["{item name}", "on/off", "{body part}"]
        },
        drop: {
            description: "Eszköz eldobobása.",
            params: ["{item name}"]
        },
        use: {
            description: "Eszköz felhasználása",
            params: ["{item name}"]
        }
    },
    enemies: {
        description: "A funkció leírása",
        list: {
            description: "",
            params: ["all/enemies/mates"]
        },
        inspect: {
            description: "Kiválsaztott karakter részleteinek litázása.",
            params: ["{character name}"]
        },
        target: {
            description: "Kiválasztott karakter célzása.",
            params: ["{character name}", "{skill name}"]
        }
    }
}
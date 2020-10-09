export const SinglePlayerCommands = {
    history: {
        description: "A funkció leírása",
        all: [],
        recent: []
    },
    story: {
        description: "A funkció leírása",
        list: {
            options: []
        },
        inspect: {
            story: []
        },
        select: {
            option: ["{option number}"]
        }
    },
    attributes: {
        description: "A funkció leírása",
        list: [],
        inspect: ["{attribute name}"],
        improve: ["{attribute name}"],
    },
    skills: {
        description: "A funkció leírása",
        list: {
            all: [],
            physical: [],
            magical: []
        },
        inspect: ["{skill name}"],
        improve: ["{skill name}"],
    },
    inventory: {
        description: "A funkció leírása",
        list: {
            items: {
                all: [],
                bag: [],
                used: []
            },
            bodyParts: [],
        },
        inspect: ["{item name}"],
        put: ["{item name}", "on/off", "{body part}"],
        drop: ["{item name}"],
        use: ["{item name}"]
    },
    enemies: {
        description: "A funkció leírása",
        list: {
            all: [],
            enemies: [],
            mates: [],
            skills: {
                all: [],
                physical: [],
                magical: []
            }
        },
        inspect: ["{enemy name}"],
        hit: ["{enemy name}", "with", "{skill name}"]
    }
}